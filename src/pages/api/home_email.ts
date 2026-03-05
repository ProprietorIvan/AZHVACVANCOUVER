import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

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

            const to = process.env.HVAC_EMAIL || "info@azhvac.ca";
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

    return `
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>AZ Air Conditioning and Heating</title>
                <style>
                    body, table, td, div, p, a {
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                        margin: 0;
                        padding: 0;
                        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
                        line-height: 1.47059;
                        letter-spacing: -0.022em;
                        text-align: center;
                    }

                    .email-wrapper {
                        width: 100%;
                        max-width: 680px;
                        margin: 0 auto;
                        background-color: #ffffff;
                    }

                    .header {
                        background-color: #ffffff;
                        padding: 48px 0;
                        text-align: center;
                        position: relative;
                        border-bottom: 2px solid #fafafa;
                    }

                    .header::after {
                        content: '';
                        position: absolute;
                        bottom: -2px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 100px;
                        height: 2px;
                        background: #ffc527;
                    }

                    .content {
                        padding: 48px 32px;
                        background-color: #ffffff;
                    }

                    .section {
                        margin-bottom: 48px;
                        padding: 40px;
                        background: #ffffff;
                        border-radius: 24px;
                        box-shadow: 0 2px 40px rgba(0, 0, 0, 0.04);
                    }

                    .section:hover {
                        box-shadow: 0 4px 50px rgba(0, 0, 0, 0.06);
                        transform: translateY(-2px);
                        transition: all 0.4s ease;
                    }

                    .footer {
                        text-align: center;
                        padding: 32px;
                        background: #ffffff;
                        color: #000000;
                    }

                    h2 {
                        color: #000000;
                        font-size: 24px;
                        font-weight: 600;
                        letter-spacing: -0.003em;
                        margin-bottom: 32px;
                        display: inline-block;
                        position: relative;
                    }

                    h2::after {
                        content: '';
                        position: absolute;
                        bottom: -8px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 40px;
                        height: 2px;
                        background: #ffc527;
                        opacity: 0.7;
                    }

                    .info-label {
                        color: #000000;
                        font-size: 12px;
                        font-weight: 600;
                        letter-spacing: 0.03em;
                        text-transform: uppercase;
                        margin-bottom: 8px;
                        opacity: 0.5;
                    }

                    .info-value {
                        color: #000000;
                        font-size: 17px;
                        margin-bottom: 32px;
                        word-break: break-word;
                        font-weight: 400;
                        padding: 20px;
                        background: #ffffff;
                        border-radius: 16px;
                        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.03);
                        max-width: 400px;
                        margin-left: auto;
                        margin-right: auto;
                        border: 1px solid rgba(0, 0, 0, 0.03);
                    }
                </style>
            </head>
            <body>
                <div class="email-wrapper">
                    <div class="header">
                        <h2>New Quote Request</h2>
                    </div>
                    
                    <div class="content">
                        <div class="section">
                            ${serviceName ? `<div class="info-label">Service Requested</div><div class="info-value">${serviceName}</div>` : ""}
                            ${name ? `<div class="info-label">Name</div><div class="info-value">${name}</div>` : ""}
                            ${phone ? `<div class="info-label">Phone</div><div class="info-value">${phone}</div>` : ""}

                            ${email ? `<div class="info-label">Email</div><div class="info-value">${email}</div>` : ""}
                            ${address ? `<div class="info-label">Address</div><div class="info-value">${address}</div>` : ""}
                            ${projectDetails ? `<div class="info-label">Project Details</div><div class="info-value">${projectDetails}</div>` : ""}
                        </div>
                    </div>

                    <div class="footer">
                        <p>© ${new Date().getFullYear()} AZ Air Conditioning and Heating. All rights reserved.</p>
                    </div>
                </div>
            </body>
        </html>
    `;
} 