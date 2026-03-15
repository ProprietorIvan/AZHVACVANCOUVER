/**
 * Server-side proxy to Timber webhook. Avoids CORS by receiving from same-origin client.
 */
import { NextApiRequest, NextApiResponse } from "next";

const TIMBER_URL = "https://gettimber.ai/api/webhooks/forms/az-hvac";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(TIMBER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error: any) {
    console.error("Timber webhook proxy error:", error);
    res.status(500).json({ error: "Failed to submit to Timber" });
  }
}

export const config = { api: { bodyParser: { sizeLimit: "10mb" } } };
