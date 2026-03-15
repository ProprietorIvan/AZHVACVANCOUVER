import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { buildEmailHtml } from "@/utils/emailTemplate";
import { forwardToTimber } from "@/utils/forwardToTimber";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export default async function handler(
    request: NextApiRequest,
    respond: NextApiResponse<{ message: string } | { error: string; details?: string }>
) {
    if (request.method === "POST") {
        try {
            // Validate SMTP configuration
            if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
                console.error("❌ SMTP configuration missing");
                return respond.status(500).json({ 
                    error: "Email service not configured. Please contact the administrator." 
                });
            }

            const to = "office@azhvac.ca, office@vancouverflood.com";
            console.log("📧 Processing form submission, sending email to:", to);
            console.log("📝 Received fields:", Object.keys(request.body));

            const {
                name = "",
                phone = "",
                email = "",
                address = "",
                service = "",
                projectDetails = "",
            } = request.body;

            // No field validation - accept any submission to maximize leads

            const mailOptions = {
                from: process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@azhvac.ca",
                to,
                subject: service ? `New Quote Request - ${service}` : "New Quote Request",
                html: generateEmail({
                    name,
                    email,
                    phone,
                    address,
                    service,
                    projectDetails,
                }),
            };

            await transporter.sendMail(mailOptions);
            console.log("✅ Email sent successfully to:", to);

            await forwardToTimber({
                name,
                email,
                phone,
                address,
                message: projectDetails,
                projectDetails,
                serviceType: service || "General",
                formPage: "/",
                leadSource: "AZ Air Conditioning Website - Home Form",
            });

            return respond.status(200).json({ message: "Email sent successfully" });
        } catch (error: any) {
            console.error("❌ Error sending email:", error);
            console.error("❌ Error details:", {
                message: error.message,
                code: error.code,
            });
            return respond.status(500).json({ 
                error: "Failed to send email",
                details: error.message || "Unknown error"
            });
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

function generateEmail({
    name,
    email,
    phone,
    address,
    service,
    projectDetails,
}: {
    name: string;
    email: string;
    phone: string;
    address: string;
    service: string;
    projectDetails: string;
}) {
    const serviceNames: Record<string, string> = {
        ac: "Air Conditioning",
        heating: "Heating",
        emergency: "Emergency HVAC",
        maintenance: "HVAC Maintenance",
        commercial: "Commercial HVAC",
    };
    const serviceName = serviceNames[service as keyof typeof serviceNames] || service;

    const fields = [
        serviceName && { label: "Service", value: serviceName },
        name && { label: "Name", value: name },
        phone && { label: "Phone", value: phone },
        email && { label: "Email", value: email },
        address && { label: "Address", value: address },
        projectDetails && { label: "Project Details", value: projectDetails },
    ].filter(Boolean) as { label: string; value: string }[];

    return buildEmailHtml({
        title: "New Quote Request",
        subtitle: "Submitted from azhvac.ca",
        fields,
    });
} 