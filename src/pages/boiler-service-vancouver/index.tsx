import React from "react";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import type { ServiceLandingConfig } from "@/components/ServiceLandingPage";

const config: ServiceLandingConfig = {
  slug: "boiler-service-vancouver",
  title: "Boiler Service Vancouver",
  metaTitle: "Boiler Repair & Installation Vancouver | Hydronic Heating | AZ HVAC",
  metaDescription: "Boiler repair and installation in Vancouver. Hydronic heating, radiant floor. 24/7 emergency service. 100+ 5-star reviews. Call (778) 770-5721.",
  heroTitle: "Boiler Service Vancouver",
  heroSubtitle: "Expert boiler repair, maintenance, and installation. Hydronic heating systems for homes and commercial buildings across Vancouver.",
  heroTrustBadge: "2-Hour Response | Licensed & Insured | 100% Satisfaction Guaranteed",
  serviceType: "Boiler Service",
  breadcrumbName: "Boiler Service Vancouver",
  heroImage: "/photos/homepage/boilerservice.png",
  introContent: "Boilers power radiant floor heating, baseboards, and radiators in many Vancouver homes. When your boiler fails or you need maintenance, AZ Air Conditioning and Heating provides expert hydronic heating service. We repair and install gas and oil boilers for residential and commercial properties. Our technicians understand circulator pumps, expansion tanks, and zone valves. 24/7 emergency service available—no heat in winter is an emergency we take seriously.",
  valueProps: [
    { title: "Hydronic Heating Experts", description: "We specialize in boiler systems—radiant floor, baseboard, and radiator. Proper diagnosis and repair of circulators, zone valves, and expansion tanks." },
    { title: "24/7 Emergency Boiler Repair", description: "No heat from your boiler? We respond within 2 hours. Frozen pipes and cold homes are emergencies we prioritize. No overtime charges." },
    { title: "Residential & Commercial", description: "From single-family homes to commercial buildings, we service all boiler types. Steam and hot water systems. Installation and replacement." },
  ],
  features: [
    {
      title: "Boiler Repair",
      points: [
        "No heat diagnostics",
        "Circulator pump repair",
        "Expansion tank replacement",
        "Pressure relief valve service",
        "Zone valve repair",
        "Pilot light & ignition",
        "24/7 emergency repair",
      ],
    },
    {
      title: "Boiler Installation",
      points: [
        "Gas and oil boiler installation",
        "High-efficiency condensing boilers",
        "Radiant floor heating",
        "Baseboard and radiator systems",
        "Commercial boiler service",
        "System expansion",
      ],
    },
  ],
  useSimpleProcess: true,
  stats: [
    { value: "750+", label: "VANCOUVER BOILER PROJECTS" },
    { value: "2hr", label: "EMERGENCY RESPONSE" },
    { value: "24/7", label: "NO-HEAT EMERGENCY" },
    { value: "100%", label: "SATISFACTION GUARANTEE" },
  ],
  faqs: [
    { question: "How do I know if my boiler needs repair?", answer: "Signs include no heat, strange noises (banging, gurgling), leaking, low pressure, or rising energy bills. If radiators or baseboards are cold when they should be warm, call us. We'll diagnose and provide a transparent quote." },
    { question: "Do you service commercial boilers?", answer: "Yes. We service commercial and industrial boiler systems including steam and hot water boilers. Contact us for commercial boiler repair, maintenance, and installation." },
    { question: "What's the lifespan of a boiler?", answer: "Well-maintained boilers typically last 15-30 years. Regular annual maintenance extends lifespan and efficiency. We offer maintenance plans to protect your investment." },
    { question: "Can you add zones to my boiler?", answer: "Yes. We can add zones for better comfort control—separate temperatures for different areas. We install zone valves and thermostats." },
  ],
  testimonials: [
    { name: "Thomas R.", role: "Vancouver Homeowner", text: "Our boiler quit in January. They came within 2 hours, replaced the circulator pump, and had our radiant heat back. Professional and knowledgeable." },
    { name: "Patricia M.", role: "North Vancouver", text: "Had a new high-efficiency boiler installed. The crew was efficient and left everything clean. Heat is even and bills are lower." },
    { name: "Kevin S.", role: "Verified Customer", text: "Annual boiler maintenance for 3 years. They catch small issues before they become big ones. Great preventive service." },
  ],
};

export default function Page() {
  return <ServiceLandingPage config={config} />;
}
