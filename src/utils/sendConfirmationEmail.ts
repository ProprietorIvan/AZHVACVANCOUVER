import type { Transporter } from "nodemailer";

export type ConfirmationEmailOptions = {
  name?: string;
  email?: string;
  serviceType?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif";

export function generateConfirmationEmailHtml({
  name,
  serviceType,
}: {
  name: string;
  serviceType?: string;
}): string {
  const displayName = name || "there";
  const year = new Date().getFullYear();
  const serviceBlock = serviceType
    ? `<tr>
         <td style="padding: 0 0 36px;">
           <table role="presentation" cellpadding="0" cellspacing="0" style="background-color: #fff8e6; border-radius: 100px;">
             <tr>
               <td style="padding: 8px 16px; font-family: ${FONT}; font-size: 13px; font-weight: 500; letter-spacing: -0.01em; color: #8a6a00;">
                 ${escapeHtml(serviceType)}
               </td>
             </tr>
           </table>
         </td>
       </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We've got your request</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f7; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    Thanks ${escapeHtml(displayName)} — your request is in and we'll be in touch soon.
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f7;">
    <tr>
      <td align="center" style="padding: 48px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #ffffff; border-radius: 20px; overflow: hidden;">

          <!-- Accent stripe -->
          <tr>
            <td style="height: 4px; background-color: #ffc527; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <tr>
            <td style="padding: 48px 44px 44px; font-family: ${FONT};">

              <p style="margin: 0 0 32px; font-size: 13px; font-weight: 500; letter-spacing: 0.04em; color: #1d1d1f;">
                Felicita Holdings Ltd.
              </p>

              <!-- Check mark -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 0 28px;">
                <tr>
                  <td align="center" valign="middle" width="44" height="44" style="width: 44px; height: 44px; background-color: #ffc527; border-radius: 50%; font-size: 20px; line-height: 44px; color: #1d1d1f;">
                    ✓
                  </td>
                </tr>
              </table>

              <h1 style="margin: 0 0 12px; font-size: 32px; font-weight: 600; letter-spacing: -0.03em; line-height: 1.15; color: #1d1d1f;">
                You're all set, ${escapeHtml(displayName)}.
              </h1>

              <p style="margin: 0 0 28px; font-size: 17px; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; color: #6e6e73;">
                We got your request. Someone from the team will follow up shortly with next steps.
              </p>

              ${serviceBlock}

              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #f0f0f2;">
                <tr>
                  <td style="padding: 28px 0 0;">
                    <p style="margin: 0 0 6px; font-size: 13px; font-weight: 400; color: #86868b;">
                      Need us sooner?
                    </p>
                    <p style="margin: 0; font-size: 16px; font-weight: 500; letter-spacing: -0.01em; color: #1d1d1f;">
                      <a href="tel:+17787705721" style="color: #1d1d1f; text-decoration: none;">(778) 770-5721</a>
                      <span style="color: #d2d2d7; padding: 0 8px;">·</span>
                      <a href="mailto:office@felicita-group.com" style="color: #1d1d1f; text-decoration: none;">office@felicita-group.com</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <tr>
            <td style="padding: 0 44px 36px; font-family: ${FONT};">
              <p style="margin: 0; font-size: 12px; font-weight: 400; line-height: 1.5; color: #a1a1a6;">
                © ${year} Felicita Holdings Ltd. · Vancouver, BC
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Sends a confirmation email to the form submitter.
 * Failures are logged but not thrown — office notifications should still succeed.
 */
export async function sendConfirmationEmail(
  transporter: Transporter,
  { name, email, serviceType }: ConfirmationEmailOptions
): Promise<void> {
  const trimmedEmail = (email || "").trim();
  if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
    console.log("⏭️ Skipping confirmation email — no valid recipient email");
    return;
  }

  const displayName = (name || "").trim();
  const from =
    process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@azhvac.ca";

  try {
    await transporter.sendMail({
      from: `"Felicita Holdings Ltd." <${from}>`,
      to: trimmedEmail,
      replyTo: "office@felicita-group.com",
      subject: "We've received your request",
      html: generateConfirmationEmailHtml({
        name: displayName,
        serviceType: serviceType?.trim() || undefined,
      }),
    });
    console.log("✅ Confirmation email sent to:", trimmedEmail);
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error);
  }
}
