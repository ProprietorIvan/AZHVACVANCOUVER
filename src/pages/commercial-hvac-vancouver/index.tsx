import React from "react";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import type { ServiceLandingConfig } from "@/components/ServiceLandingPage";

const config: ServiceLandingConfig = {
  slug: "commercial-hvac-vancouver",
  title: "Commercial HVAC Vancouver",
  metaTitle: "Commercial HVAC Vancouver | Rooftop, VRF, Building Automation | AZ HVAC",
  metaDescription: "Commercial HVAC services in Vancouver. Rooftop units, VRF systems, building automation. 24/7 service. Call (778) 770-5721.",
  heroTitle: "Commercial HVAC Vancouver",
  heroSubtitle: "Full-service commercial HVAC for offices, retail, restaurants, and industrial facilities. Installation, repair, and maintenance contracts.",
  heroTrustBadge: "2-Hour Response | Licensed & Insured | 24/7 Commercial Service",
  serviceType: "Commercial HVAC",
  breadcrumbName: "Commercial HVAC Vancouver",
  heroImage: "/photos/homepage/commericial.jpg",
  introContent: "Commercial HVAC failures mean lost productivity, unhappy tenants, and revenue at risk. AZ Air Conditioning and Heating provides full-service commercial HVAC for Vancouver businesses. We service rooftop units (RTUs), VRF/VRV systems, chillers, boilers, and building automation. Our team understands the urgency—we prioritize commercial emergencies and offer maintenance contracts to prevent downtime. From office towers to restaurants to warehouses, we keep your business comfortable and compliant.",
  valueProps: [
    { title: "Minimize Downtime", description: "We understand commercial urgency. 2-hour emergency response. Same-day service when possible. Preventive maintenance contracts to avoid failures during business hours." },
    { title: "All System Types", description: "Rooftop units, split systems, VRF/VRV, chillers, boilers, refrigeration. Our technicians are trained on commercial equipment from all major manufacturers." },
    { title: "Maintenance Contracts", description: "Customized plans to keep systems running efficiently. Scheduled visits, priority response, compliance documentation. Protect your investment." },
  ],
  features: [
    {
      title: "Commercial Services",
      points: [
        "Rooftop unit (RTU) repair and installation",
        "VRF/VRV system installation",
        "Chiller and boiler service",
        "Building automation systems",
        "Refrigeration systems",
        "Split system maintenance",
      ],
    },
    {
      title: "Maintenance & Repair",
      points: [
        "Preventive maintenance contracts",
        "24/7 emergency service",
        "Energy efficiency audits",
        "Filter and coil cleaning",
        "Compliance documentation",
        "Same-day service when possible",
      ],
    },
  ],
  useSimpleProcess: true,
  stats: [
    { value: "750+", label: "COMMERCIAL PROJECTS" },
    { value: "2hr", label: "EMERGENCY RESPONSE" },
    { value: "24/7", label: "COMMERCIAL SERVICE" },
    { value: "100%", label: "SATISFACTION GUARANTEE" },
  ],
  serviceAreas: ["Downtown Vancouver", "Burnaby", "Richmond", "Surrey", "Coquitlam", "New Westminster", "North Vancouver", "West Vancouver", "Delta", "Langley"],
  faqs: [
    { question: "Do you offer commercial HVAC maintenance contracts?", answer: "Yes. We offer customized maintenance plans to keep your commercial HVAC systems running efficiently, prevent breakdowns, and maintain manufacturer warranties. Plans include scheduled visits, priority emergency response, and documentation." },
    { question: "What types of commercial buildings do you serve?", answer: "We serve offices, retail stores, restaurants, hotels, medical facilities, warehouses, and industrial buildings throughout Vancouver and the Lower Mainland. Our team has experience with all commercial HVAC system types." },
    { question: "What's your response time for commercial emergencies?", answer: "We guarantee 2-hour response for emergency commercial HVAC calls. We understand that HVAC failures affect your business—we prioritize commercial emergencies and resolve many issues same-day." },
    { question: "Can you work after hours to minimize disruption?", answer: "Yes. We offer after-hours and weekend service for commercial clients. We'll work with your schedule to minimize business disruption during repairs and installations." },
  ],
  testimonials: [
    { name: "Michael C.", role: "Commercial Property Manager", text: "They maintain HVAC for 6 of our buildings. Reliable, professional, and their emergency response has saved us multiple times. Best commercial HVAC in Vancouver." },
    { name: "Emily R.", role: "Restaurant Owner", text: "Kitchen AC died on a busy Friday. They had a tech out within 90 minutes and fixed it before dinner rush. Incredible service." },
    { name: "David L.", role: "Office Building Manager", text: "Maintenance contract with AZ for 2 years. Fewer breakdowns, better efficiency, and when we do have issues, they're here fast." },
  ],
};

export default function Page() {
  return <ServiceLandingPage config={config} />;
}
