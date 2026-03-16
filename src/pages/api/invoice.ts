import clientPromise from "@/utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from 'mongodb'


export default async function handler(
    request: NextApiRequest,
    respond: NextApiResponse<{ message: string } | { error: string }>
) {
    if (request.method === "POST") {
        const invoice = request.body
        try {
            const client = await clientPromise
            const db = client.db('company');
            const collection = db.collection('invoices')
            const data = await collection.insertOne(invoice)

            return respond.status(200).json(data)
        } catch (error) {
            console.error("Error saving invoice:", error);
            return respond.status(500).json({ error: "Failed to save invoice" });
        }
    } else if (request.method === 'GET') {
        try {
            const id = request.query.id;
            const client = await clientPromise
            const db = client.db('company');
            const collection = db.collection('invoices')
            if (typeof id === 'string') {
                const invoice = await collection.findOne({ _id: new ObjectId(id) });
                return respond.status(200).json(invoice)
            }
        } catch (error) {
            console.error("Error getting invoice:", error);
            return respond.status(500).json({ error: "Failed to get invoice" });
        }
    }
}