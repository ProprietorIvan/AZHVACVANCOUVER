import React from "react";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import type { ServiceLandingConfig } from "@/components/ServiceLandingPage";

const config: ServiceLandingConfig = {
  slug: "furnace-repair-vancouver",
  title: "Furnace Repair & Installation Vancouver",
  metaTitle: "Furnace Repair & Installation Vancouver | Heating Service | AZ HVAC",
  metaDescription: "Professional furnace repair and installation in Vancouver. Gas and electric. 24/7 emergency heating. FortisBC rebates. 100+ 5-star reviews. Call (778) 770-5721.",
  heroTitle: "Furnace Repair & Installation Vancouver",
  heroSubtitle: "Keep your home warm with expert furnace repair and installation. 24/7 emergency heating service across Vancouver. 100+ 5-star reviews.",
  heroTrustBadge: "2-Hour Response Time | Licensed & Insured | 100% Satisfaction Guaranteed",
  serviceType: "Furnace Repair & Installation",
  breadcrumbName: "Furnace Repair & Installation Vancouver",
  heroImage: "/photos/homepage/heating.png",
  introContent: "Vancouver's wet, mild winters demand reliable heating. When your furnace fails or you're considering a replacement, AZ Air Conditioning and Heating delivers expert service. We repair and install gas and electric furnaces from all major brands. Our technicians diagnose issues quickly—most repairs completed on the first visit. High-efficiency furnaces may qualify for FortisBC rebates. We provide honest repair vs. replace recommendations and never upsell.",
  valueProps: [
    { title: "2-Hour Emergency Response", description: "When your heat goes out in winter, we respond within 2 hours. No overtime charges for after-hours emergencies. Your family's comfort is our priority." },
    { title: "Honest Repair vs. Replace Advice", description: "We'll tell you if repair makes sense or if replacement is more cost-effective. No pressure—just transparent recommendations based on your system's condition." },
    { title: "FortisBC Rebate Expertise", description: "High-efficiency furnace installations may qualify for rebates. We help you navigate the paperwork and maximize your savings." },
  ],
  features: [
    {
      title: "Furnace Repair Services",
      points: [
        "Gas furnace repair",
        "Electric furnace service",
        "No heat diagnostics",
        "Pilot light & ignition repair",
        "Blower motor replacement",
        "Heat exchanger inspection",
        "Thermostat repair",
        "Limit switch replacement",
      ],
    },
    {
      title: "Furnace Installation & Replacement",
      points: [
        "Gas and electric furnace installation",
        "High-efficiency (95%+ AFUE) units",
        "Proper sizing and duct assessment",
        "FortisBC rebate assistance",
        "Old unit removal and disposal",
        "Warranty registration",
        "Thermostat upgrades",
      ],
    },
  ],
  useSimpleProcess: true,
  stats: [
    { value: "750+", label: "VANCOUVER FURNACE PROJECTS" },
    { value: "2hr", label: "EMERGENCY RESPONSE" },
    { value: "24/7", label: "HEATING EMERGENCY SERVICE" },
    { value: "100%", label: "SATISFACTION GUARANTEE" },
  ],
  faqs: [
    { question: "How do I know if my furnace needs repair?", answer: "Signs include no heat, strange noises (banging, squealing), high bills, uneven heating, or the furnace cycling on and off (short-cycling). A yellow flame instead of blue can indicate a problem. Call us for a free diagnostic—we'll identify the issue and provide a transparent quote." },
    { question: "Do you offer 24/7 furnace repair?", answer: "Yes. We offer 24/7 emergency furnace repair in Vancouver. When your heat goes out in winter, we respond within 2 hours. No overtime charges for after-hours emergencies. Your safety and comfort matter." },
    { question: "What's the cost of furnace repair in Vancouver?", answer: "Repair costs depend on the issue. We provide free estimates. Typical repairs: ignitor ($150-$300), flame sensor ($100-$200), blower motor ($300-$600). We always explain the cost before starting and never add hidden fees." },
    { question: "How much does furnace installation cost in Vancouver?", answer: "Furnace installation typically ranges from $4,000 to $12,000+ depending on efficiency (80% vs. 95%+ AFUE) and size. High-efficiency models may qualify for FortisBC rebates. We provide free estimates and rebate assistance." },
    { question: "Should I repair or replace my furnace?", answer: "If your furnace is over 15 years old, has frequent repairs, or has rising energy bills, replacement may be more cost-effective. We provide honest assessments—we'll never recommend replacement when repair makes sense." },
  ],
  testimonials: [
    { name: "Michelle B.", role: "Vancouver Homeowner", text: "Our furnace died at 10pm in January. They came within 2 hours, fixed the ignitor, and had our heat back on. No overtime charge. Incredible service!" },
    { name: "David K.", role: "Burnaby Resident", text: "Had a new high-efficiency furnace installed. They helped us with the FortisBC rebate and the installation was flawless. Warm and efficient all winter." },
    { name: "Lisa C.", role: "Verified Customer", text: "Fast, professional furnace repair. The technician explained everything clearly and the price was fair. Will definitely call again." },
  ],
};

export default function Page() {
  return <ServiceLandingPage config={config} />;
}
