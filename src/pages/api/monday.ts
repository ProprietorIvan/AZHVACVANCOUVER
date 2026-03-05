import { NextApiRequest, NextApiResponse } from "next";
import createLead, { Lead } from "@/utils/createLead";


export default async function handler(
    request: NextApiRequest,
    respond: NextApiResponse<string[] | { error: string }>
) {
    if (request.method === "POST") {
        try {
            const payload: Lead = request.body
            const predictions = await createLead(payload);

            return respond.status(200).json(predictions);
        } catch (error) {
            console.error("Error sending address:", error);
            return respond.status(500).json({ error: "Failed to send address" });
        }
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb",
        },
    },
};
