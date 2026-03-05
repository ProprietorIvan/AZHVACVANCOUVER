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
                console.error("❌ SMTP configuration missing:", {
                    hasSMTP_USER: !!process.env.SMTP_USER,
                    hasSMTP_PASSWORD: !!process.env.SMTP_PASSWORD,
                });
                return respond.status(500).json({ 
                    error: "Email service not configured. Please contact the administrator." 
                });
            }

            const to = "office@azhvac.ca, office@vancouverflood.com";
            console.log("📧 Processing contact form submission, sending email to:", to);

            const {
                name,
                phone,
                email,
                message,
                // Optional fields (for other forms that might use this endpoint)
                facilityType,
                projectSize,
                urgency,
                address,
                projectDetails,
            } = request.body;

            // No field validation - accept any submission to maximize leads
            console.log("📝 Received form submission with fields:", Object.keys(request.body));

            // Use message/service from contact form, or fallback to projectDetails/facilityType for other forms
            const emailContent = message || projectDetails || "";
            const serviceType = facilityType || "General Inquiry";
            const emailAddress = address || "Not provided";

            const mailOptions = {
                from: process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@azhvac.ca",
                to,
                subject: "New Contact Form Submission from AZ Air Conditioning Website",
                html: generateEmail({
                    name,
                    email,
                    phone,
                    address: emailAddress,
                    projectDetails: emailContent,
                    facilityType: serviceType,
                    projectSize: projectSize || "Not specified",
                    urgency: urgency || "Not specified",
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
                command: error.command,
                response: error.response,
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
    projectSize,
    urgency,
}: {
    name: string;
    email: string;
    phone: string;
    address: string;
    projectDetails: string;
    facilityType: string;
    projectSize: string;
    urgency: string;
}) {
    const fields = [
        name && { label: "Name", value: name },
        email && { label: "Email", value: email },
        phone && { label: "Phone", value: phone },
        address && address !== "Not provided" && { label: "Address", value: address },
        projectDetails && {
            label: facilityType && facilityType !== "General Inquiry" ? "Service" : "Message",
            value: projectDetails,
        },
        facilityType && facilityType !== "General Inquiry" && { label: "Service Type", value: facilityType },
        projectSize && projectSize !== "Not specified" && { label: "Project Size", value: projectSize },
        urgency && urgency !== "Not specified" && { label: "Urgency", value: urgency },
    ].filter(Boolean) as { label: string; value: string }[];

    return buildEmailHtml({
        title: "New Contact Form",
        subtitle: "Someone wants to reach AZ Air Conditioning and Heating",
        fields,
    });
}
