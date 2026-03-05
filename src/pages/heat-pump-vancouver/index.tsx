import React from "react";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import type { ServiceLandingConfig } from "@/components/ServiceLandingPage";

const config: ServiceLandingConfig = {
  slug: "heat-pump-vancouver",
  title: "Heat Pump Vancouver",
  metaTitle: "Heat Pump Installation Vancouver | Heat Pump Repair & Service | AZ HVAC",
  metaDescription: "Heat pump installation & repair in Vancouver. Up to $16,000 rebates. Ductless & ducted heat pumps. 100+ 5-star reviews. Call (778) 770-5721.",
  heroTitle: "Heat Pump Vancouver",
  heroSubtitle: "Energy-efficient heating and cooling with heat pumps. Installation, repair, and rebate assistance. 100+ 5-star reviews.",
  heroTrustBadge: "Up to $16,000 Rebates | Licensed & Insured | 100% Satisfaction",
  serviceType: "Heat Pump",
  breadcrumbName: "Heat Pump Vancouver",
  heroImage: "/photos/homepage/heating.png",
  introContent: "Heat pumps are ideal for Vancouver's climate—they provide efficient heating in winter and cooling in summer from one system. BC offers rebates up to $16,000 through CleanBC and FortisBC, making heat pumps an affordable upgrade. AZ Air Conditioning and Heating installs ductless mini-splits, ducted heat pumps, and hybrid systems. We help you maximize rebates and choose the right system for your home.",
  valueProps: [
    { title: "Massive Rebates Available", description: "Up to $16,000 in BC rebates for heat pump installation. We handle the paperwork and ensure you get the maximum rebate you qualify for." },
    { title: "Year-Round Comfort", description: "One system for heating and cooling. Much more efficient than furnace + AC. Lower bills, smaller carbon footprint." },
    { title: "Ideal for Vancouver", description: "Vancouver's mild winters are perfect for heat pumps. Cold-climate models work efficiently even when it's cold outside." },
  ],
  features: [
    {
      title: "Heat Pump Installation",
      points: [
        "Ductless mini-split heat pumps",
        "Ducted heat pump systems",
        "Multi-zone installations",
        "Rebate program assistance",
        "Energy efficiency upgrades",
        "Hybrid furnace + heat pump",
      ],
    },
    {
      title: "Heat Pump Repair & Service",
      points: [
        "Heat pump repair",
        "Annual maintenance",
        "Defrost cycle issues",
        "Refrigerant charging",
        "Thermostat calibration",
        "Reversing valve service",
      ],
    },
  ],
  useSimpleProcess: true,
  stats: [
    { value: "$16K", label: "MAX BC REBATES" },
    { value: "750+", label: "HEAT PUMPS INSTALLED" },
    { value: "15-20", label: "YEAR LIFESPAN" },
    { value: "100%", label: "SATISFACTION GUARANTEE" },
  ],
  faqs: [
    { question: "Are there rebates for heat pumps in BC?", answer: "Yes! BC offers rebates up to $16,000 for heat pump installation through CleanBC and FortisBC programs. Eligibility depends on replacing electric or fossil fuel heating. We help you navigate the rebate process and maximize your savings." },
    { question: "How long does heat pump installation take?", answer: "Most residential heat pump installations are completed in 1-2 days. Ductless mini-splits can often be done in a single day. Ducted systems may take 2-3 days. We'll provide a timeline during your free estimate." },
    { question: "What's the lifespan of a heat pump?", answer: "With proper maintenance, heat pumps typically last 15-20 years. We offer maintenance plans to extend the life of your system and maintain manufacturer warranties." },
    { question: "Do heat pumps work in Vancouver winters?", answer: "Yes. Modern cold-climate heat pumps work efficiently in Vancouver's mild winters. They're much more efficient than electric baseboard heat and can reduce heating costs significantly." },
  ],
  testimonials: [
    { name: "Lisa C.", role: "Vancouver Homeowner", text: "Replaced our baseboard heat with a heat pump. The rebate was huge and our winter bills are way down. Plus we have AC in summer now. Best upgrade ever." },
    { name: "Daniel P.", role: "Surrey Resident", text: "AZ helped us through the entire rebate process. Installation was smooth, system works great. Highly recommend for anyone considering a heat pump." },
    { name: "Amanda W.", role: "Verified Customer", text: "Had a ducted heat pump installed. They integrated with our existing ducts perfectly. Heating and cooling from one system. Professional from start to finish." },
  ],
};

export default function Page() {
  return <ServiceLandingPage config={config} />;
}
