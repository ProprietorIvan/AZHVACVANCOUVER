import React from "react";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import type { ServiceLandingConfig } from "@/components/ServiceLandingPage";

const config: ServiceLandingConfig = {
  slug: "furnace-installation-vancouver",
  title: "Furnace Installation Vancouver",
  metaTitle: "Furnace Installation Vancouver | Gas & Electric | AZ HVAC",
  metaDescription: "Furnace installation in Vancouver. Gas and electric furnaces. High-efficiency units. FortisBC rebates. 100+ 5-star reviews. Call (778) 770-5721.",
  heroTitle: "Furnace Installation Vancouver",
  heroSubtitle: "New furnace installation for your Vancouver home. Gas and electric options. High-efficiency models with rebate assistance.",
  serviceType: "Furnace Installation",
  breadcrumbName: "Furnace Installation Vancouver",
  heroImage: "/photos/homepage/heating.png",
  features: [
    {
      title: "Furnace Installation",
      points: [
        "Gas furnace installation",
        "Electric furnace installation",
        "High-efficiency (95%+ AFUE) units",
        "Proper sizing and duct assessment",
        "FortisBC rebate assistance",
      ],
    },
    {
      title: "Furnace Replacement",
      points: [
        "Same-day quotes",
        "Old unit removal and disposal",
        "Duct modifications if needed",
        "Thermostat upgrades",
        "Warranty registration",
      ],
    },
  ],
  faqs: [
    {
      question: "How much does furnace installation cost in Vancouver?",
      answer: "Furnace installation typically ranges from $4,000 to $12,000+ depending on efficiency and size. High-efficiency models may qualify for FortisBC rebates. We provide free estimates.",
    },
    {
      question: "How long does furnace installation take?",
      answer: "Most residential furnace installations are completed in one day. We'll give you a specific timeline during your free estimate.",
    },
    {
      question: "Should I repair or replace my furnace?",
      answer: "If your furnace is over 15 years old, has frequent repairs, or has rising energy bills, replacement may be more cost-effective. We provide honest assessments and recommendations.",
    },
  ],
};

export default function Page() {
  return <ServiceLandingPage config={config} />;
}
