/** Server-side only. Forwards lead to Timber webhook. */
export async function forwardToTimber(payload: {
  name: string;
  email: string;
  phone: string;
  address?: string;
  message?: string;
  projectDetails?: string;
  serviceType?: string;
  formPage: string;
  leadSource: string;
}) {
  try {
    const body = {
      name: payload.name,
      firstName: (payload.name || "").split(" ")[0] || "",
      lastName: (payload.name || "").split(" ").slice(1).join(" ") || "",
      email: payload.email,
      phone: payload.phone,
      address: payload.address || "",
      message: payload.message || payload.projectDetails || "",
      projectDetails: payload.message || payload.projectDetails || "",
      serviceType: payload.serviceType || "General",
      formSource: "azhvac.ca",
      formPage: payload.formPage,
      leadSource: payload.leadSource,
    };
    const res = await fetch("https://gettimber.ai/api/webhooks/forms/az-hvac", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.success) console.log("✅ Lead sent to Timber:", data.leadId);
    else console.warn("⚠️ Timber:", data.error);
  } catch (e: any) {
    console.warn("Timber forward failed (non-blocking):", e?.message);
  }
}
