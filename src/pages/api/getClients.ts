import mondaySdk from "monday-sdk-js";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    request: NextApiRequest,
    respond: NextApiResponse<{ message: string } | { error: string }>
) {
    if (request.method === "GET") {
        const search = request.query.search || ''
        try {
            const getColumnValue = async (token: string) => {
                try {
                    const mondayClient = mondaySdk();
                    mondayClient.setToken(token);
                    mondayClient.setApiVersion('2024-04');

                    const query = `query($search: CompareValue!) {
                        boards(ids: 8050293826) {
                            items_page (query_params: {
                                rules: [{
                                    column_id: "lead_email",
                                    compare_value: $search,
                                    operator: contains_text
                                }]
                            }) {
                                items {
                                    name
                                    column_values(
                                        ids: ["lead_email", "location_Mjj77JvP", "lead_phone", "lead_company"]
                                    ) {
                                        id
                                        text
                                    }
                                }
                            }
                        }
                    }`;
                    const variables = { search };
                    const response = await mondayClient.api(query, { variables });

                    return response.data
                } catch (err) {
                    console.error(err);
                }
            };
            const result = await getColumnValue('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ0ODEzNTg2NCwiYWFpIjoxMSwidWlkIjo2OTY0NTc0MCwiaWFkIjoiMjAyNC0xMi0xM1QyMjoyNzoyNi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjY5Njg0NDYsInJnbiI6InVzZTEifQ.TNum2xu2_371SnvREtgll6zoBoM--RpmGED3sOT_kIs')
            return respond.status(200).json(result)
        } catch (error) {
            console.error("Error sending email:", error);
            return respond.status(500).json({ error: "Failed to send email" });
        }
    }
}