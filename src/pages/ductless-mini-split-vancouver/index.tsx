import React from "react";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import type { ServiceLandingConfig } from "@/components/ServiceLandingPage";

const config: ServiceLandingConfig = {
  slug: "ductless-mini-split-vancouver",
  title: "Ductless Mini-Split Vancouver",
  metaTitle: "Ductless Mini-Split Installation Vancouver | AC & Heat Pump | AZ HVAC",
  metaDescription: "Ductless mini-split installation in Vancouver. Energy-efficient heating & cooling. Rebate assistance. 100+ 5-star reviews. Call (778) 770-5721.",
  heroTitle: "Ductless Mini-Split Vancouver",
  heroSubtitle: "Energy-efficient heating and cooling without ductwork. Perfect for additions, condos, and homes. Rebate programs available.",
  heroTrustBadge: "Up to $16,000 Rebates | Licensed Installation | 100% Satisfaction",
  serviceType: "Ductless Mini-Split",
  breadcrumbName: "Ductless Mini-Split Vancouver",
  heroImage: "/photos/homepage/heating.png",
  introContent: "Ductless mini-splits deliver efficient heating and cooling without ductwork—ideal for Vancouver homes with no ducts, additions, or room-by-room control. Each indoor unit connects to an outdoor condenser. AZ Air Conditioning and Heating installs Daikin, Mitsubishi, Fujitsu, and other top brands. CleanBC and FortisBC rebates can save you thousands. We size systems properly for Vancouver's climate and handle the rebate paperwork.",
  valueProps: [
    { title: "No Ductwork Needed", description: "Perfect for older homes, additions, condos, or garages. Each zone has its own thermostat. No expensive duct installation." },
    { title: "Rebate Assistance", description: "Up to $16,000 in BC rebates for heat pump mini-splits. We help you navigate CleanBC and FortisBC applications and maximize your savings." },
    { title: "Efficient Heating & Cooling", description: "One system for year-round comfort. Heat in winter, cool in summer. Much more efficient than baseboard heat + window AC." },
  ],
  features: [
    {
      title: "Installation",
      points: [
        "Single and multi-zone systems",
        "Wall-mounted and ceiling cassette units",
        "Daikin, Mitsubishi, Fujitsu brands",
        "Rebate program assistance",
        "Professional sizing and design",
        "Proper refrigerant line routing",
      ],
    },
    {
      title: "Repair & Maintenance",
      points: [
        "Mini-split repair",
        "Refrigerant charging",
        "Filter cleaning",
        "Annual maintenance plans",
        "Warranty service",
        "Defrost cycle diagnostics",
      ],
    },
  ],
  useSimpleProcess: true,
  stats: [
    { value: "$16K", label: "MAX REBATES AVAILABLE" },
    { value: "1-2", label: "DAY INSTALLATION" },
    { value: "24/7", label: "REPAIR SERVICE" },
    { value: "100%", label: "SATISFACTION GUARANTEE" },
  ],
  faqs: [
    { question: "How much does ductless mini-split installation cost in Vancouver?", answer: "Costs vary by system size and zones. Single-zone systems typically start around $3,500. Multi-zone installations range from $6,000-$15,000+. With rebates, your net cost can be significantly lower. We provide free estimates and rebate assistance." },
    { question: "Are there rebates for ductless mini-splits in BC?", answer: "Yes. CleanBC and FortisBC offer rebates up to $16,000 for heat pump installations including ductless mini-splits. Eligibility depends on system efficiency and your existing heating. We help navigate the application process." },
    { question: "How long does installation take?", answer: "Most single-zone installations are completed in one day. Multi-zone systems may take 2-3 days depending on number of units and complexity. We'll provide a timeline during your free estimate." },
    { question: "Can ductless mini-splits heat in Vancouver winters?", answer: "Yes. Modern cold-climate heat pumps work efficiently in Vancouver's mild winters. They're an excellent replacement for baseboard or electric heat—much lower operating costs." },
  ],
  testimonials: [
    { name: "James L.", role: "Burnaby Resident", text: "Had a ductless mini-split installed in our addition. The crew was efficient, helped with the BC Hydro rebate, and the system works perfectly. Best decision we made." },
    { name: "Rachel K.", role: "Vancouver Condo Owner", text: "No central ductwork in our condo. Mini-split was the perfect solution. Heating and cooling in one unit. Rebate covered a big chunk of the cost." },
    { name: "Tom W.", role: "Verified Customer", text: "Multi-zone installation for our older home. Each room has its own temperature control. Efficient and comfortable. Great installation experience." },
  ],
};

export default function Page() {
  return <ServiceLandingPage config={config} />;
}
