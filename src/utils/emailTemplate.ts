/**
 * Sleek, email-client-compatible HTML template for form submissions.
 * Uses table layout and inline styles for maximum compatibility.
 */

export interface EmailField {
  label: string;
  value: string;
}

export function buildEmailHtml(options: {
  title: string;
  subtitle?: string;
  fields: EmailField[];
}) {
  const { title, subtitle, fields } = options;
  const year = new Date().getFullYear();

  const fieldRows = fields
    .filter((f) => f.value && String(f.value).trim())
    .map(
      (f) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; width: 140px; vertical-align: top;">
          ${escapeHtml(f.label)}
        </td>
        <td style="padding: 12px 0 12px 20px; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #111827; line-height: 1.5; word-break: break-word;">
          ${escapeHtml(String(f.value))}
        </td>
      </tr>
    `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${escapeHtml(title)}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #111827; padding: 36px 40px; text-align: left;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="width: 48px; height: 4px; background: #ffc527; border-radius: 2px; margin-bottom: 16px;"></div>
                    <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em; line-height: 1.3;">
                      ${escapeHtml(title)}
                    </h1>
                    ${subtitle ? `<p style="margin: 8px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.75); font-weight: 400;">${escapeHtml(subtitle)}</p>` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 40px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                ${fieldRows}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background: #f9fafb; border-top: 1px solid #f0f0f0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af; font-weight: 500;">
                AZ Air Conditioning and Heating · Vancouver
              </p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #d1d5db;">
                © ${year} All rights reserved. Confidential.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
