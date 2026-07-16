import type { FAQItem } from "@/data/serviceFAQs";

export interface Guide {
  slug: string;
  title: string;
  description: string;
  tldr: string;
  published: string;
  modified: string;
  sections: Array<{ heading: string; body: string }>;
  faqs: FAQItem[];
  relatedServices: Array<{ label: string; href: string }>;
}

export const guides: Guide[] = [
  {
    slug: "ac-repair-cost-vancouver",
    title: "What Affects AC Repair Cost in Vancouver?",
    description:
      "What drives air conditioning repair pricing in Vancouver and how to get an accurate custom quote from a licensed HVAC contractor.",
    tldr:
      "AC repair in Vancouver is always custom-quoted. System type, refrigerant, parts, access, and whether the issue is electrical or mechanical all affect the final price. Request a free written estimate after a diagnostic visit.",
    published: "2026-01-15",
    modified: "2026-07-16",
    sections: [
      {
        heading: "What drives AC repair pricing",
        body: "Brand and age of equipment, refrigerant type, compressor vs. capacitor issues, coil condition, thermostat problems, and condo/strata access all affect scope. Vancouver's coastal humidity can accelerate coil and filter issues.",
      },
      {
        heading: "Repair vs replacement",
        body: "If your AC is over 12–15 years old, uses phased-out refrigerant, or needs major component replacement, a new system may be more cost-effective long term. We provide honest repair-vs-replace advice after diagnosis.",
      },
      {
        heading: "How to get an accurate custom quote",
        body: "Describe symptoms (no cool air, ice on unit, strange noises), note system age if known, and share photos of the outdoor unit and thermostat. AZ Air Conditioning and Heating provides free diagnostics and written quotes across Greater Vancouver.",
      },
    ],
    faqs: [
      {
        question: "Do you publish AC repair rates?",
        answer:
          "No. Every job is different, so we provide a clear custom written quote after inspecting your system.",
      },
    ],
    relatedServices: [
      { label: "AC Repair Vancouver", href: "/hvac" },
      { label: "Emergency HVAC", href: "/emergency-hvac-vancouver" },
    ],
  },
  {
    slug: "how-to-choose-hvac-company-vancouver",
    title: "How to Choose an HVAC Company in Vancouver",
    description:
      "What to look for when hiring an HVAC contractor in Vancouver — licensing, insurance, reviews, and red flags to avoid.",
    tldr:
      "Choose a licensed, insured HVAC contractor with verifiable Google reviews, written custom quotes, and gas-qualified technicians for heating work. Avoid cash-only operators with no paperwork.",
    published: "2026-01-20",
    modified: "2026-07-16",
    sections: [
      {
        heading: "Verify licensing and insurance",
        body: "Ask for proof of liability insurance and confirm gas work is performed by qualified technicians. Felicita Holdings Ltd. (AZ Air Conditioning and Heating) is fully licensed and insured.",
      },
      {
        heading: "Check reviews and references",
        body: "Look for consistent Google reviews over time. Read recent reviews mentioning similar work — AC repair, furnace install, or heat pumps. AZ HVAC has 100+ five-star reviews across Greater Vancouver.",
      },
      {
        heading: "Get everything in writing",
        body: "A reputable contractor provides a written custom quote covering scope, parts, timeline, and payment terms before starting. Avoid large upfront deposits without a clear agreement.",
      },
    ],
    faqs: [
      {
        question: "Do I need a licensed technician for HVAC?",
        answer:
          "Gas furnace and boiler work must be performed by qualified professionals per BC regulations. Always confirm credentials before hiring.",
      },
    ],
    relatedServices: [{ label: "All HVAC Services", href: "/services" }],
  },
  {
    slug: "furnace-vs-heat-pump-vancouver",
    title: "Furnace vs Heat Pump for Vancouver Homes",
    description:
      "How to decide between a furnace and a heat pump in Vancouver's mild coastal climate.",
    tldr:
      "Vancouver's climate suits both furnaces and heat pumps. Heat pumps offer heating and cooling in one system; furnaces pair well with existing ductwork and cold-weather backup. We assess your home and recommend the best fit with a custom quote.",
    published: "2026-02-01",
    modified: "2026-07-16",
    sections: [
      {
        heading: "When a furnace makes sense",
        body: "Homes with existing gas lines and ductwork, very cold exposure, or preference for gas heating. High-efficiency furnaces remain a reliable choice for Vancouver winters.",
      },
      {
        heading: "When a heat pump makes sense",
        body: "Homes wanting heating and cooling from one system, laneway suites, or properties targeting efficiency and potential rebate programs. Air-source heat pumps perform well in Vancouver's mild winters.",
      },
      {
        heading: "Getting a custom recommendation",
        body: "We evaluate insulation, duct layout, electrical capacity, and your comfort goals before quoting either option — no one-size-fits-all advice.",
      },
    ],
    faqs: [
      {
        question: "Can I switch from a furnace to a heat pump?",
        answer:
          "Often yes, but electrical and ductwork requirements vary. We assess on-site and provide a written scope before any work begins.",
      },
    ],
    relatedServices: [
      { label: "Furnace Repair", href: "/furnace-repair-vancouver" },
      { label: "Heat Pump Vancouver", href: "/heat-pump-vancouver" },
    ],
  },
  {
    slug: "hvac-maintenance-seasonal-guide",
    title: "HVAC Maintenance Guide for Vancouver Homes",
    description:
      "When to service your AC and furnace in Vancouver and what a maintenance visit includes.",
    tldr:
      "Service your AC in April–May and your furnace in September–October. Annual maintenance prevents most breakdowns. Call immediately if you smell gas, hear grinding, or have no heat in winter. Ask us for a custom maintenance quote.",
    published: "2026-02-10",
    modified: "2026-07-16",
    sections: [
      {
        heading: "Seasonal schedule",
        body: "Spring: AC coil cleaning, refrigerant check, filter replacement. Fall: furnace inspection, heat exchanger check, thermostat calibration. Heat pumps need year-round attention in Vancouver.",
      },
      {
        heading: "Signs you need service now",
        body: "Uneven heating/cooling, unusual noises, rising energy bills, short cycling, or ice on the outdoor unit. Gas odours require immediate professional response.",
      },
      {
        heading: "Maintenance plans",
        body: "Annual plans reduce emergency calls and help maintain warranty requirements. We tailor plans to your equipment — request a custom quote.",
      },
    ],
    faqs: [
      {
        question: "How often should I replace HVAC filters?",
        answer:
          "Every 1–3 months depending on pets, allergies, and usage. Coastal humidity can accelerate filter clogging in summer.",
      },
    ],
    relatedServices: [
      { label: "HVAC Maintenance", href: "/hvac-maintenance-vancouver" },
    ],
  },
  {
    slug: "emergency-hvac-checklist",
    title: "Emergency HVAC Checklist for Vancouver Homeowners",
    description:
      "What to do when your heat or AC fails in Vancouver — before and after the technician arrives.",
    tldr:
      "For gas odours, leave the area and call immediately. For no heat or no cool, check thermostat settings and breakers, then call for emergency service. Do not attempt gas repairs yourself.",
    published: "2026-02-15",
    modified: "2026-07-16",
    sections: [
      {
        heading: "First steps",
        body: "Confirm thermostat is set correctly and batteries are fresh. Check the circuit breaker for the HVAC unit. Note error codes on the display if visible.",
      },
      {
        heading: "When to call emergency service",
        body: "No heat in winter, no cooling during extreme heat, gas smell, burning smell, water leaking from equipment, or loud grinding noises. We respond 24/7 across Greater Vancouver.",
      },
      {
        heading: "What to expect",
        body: "Our technician diagnoses the issue, explains options, and provides a written quote before major repairs. Emergency pricing is confirmed upfront.",
      },
    ],
    faqs: [
      {
        question: "How fast is emergency response?",
        answer:
          "We target a 2-hour response for urgent calls across the GVA, depending on location and call volume.",
      },
    ],
    relatedServices: [
      { label: "Emergency HVAC", href: "/emergency-hvac-vancouver" },
    ],
  },
  {
    slug: "areas-we-serve-greater-vancouver",
    title: "Areas We Serve in Greater Vancouver",
    description:
      "Cities and neighbourhoods served by AZ Air Conditioning and Heating across the GVA.",
    tldr:
      "AZ Air Conditioning and Heating (Felicita Holdings Ltd.) serves Vancouver, Burnaby, Richmond, Surrey, North Vancouver, Coquitlam, and New Westminster — plus surrounding areas within ~50 km of downtown Vancouver.",
    published: "2026-03-01",
    modified: "2026-07-16",
    sections: [
      {
        heading: "Primary service cities",
        body: "Vancouver, Burnaby, Richmond, Surrey, North Vancouver, Coquitlam, and New Westminster. We also serve West Vancouver, Port Coquitlam, Port Moody, Delta, and White Rock.",
      },
      {
        heading: "Services by area",
        body: "AC repair, furnace service, heat pumps, ductless mini-splits, maintenance, and 24/7 emergency HVAC. Location pages provide neighbourhood details and local response times. Every job receives a custom written quote.",
      },
    ],
    faqs: [
      {
        question: "Is there a travel charge for outer GVA cities?",
        answer:
          "Most jobs within our service radius are quoted inclusive of travel. Remote locations are disclosed clearly in your custom quote if a travel fee applies.",
      },
    ],
    relatedServices: [
      { label: "All Services", href: "/services" },
      { label: "Service Areas", href: "/service-areas" },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
