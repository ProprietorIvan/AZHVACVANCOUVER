import React from "react";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import type { ServiceLandingConfig } from "@/components/ServiceLandingPage";

const config: ServiceLandingConfig = {
  slug: "hvac-maintenance-vancouver",
  title: "HVAC Maintenance Vancouver",
  metaTitle: "HVAC Maintenance Plans Vancouver | AC & Furnace Tune-Up | AZ HVAC",
  metaDescription: "HVAC maintenance plans in Vancouver. Prevent breakdowns, extend equipment life. Annual tune-ups. 100+ 5-star reviews. Call (778) 770-5721.",
  heroTitle: "HVAC Maintenance Vancouver",
  heroSubtitle: "Preventive maintenance to keep your HVAC running efficiently. Avoid costly repairs. Extend equipment life. Maintain warranties.",
  heroTrustBadge: "Annual Tune-Ups | Priority Emergency | 100% Satisfaction",
  serviceType: "HVAC Maintenance",
  breadcrumbName: "HVAC Maintenance Vancouver",
  heroImage: "/photos/homepage/aircondtioning.png",
  introContent: "Annual HVAC maintenance prevents breakdowns, improves efficiency, and extends equipment life. AZ Air Conditioning and Heating offers tune-ups for furnaces, air conditioners, and heat pumps. Schedule AC maintenance in spring (April-May) before the first heat wave. Schedule furnace maintenance in fall (September-October) before heating season. Our maintenance plans include priority emergency response and discounts on repairs.",
  valueProps: [
    { title: "Prevent Breakdowns", description: "Catch small issues before they become expensive repairs. Dirty coils, worn parts, low refrigerant—we find and fix them during tune-ups." },
    { title: "Maintain Warranties", description: "Many manufacturers require annual maintenance to keep warranties valid. We document every visit and provide reports for your records." },
    { title: "Lower Energy Bills", description: "Clean, well-maintained systems run more efficiently. You'll save on heating and cooling costs—often more than the maintenance cost." },
  ],
  features: [
    {
      title: "Residential Maintenance",
      points: [
        "Annual AC tune-up (spring)",
        "Furnace maintenance (fall)",
        "Heat pump service",
        "Filter replacement",
        "Efficiency testing",
        "Refrigerant level check",
        "Coil cleaning",
      ],
    },
    {
      title: "Maintenance Plans",
      points: [
        "Scheduled service visits",
        "Priority emergency response",
        "Discount on repairs",
        "Warranty compliance",
        "Peace of mind",
        "Detailed inspection reports",
      ],
    },
  ],
  useSimpleProcess: true,
  stats: [
    { value: "750+", label: "MAINTENANCE CUSTOMERS" },
    { value: "2hr", label: "PRIORITY EMERGENCY" },
    { value: "15%", label: "REPAIR DISCOUNT (PLANS)" },
    { value: "100%", label: "SATISFACTION GUARANTEE" },
  ],
  faqs: [
    { question: "How often should I get HVAC maintenance?", answer: "We recommend annual maintenance for both heating and cooling systems—typically furnace tune-up in fall (September-October) and AC tune-up in spring (April-May) before peak season. This keeps systems ready when you need them most." },
    { question: "What's included in a maintenance visit?", answer: "Our tune-ups include full inspection, coil cleaning, filter check/replacement, lubrication, efficiency testing, refrigerant check (AC/heat pump), and a detailed report. We'll identify any issues before they become costly repairs." },
    { question: "Do maintenance plans save money?", answer: "Yes. Regular maintenance prevents breakdowns, improves efficiency (lower bills), extends equipment life, and maintains manufacturer warranties. Most customers save more than the plan cost through avoided repairs and lower energy bills." },
    { question: "Can I get both furnace and AC maintenance?", answer: "Yes. We offer combined plans that include both annual tune-ups. Schedule furnace in fall and AC in spring—we'll send reminders so you never miss a service." },
  ],
  testimonials: [
    { name: "Kevin T.", role: "Vancouver Homeowner", text: "Annual maintenance for 5 years. They've caught small issues before they became big ones. Our AC and furnace run like new. Worth every penny." },
    { name: "Sarah M.", role: "Burnaby Resident", text: "Maintenance plan includes priority emergency. When our furnace had an issue, they were here within 2 hours. Great peace of mind." },
    { name: "Robert L.", role: "Verified Customer", text: "Professional tune-ups. They explain everything and leave a detailed report. Our energy bills have gone down since we started maintenance." },
  ],
};

export default function Page() {
  return <ServiceLandingPage config={config} />;
}
