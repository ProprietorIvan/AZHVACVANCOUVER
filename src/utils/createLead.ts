const columns = [
    {
        "id": "name",
        "title": "Name",
        "type": "name"
    },
    {
        "id": "subitems_mkkammgy",
        "title": "Subitems",
        "type": "subtasks"
    },
    {
        "id": "text_Mjj7ZmTv",
        "title": "Project Name",
        "type": "text"
    },
    {
        "id": "lead_status",
        "title": "Status",
        "type": "status"
    },
    {
        "id": "status_1_Mjj7KSmv",
        "title": "Lead Source",
        "type": "status"
    },
    {
        "id": "text_Mjj7Hg3c",
        "title": "Notes",
        "type": "text"
    },
    {
        "id": "numbers_Mjj7fpib",
        "title": "Quote amount",
        "type": "numbers"
    },
    {
        "id": "location_Mjj77JvP",
        "title": "Job Location",
        "type": "location"
    },
    {
        "id": "lead_company",
        "title": "Company",
        "type": "text"
    },
    {
        "id": "text",
        "title": "Title",
        "type": "text"
    },
    {
        "id": "monday_doc_Mjj7kwS8",
        "title": "Quote",
        "type": "doc"
    },
    {
        "id": "lead_phone",
        "title": "Phone",
        "type": "phone"
    },
    {
        "id": "lead_email",
        "title": "Email",
        "type": "email"
    },
    {
        "id": "status_1_Mjj77YUc",
        "title": "Job Type",
        "type": "status"
    },
    {
        "id": "status_1_Mjj7Dz0C",
        "title": "Payment Status",
        "type": "status"
    },
    {
        "id": "status_1_Mjj7nPIN",
        "title": "Insurance Status",
        "type": "status"
    },
    {
        "id": "date_Mjj7SnLm",
        "title": "Sent Quote Date",
        "type": "date"
    },
    {
        "id": "text_Mjj9E6XJ",
        "title": "Text",
        "type": "text"
    }
]
export type Lead = {
    "name": string;//for name
    "subitems_mkkammgy"?: string;
    "text_Mjj7ZmTv"?: string;//project name
    "lead_status": "New Lead";
    "status_1_Mjj7KSmv":
    "AI Quote" |
    "Email" |
    "Stuck" |
    "Commercial Form" |
    "Form Drywall" |
    "Form Handyman" |
    "Form Demolition" |
    "Form Drywall Burnaby" |
    "Phone Lead - General" |
    "Phone Lead - Flood Emergency" |
    "Commercial";
    "text_Mjj7Hg3c": string;//user notes + services (can be json)
    "numbers_Mjj7fpib": number;//avarage cost
    "job_location_mkm418ra": string;//address
    "lead_company"?: string;//company name
    "text"?: string;//company person title
    "monday_doc_Mjj7kwS8"?: string;//invoice link
    "lead_phone": string;
    "lead_email": string;
    "status_1_Mjj77YUc":
    "Flood Restoration" |
    "Mold" |
    "Drywall Repair" |
    "Handyman" |
    "Major Renovation" | "Demolition";//job type
    "status_1_Mjj7Dz0C": "No Payment Due";
    "status_1_Mjj7nPIN": "Not Insurance";
    "date_Mjj7SnLm": string;
    "text_Mjj9E6XJ"?: string;//internal notes
}

export default async function createLead(columns: Lead) {
    const [date, time] = columns.date_Mjj7SnLm.split('T')
    const [timeParsed] = time.split('.')
    return await fetch("https://api.monday.com/v2", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ0ODEzNTg2NCwiYWFpIjoxMSwidWlkIjo2OTY0NTc0MCwiaWFkIjoiMjAyNC0xMi0xM1QyMjoyNzoyNi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjY5Njg0NDYsInJnbiI6InVzZTEifQ.TNum2xu2_371SnvREtgll6zoBoM--RpmGED3sOT_kIs",
        },
        body: JSON.stringify({
            query: `mutation { create_item (board_id: 8050293826, group_id: \"topics\", item_name: \"${columns.name}\", column_values: \"{\\\"lead_status\\\":\\\"${columns.lead_status}\\\",\\\"status_1_Mjj7KSmv\\\":\\\"${columns.status_1_Mjj7KSmv}\\\",\\\"numbers_Mjj7fpib\\\":\\\"${columns.numbers_Mjj7fpib}\\\",\\\"job_location_mkm418ra\\\":\\\"${columns.job_location_mkm418ra}\\\",\\\"lead_phone\\\":\\\"${columns.lead_phone}\\\",\\\"status_1_Mjj7Dz0C\\\":\\\"${columns.status_1_Mjj7Dz0C}\\\",\\\"lead_email\\\":{\\\"email\\\":\\\"${columns.lead_email}\\\",\\\"text\\\":\\\"${columns.lead_email}\\\"},\\\"status_1_Mjj7nPIN\\\":\\\"${columns.status_1_Mjj7nPIN}\\\",\\\"status_1_Mjj77YUc\\\":\\\"${columns.status_1_Mjj77YUc}\\\",\\\"lead_company\\\":\\\"${columns.lead_company || "no company"}\\\",\\\"text\\\":\\\"${columns.text || "no person title"}\\\",\\\"date_Mjj7SnLm\\\":{\\\"date\\\":\\\"${date}\\\",\\\"time\\\":\\\"${timeParsed}\\\"},\\\"text_Mjj7Hg3c\\\":\\\"${columns.text_Mjj7Hg3c}\\\"}\") { id }}`,

        }),
        // \\\"name\\\": \\\"${columns.name}\\\",
    })
        .then((response) => response.json())
        .then((result) => result)
        .catch((error) => error);
}
