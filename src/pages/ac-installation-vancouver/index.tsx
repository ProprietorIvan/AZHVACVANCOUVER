import React from "react";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import type { ServiceLandingConfig } from "@/components/ServiceLandingPage";

const config: ServiceLandingConfig = {
  slug: "ac-installation-vancouver",
  title: "AC Installation Vancouver",
  metaTitle: "AC Installation Vancouver | Central Air & Ductless | AZ HVAC",
  metaDescription: "Professional AC installation in Vancouver. Central air, ductless mini-splits. Free estimates. 100+ 5-star reviews. Call (778) 770-5721.",
  heroTitle: "AC Installation Vancouver",
  heroSubtitle: "New air conditioning installation for your home or business. Central air, ductless, and hybrid systems. Free estimates.",
  serviceType: "AC Installation",
  breadcrumbName: "AC Installation Vancouver",
  heroImage: "/photos/homepage/aircondtioning.png",
  features: [
    {
      title: "Residential AC Installation",
      points: [
        "Central air conditioning",
        "Ductless mini-split systems",
        "High-efficiency units",
        "Proper sizing and load calculation",
        "Manufacturer warranty registration",
      ],
    },
    {
      title: "Commercial AC Installation",
      points: [
        "Rooftop unit installation",
        "Split system installation",
        "VRF/VRV systems",
        "Building automation integration",
        "Energy efficiency upgrades",
      ],
    },
  ],
  faqs: [
    {
      question: "How much does AC installation cost in Vancouver?",
      answer: "Residential AC installation typically ranges from $4,000 to $15,000+ depending on system type and size. We provide free, no-obligation estimates with transparent pricing.",
    },
    {
      question: "What's the best AC system for Vancouver's climate?",
      answer: "Heat pumps are ideal for Vancouver—they provide both cooling and heating efficiently. Ductless mini-splits work well for homes without ductwork. We'll recommend the best option for your home.",
    },
    {
      question: "Do you offer financing for AC installation?",
      answer: "We offer flexible payment options. Contact us to discuss financing and rebate programs that can reduce your upfront cost.",
    },
  ],
};

export default function Page() {
  return <ServiceLandingPage config={config} />;
}
