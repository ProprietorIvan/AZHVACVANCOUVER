import React from "react";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import type { ServiceLandingConfig } from "@/components/ServiceLandingPage";

const config: ServiceLandingConfig = {
  slug: "emergency-hvac-vancouver",
  title: "Emergency HVAC Vancouver",
  metaTitle: "24/7 Emergency HVAC Vancouver | AC & Furnace Emergency Repair | AZ HVAC",
  metaDescription: "24/7 emergency HVAC service in Vancouver. 2-hour response. No heat? AC broken? Call (778) 770-5721. 100+ 5-star reviews.",
  heroTitle: "24/7 Emergency HVAC Vancouver",
  heroSubtitle: "When your heat or AC fails, we respond. 2-hour guaranteed response time. No overtime charges. 100+ 5-star reviews.",
  heroTrustBadge: "24/7 Emergency Service | 2-Hour Response | No Overtime Charges",
  serviceType: "Emergency HVAC",
  breadcrumbName: "Emergency HVAC Vancouver",
  heroImage: "/photos/homepage/24/7-response.png",
  showEmergencyBanner: true,
  introContent: "HVAC emergencies don't wait for business hours. When your furnace quits in January or your AC dies on a 35°C day, AZ Air Conditioning and Heating is here 24/7. We guarantee a 2-hour response time across Vancouver and the Lower Mainland. No overtime premiums—you pay our standard rates whether you call at noon or midnight. Our technicians carry common parts and are equipped to resolve most emergencies on the first visit.",
  valueProps: [
    { title: "2-Hour Guaranteed Response", description: "We commit to arriving within 2 hours of your emergency call. Our Vancouver-based team is strategically positioned across the Lower Mainland for rapid response." },
    { title: "No Overtime Charges", description: "Emergency calls cost the same as daytime service. We believe fair pricing matters most when you're in crisis. No surprise premiums." },
    { title: "Fully Stocked Trucks", description: "Our technicians carry common parts—capacitors, ignitors, contactors, thermostats. Most emergencies are resolved on the first visit." },
  ],
  features: [
    {
      title: "Emergency Heating",
      points: [
        "No heat emergencies",
        "Furnace breakdown",
        "Boiler failure",
        "Frozen pipes risk",
        "Pilot light out",
        "Carbon monoxide concerns",
        "2-hour response time",
      ],
    },
    {
      title: "Emergency Cooling",
      points: [
        "AC not cooling",
        "Compressor failure",
        "Refrigerant leaks",
        "Commercial cooling loss",
        "Thermostat failure",
        "24/7 availability",
      ],
    },
  ],
  useSimpleProcess: true,
  stats: [
    { value: "2hr", label: "GUARANTEED RESPONSE" },
    { value: "24/7", label: "EMERGENCY AVAILABILITY" },
    { value: "0%", label: "OVERTIME CHARGES" },
    { value: "100%", label: "SATISFACTION GUARANTEE" },
  ],
  faqs: [
    { question: "What's your emergency response time?", answer: "We guarantee a 2-hour response time for emergency HVAC calls across Vancouver and the Lower Mainland. Our technicians are on call 24/7 for urgent heating and cooling failures. We prioritize emergencies and dispatch immediately." },
    { question: "Do you charge extra for after-hours emergency service?", answer: "No. We do not charge overtime or after-hours premiums for emergency HVAC service. You pay our standard rates regardless of when you call—midnight, weekends, or holidays. Fair pricing when you need us most." },
    { question: "What areas do you serve for emergency HVAC?", answer: "We serve Vancouver, North Vancouver, West Vancouver, Burnaby, Richmond, Surrey, Coquitlam, New Westminster, Delta, Langley, and the entire Lower Mainland for emergency HVAC service." },
    { question: "What if you can't fix it the same day?", answer: "Most emergencies are resolved on the first visit. If a rare part is needed, we'll get your system running temporarily when possible and schedule the full repair as soon as the part arrives." },
  ],
  testimonials: [
    { name: "Chris A.", role: "Vancouver Homeowner", text: "Furnace died at 11pm in December. They were here by 1am, fixed the ignitor, and we had heat before sunrise. No overtime charge. Amazing!" },
    { name: "Amanda W.", role: "Surrey Resident", text: "AC quit on the hottest day of summer. Called at 6pm, they arrived by 8pm, and had us cooling again. Professional and fast. Highly recommend." },
    { name: "Robert T.", role: "Commercial Property Manager", text: "Rooftop unit failed on a Friday night. They had a tech out within 90 minutes. Saved us from a weekend without cooling. Excellent emergency service." },
  ],
};

export default function Page() {
  return <ServiceLandingPage config={config} />;
}
