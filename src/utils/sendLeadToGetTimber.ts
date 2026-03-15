/**
 * Sends lead data to Get Timber webhook (AZ HVAC form endpoint)
 * Returns true if lead was created, false if validation failed or error occurred
 */
export async function sendLeadToGetTimber(leadData: {
  name: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
  projectDetails?: string;
  serviceType?: string;
  facilityType?: string;
  propertyType?: string;
  projectSize?: string;
  squareFootage?: string;
  businessType?: string;
  urgency?: string;
  leadSource?: string;
  formPage?: string;
  [key: string]: any;
}): Promise<{ success: boolean; leadCreated: boolean; leadId?: string; errors?: string[] }> {
  try {
    const leadPayload = {
      name: leadData.name,
      firstName: leadData.name?.split(" ")[0] || leadData.name || "",
      lastName: leadData.name?.split(" ").slice(1).join(" ") || "",
      email: leadData.email,
      phone: leadData.phone,
      address: leadData.address,
      company: leadData.businessType || "",
      projectDetails: leadData.message || leadData.projectDetails || "",
      projectDescription: leadData.message || leadData.projectDetails || "",
      message: leadData.message || leadData.projectDetails || "",
      facilityType: leadData.facilityType || "Residential",
      propertyType: leadData.propertyType || "Residential",
      projectSize: leadData.projectSize || leadData.squareFootage || "",
      squareFootage: leadData.projectSize || leadData.squareFootage || "",
      serviceType: leadData.serviceType || "HVAC Services",
      urgency: leadData.urgency || "Not specified",
      leadSource: leadData.leadSource || "AZ Air Conditioning Website",
      preferredContactMethod: "Email",
      formPage: leadData.formPage || "/contact",
    };

    const webhookResponse = await fetch("/api/send-to-timber", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadPayload),
    });

    const webhookResult = await webhookResponse.json();

    if (webhookResult.success && webhookResult.leadId) {
      console.log("✅ Lead successfully added to Get Timber:", webhookResult.leadId);
      return {
        success: true,
        leadCreated: true,
        leadId: webhookResult.leadId,
      };
    }
    if (webhookResult.error) {
      console.warn("⚠️ Lead not added to Get Timber:", webhookResult.error);
      return {
        success: false,
        leadCreated: false,
        errors: [webhookResult.error],
      };
    }

    return {
      success: false,
      leadCreated: false,
    };
  } catch (error) {
    console.warn("Error sending lead to Get Timber webhook:", error);
    return {
      success: false,
      leadCreated: false,
    };
  }
}
