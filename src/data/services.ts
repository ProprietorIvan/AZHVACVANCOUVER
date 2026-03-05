export interface ServiceItem {
  title: string;
  description: string;
  image: string;
  link: string;
}

export const ALL_SERVICES: ServiceItem[] = [
  { title: "AC Repair & Installation", description: "Central air, ductless. 24/7 emergency.", image: "/photos/homepage/aircondtioning.png", link: "/hvac" },
  { title: "Furnace Repair & Installation", description: "Gas and electric. Rebate assistance.", image: "/photos/homepage/heating.png", link: "/furnace-repair-vancouver" },
  { title: "Heat Pump Vancouver", description: "Energy-efficient heating & cooling. Rebates.", image: "/photos/homepage/boiler.png", link: "/heat-pump-vancouver" },
  { title: "Ductless Mini-Split", description: "No ductwork needed. Rebates available.", image: "/photos/homepage/Duct-lessminisplit.png", link: "/ductless-mini-split-vancouver" },
  { title: "Boiler Service", description: "Hydronic heating systems.", image: "/photos/homepage/boilerservice.png", link: "/boiler-service-vancouver" },
  { title: "Duct Cleaning", description: "Professional duct cleaning. Air quality.", image: "/photos/homepage/ductcleaning.png", link: "/duct-cleaning-vancouver" },
  { title: "Commercial HVAC", description: "Rooftop units, VRF systems. Maintenance.", image: "/photos/homepage/commericial.jpg", link: "/commercial-hvac-vancouver" },
  { title: "HVAC Maintenance", description: "Preventive plans. Annual tune-ups.", image: "/photos/homepage/hvacmaintance.png", link: "/hvac-maintenance-vancouver" },
  { title: "Emergency HVAC", description: "24/7 service. 2-hour response.", image: "/photos/homepage/24/7-response.png", link: "/emergency-hvac-vancouver" },
];

/** Top 3 most relevant services per page slug. Falls back to first 3 if slug not found. */
export const TOP_SERVICES_BY_PAGE: Record<string, string[]> = {
  "hvac": ["/hvac", "/ductless-mini-split-vancouver", "/emergency-hvac-vancouver"],
  "furnace-repair-vancouver": ["/furnace-repair-vancouver", "/boiler-service-vancouver", "/emergency-hvac-vancouver"],
  "boiler-service-vancouver": ["/boiler-service-vancouver", "/furnace-repair-vancouver", "/emergency-hvac-vancouver"],
  "heat-pump-vancouver": ["/heat-pump-vancouver", "/ductless-mini-split-vancouver", "/furnace-repair-vancouver"],
  "ductless-mini-split-vancouver": ["/ductless-mini-split-vancouver", "/heat-pump-vancouver", "/hvac"],
  "duct-cleaning-vancouver": ["/duct-cleaning-vancouver", "/hvac", "/hvac-maintenance-vancouver"],
  "commercial-hvac-vancouver": ["/commercial-hvac-vancouver", "/emergency-hvac-vancouver", "/hvac-maintenance-vancouver"],
  "hvac-maintenance-vancouver": ["/hvac-maintenance-vancouver", "/hvac", "/furnace-repair-vancouver"],
  "emergency-hvac-vancouver": ["/emergency-hvac-vancouver", "/furnace-repair-vancouver", "/hvac"],
};

export function getTopServicesForPage(slug: string): ServiceItem[] {
  const links = TOP_SERVICES_BY_PAGE[slug] ?? ["/hvac", "/furnace-repair-vancouver", "/emergency-hvac-vancouver"];
  return links
    .map((link) => ALL_SERVICES.find((s) => s.link === link))
    .filter((s): s is ServiceItem => !!s);
}
