import { NextApiRequest, NextApiResponse } from "next";




export default async function handler(
    request: NextApiRequest,
    respond: NextApiResponse< string[]  | { error: string }>
) {
    if (request.method === "GET") {
        try {
            const address = request.query.address
            const predictions = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${process.env.GOOGLE_API}`)
            .then(res => res.json())
            .then((answer: { predictions: { description: string }[] })=>answer.predictions.map((i) => i.description))

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
