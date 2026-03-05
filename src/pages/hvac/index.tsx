import React from "react";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import type { ServiceLandingConfig } from "@/components/ServiceLandingPage";

const config: ServiceLandingConfig = {
  slug: "hvac",
  title: "AC Repair & Installation Vancouver",
  metaTitle: "AC Repair & Installation Vancouver | Air Conditioning Service | AZ HVAC",
  metaDescription: "Professional AC repair and installation in Vancouver. Central air, ductless mini-splits. 24/7 emergency service. 100+ 5-star reviews. Call (778) 770-5721.",
  heroTitle: "AC Repair & Installation Vancouver",
  heroSubtitle: "Fast, reliable air conditioning repair and installation across Vancouver and the Lower Mainland. 24/7 emergency service. 100+ 5-star reviews.",
  heroTrustBadge: "2-Hour Response Time | Licensed & Insured | 100% Satisfaction Guaranteed",
  serviceType: "AC Repair & Installation",
  breadcrumbName: "AC Repair & Installation Vancouver",
  heroImage: "/photos/homepage/aircondtioning.png",
  valueProps: [
    { title: "2-Hour Emergency Response", description: "When your AC fails in summer, we respond within 2 hours. Our Vancouver-based team prioritizes cooling emergencies—no one should suffer through a heat wave without AC." },
    { title: "Same-Day Repair & Installation", description: "Most AC repairs completed on first visit. New installations scheduled within days. We carry common parts and size equipment properly for Vancouver's climate." },
    { title: "100% Satisfaction Guarantee", description: "100+ 5-star reviews from Vancouver homeowners. We stand behind every repair and installation. Transparent pricing, no surprises." },
  ],
  features: [
    {
      title: "Residential AC Repair & Installation",
      points: [
        "Central air conditioning repair and installation",
        "Ductless mini-split service and new systems",
        "AC not cooling diagnostics",
        "Refrigerant leak detection and recharge",
        "Compressor & fan motor repair",
        "High-efficiency units with proper load calculation",
        "Thermostat upgrades and smart controls",
        "Manufacturer warranty registration",
      ],
    },
    {
      title: "Commercial AC Service",
      points: [
        "Rooftop unit repair and installation",
        "Split system maintenance",
        "VRF/VRV systems",
        "Emergency cooling restoration",
        "Preventive maintenance plans",
        "Energy efficiency upgrades",
        "Building automation integration",
      ],
    },
  ],
  useSimpleProcess: true,
  stats: [
    { value: "750+", label: "VANCOUVER AC PROJECTS" },
    { value: "2hr", label: "EMERGENCY RESPONSE" },
    { value: "24/7", label: "LOWER MAINLAND SERVICE" },
    { value: "100%", label: "SATISFACTION GUARANTEE" },
  ],
  serviceAreas: ["Downtown Vancouver", "West Vancouver", "North Vancouver", "Burnaby", "Richmond", "Surrey", "Coquitlam", "New Westminster", "Kitsilano", "East Vancouver", "Delta", "Langley"],
  faqs: [
    {
      question: "How much does AC repair cost in Vancouver?",
      answer: "AC repair costs vary based on the issue. We provide free estimates. Typical repairs range from $150-$500 for common issues like capacitor replacement, refrigerant recharge, or thermostat repair. Major repairs (compressor, evaporator coil) may cost more. We always explain the cost before starting and offer transparent pricing with no hidden fees.",
    },
    {
      question: "How much does AC installation cost in Vancouver?",
      answer: "Residential AC installation typically ranges from $4,000 to $15,000+ depending on system type (central vs. ductless), size, and efficiency. Ductless mini-splits start around $3,500 per zone. Central air systems with existing ductwork run $5,000-$12,000. We provide free, no-obligation estimates and help you access BC Hydro and FortisBC rebates—many homeowners save thousands.",
    },
    {
      question: "Do you offer same-day AC repair?",
      answer: "Yes. We offer same-day and emergency AC repair across Vancouver and the Lower Mainland. Call (778) 770-5721 for urgent cooling issues. We guarantee a 2-hour response time for emergencies. Our technicians carry common parts, so most repairs are completed on the first visit.",
    },
    {
      question: "What's the best AC system for Vancouver's climate?",
      answer: "Heat pumps are ideal for Vancouver—they provide both cooling and heating efficiently and qualify for substantial rebates. Ductless mini-splits work well for homes without ductwork, additions, or room-by-room control. Central air suits homes with existing furnace ductwork. We'll assess your home and recommend the best option for your needs and budget.",
    },
    {
      question: "What brands do you service?",
      answer: "We service all major AC brands including Carrier, Lennox, Trane, Daikin, Mitsubishi, Fujitsu, Goodman, and more. Our technicians are factory-trained on multiple brands. We install and repair equipment from all major manufacturers.",
    },
    {
      question: "When should I service my AC?",
      answer: "Schedule AC maintenance in spring (April-May) before the first heat wave. This allows us to clean coils, check refrigerant, and identify issues before you need cooling. Annual tune-ups extend equipment life and maintain manufacturer warranties.",
    },
  ],
  testimonials: [
    { name: "Sarah M.", role: "Vancouver Homeowner", text: "Our AC died on the hottest day of summer. They came within 2 hours, diagnosed the capacitor issue, and had us cooling again in under an hour. Professional and fair pricing. Highly recommend!" },
    { name: "James L.", role: "Burnaby Resident", text: "Had a ductless mini-split installed. The crew was efficient, explained everything, and helped us with the BC Hydro rebate. System works perfectly. Best HVAC company in the Lower Mainland." },
    { name: "Emily R.", role: "Verified Customer", text: "Fast emergency response when our central AC stopped cooling. They fixed the refrigerant leak and recharged the system. Same-day service. Will definitely use again." },
  ],
};

export default function Page() {
  return <ServiceLandingPage config={config} />;
}
