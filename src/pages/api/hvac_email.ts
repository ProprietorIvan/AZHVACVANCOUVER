import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { buildEmailHtml } from "@/utils/emailTemplate";

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
                facilityType = "",
                hvacSystem = "",
                urgency = "",
                email = "",
                address = "",
                projectDetails = "",
                serviceType = "",
            } = request.body;

            // No field validation - accept any submission to maximize leads
            const subjectLine = serviceType
                ? `New Quote Request - ${serviceType}`
                : "New HVAC Quote Request";

            const mailOptions = {
                from: process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@azhvac.ca",
                to,
                subject: subjectLine,
                html: generateEmail({
                    name,
                    email,
                    phone,
                    address,
                    projectDetails,
                    facilityType,
                    hvacSystem,
                    urgency,
                    serviceType,
                }),
            };

            await transporter.sendMail(mailOptions);
            console.log("✅ Email sent successfully to:", to);
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
    projectDetails,
    facilityType,
    hvacSystem,
    urgency,
    serviceType,
}: {
    name: string;
    email: string;
    phone: string;
    address: string;
    projectDetails: string;
    facilityType: string;
    hvacSystem: string;
    urgency: string;
    serviceType?: string;
}) {
    const fields = [
        name && { label: "Name", value: name },
        email && { label: "Email", value: email },
        phone && { label: "Phone", value: phone },
        address && { label: "Address", value: address },
        serviceType && { label: "Service Type", value: serviceType },
        projectDetails && { label: "Project Details", value: projectDetails },
        facilityType && { label: "Facility Type", value: facilityType },
        hvacSystem && { label: "HVAC System", value: hvacSystem },
        urgency && { label: "Urgency", value: urgency },
    ].filter(Boolean) as { label: string; value: string }[];

    return buildEmailHtml({
        title: serviceType ? `New Quote · ${serviceType}` : "New HVAC Quote",
        subtitle: "Submitted from azhvac.ca",
        fields,
    });
} 