import { business } from "@/data/business";

export interface FAQItem {
  question: string;
  answer: string;
}

const customQuote =
  "Every job is custom-quoted based on system type, scope, and site conditions. Request a free written estimate before work begins.";

export const serviceHowToSteps = [
  {
    name: "Contact us",
    text: "Call or submit your HVAC details through our online form.",
  },
  {
    name: "Diagnostic visit",
    text: "A licensed technician assesses your system and confirms scope.",
  },
  {
    name: "Written quote",
    text: "You receive a clear custom quote before any work starts.",
  },
  {
    name: "Expert service",
    text: "We complete the work, test the system, and clean up.",
  },
];

export const homepageFAQs: FAQItem[] = [
  {
    question: "What HVAC services do you provide?",
    answer:
      "We provide AC repair and installation, furnace repair, heat pumps, ductless mini-splits, boiler service, duct cleaning, commercial HVAC, maintenance plans, and 24/7 emergency service across Greater Vancouver.",
  },
  {
    question: "Do you offer emergency HVAC service?",
    answer:
      "Yes. We respond 24/7 for no-heat, no-cool, and urgent HVAC failures across Vancouver and the GVA. Typical emergency response is within 2 hours.",
  },
  {
    question: "Are your technicians licensed and insured?",
    answer:
      "Yes. Felicita Holdings Ltd. d.b.a. AZ Air Conditioning and Heating is fully licensed, bonded, and insured. Gas work is performed by qualified professionals per BC regulations.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve Vancouver, Burnaby, Richmond, Surrey, North Vancouver, Coquitlam, New Westminster, and surrounding areas within ~50 km of downtown Vancouver.",
  },
  {
    question: "How do you price HVAC work?",
    answer:
      "All HVAC work is custom-quoted after we assess your system and scope. We provide clear written estimates — no published rate sheets.",
  },
];

const baseCostAnswer = (service: string) =>
  `${service} is always custom-quoted after we inspect your system, confirm parts and labour scope, and discuss timing. ${customQuote}`;

const licensedAnswer =
  "Yes. Felicita Holdings Ltd. is licensed, bonded, and insured. Gas and heating work is performed by qualified technicians per BC regulations.";

const areaAnswer =
  "Yes. We serve Vancouver, Burnaby, Richmond, Surrey, North Vancouver, Coquitlam, New Westminster, and the broader Greater Vancouver area.";

export const serviceFAQs: Record<string, FAQItem[]> = {
  hvac: [
    {
      question: "How much does AC repair cost in Vancouver?",
      answer: baseCostAnswer("AC repair"),
    },
    {
      question: "Do you offer emergency AC repair?",
      answer:
        "Yes. We provide 24/7 emergency AC service for no-cool situations across Greater Vancouver. Call immediately if your system fails during a heat wave.",
    },
    {
      question: "How often should I service my AC in Vancouver?",
      answer:
        "We recommend annual maintenance before cooling season (April–May) for best efficiency and warranty compliance. Vancouver's coastal humidity can affect coils and filters.",
    },
    {
      question: "Which areas do you serve for AC repair?",
      answer: areaAnswer,
    },
    {
      question: "Are your HVAC technicians licensed?",
      answer: licensedAnswer,
    },
    {
      question: "Why choose AZ Air Conditioning and Heating?",
      answer:
        "Fast response, honest custom quotes, and 100+ five-star Google reviews. We handle residential and light commercial HVAC across the GVA.",
    },
  ],
  "furnace-repair-vancouver": [
    {
      question: "How much does furnace repair cost in Vancouver?",
      answer: baseCostAnswer("Furnace repair"),
    },
    {
      question: "Do you offer 24/7 furnace repair?",
      answer:
        "Yes. We offer 24/7 emergency furnace repair in Vancouver. When your heat goes out in winter, we respond as quickly as possible.",
    },
    {
      question: "How do I know if my furnace needs repair?",
      answer:
        "Signs include no heat, strange noises, short cycling, uneven heating, or rising energy bills. Call us for a diagnostic — we'll identify the issue and provide a written quote.",
    },
    {
      question: "Should I repair or replace my furnace?",
      answer:
        "If your furnace is older, needs frequent repairs, or has rising energy bills, replacement may make sense. We provide honest assessments and never push unnecessary replacements.",
    },
    {
      question: "Do you install high-efficiency furnaces?",
      answer:
        "Yes. We install gas and electric furnaces and can advise on efficiency options and available rebate programs after assessing your home.",
    },
    {
      question: "Are you licensed for furnace work in Vancouver?",
      answer: licensedAnswer,
    },
  ],
  "heat-pump-vancouver": [
    {
      question: "How much does a heat pump cost in Vancouver?",
      answer: baseCostAnswer("Heat pump installation or repair"),
    },
    {
      question: "Is a heat pump right for Vancouver's climate?",
      answer:
        "Heat pumps work well in Vancouver's mild coastal climate for heating and cooling. We assess your home's layout, insulation, and existing ductwork before recommending a system.",
    },
    {
      question: "Do heat pumps qualify for rebates?",
      answer:
        "Many heat pump installations may qualify for provincial or utility rebates depending on system type and eligibility. We help you understand options during your custom quote.",
    },
    {
      question: "How long does heat pump installation take?",
      answer:
        "Most residential installs take 1–3 days depending on system type, electrical upgrades, and ductwork. We confirm timeline in your written quote.",
    },
    {
      question: "Do you service existing heat pumps?",
      answer:
        "Yes. We repair and maintain air-source and ductless heat pumps from major brands across Greater Vancouver.",
    },
    {
      question: "Which areas do you serve for heat pumps?",
      answer: areaAnswer,
    },
  ],
  "ductless-mini-split-vancouver": [
    {
      question: "How much does a ductless mini-split cost in Vancouver?",
      answer: baseCostAnswer("Ductless mini-split installation"),
    },
    {
      question: "When is a ductless mini-split the right choice?",
      answer:
        "Mini-splits are ideal for homes without ductwork, room additions, laneway suites, and targeted heating/cooling zones. We assess your space and recommend the right configuration.",
    },
    {
      question: "Do ductless systems need maintenance?",
      answer:
        "Yes. Annual filter cleaning and coil checks keep efficiency high. We offer maintenance plans and one-time tune-ups.",
    },
    {
      question: "How quiet are ductless mini-splits?",
      answer:
        "Modern units are designed for quiet operation — important for bedrooms and condos. We help you choose models suited to your space during the quote process.",
    },
    {
      question: "Do you install multi-zone systems?",
      answer:
        "Yes. We install single and multi-zone ductless systems for Vancouver homes and small commercial spaces.",
    },
    {
      question: "Are you licensed for mini-split installation?",
      answer: licensedAnswer,
    },
  ],
  "boiler-service-vancouver": [
    {
      question: "How much does boiler service cost in Vancouver?",
      answer: baseCostAnswer("Boiler repair or service"),
    },
    {
      question: "Do you service hydronic heating systems?",
      answer:
        "Yes. We service and repair boilers, radiators, and hydronic heating systems common in Vancouver heritage and older homes.",
    },
    {
      question: "How often should a boiler be serviced?",
      answer:
        "Annual service before heating season is recommended — inspection, safety checks, and efficiency tuning. We schedule maintenance in September–October.",
    },
    {
      question: "What are signs my boiler needs repair?",
      answer:
        "No heat, leaks, unusual noises, pressure issues, or pilot/ignition problems. Call us for a diagnostic and written quote.",
    },
    {
      question: "Do you offer emergency boiler repair?",
      answer:
        "Yes. We provide emergency heating service when your boiler fails in winter across Greater Vancouver.",
    },
    {
      question: "Which areas do you serve for boiler service?",
      answer: areaAnswer,
    },
  ],
  "duct-cleaning-vancouver": [
    {
      question: "How much does duct cleaning cost in Vancouver?",
      answer: baseCostAnswer("Duct cleaning"),
    },
    {
      question: "How often should ducts be cleaned?",
      answer:
        "Every 3–5 years for most homes; more often with pets, allergies, or after renovation. We inspect first and recommend only what your system needs.",
    },
    {
      question: "Will duct cleaning improve air quality?",
      answer:
        "Removing built-up dust and debris can improve airflow and reduce allergens. We use professional equipment and explain expected results before starting.",
    },
    {
      question: "Do you clean dryer vents too?",
      answer:
        "Yes. Dryer vent cleaning is available and recommended for fire safety. Ask when requesting your quote.",
    },
    {
      question: "How long does duct cleaning take?",
      answer:
        "Most residential jobs take 2–4 hours depending on home size and duct layout. We confirm timing in your written estimate.",
    },
    {
      question: "Which areas do you serve for duct cleaning?",
      answer: areaAnswer,
    },
  ],
  "commercial-hvac-vancouver": [
    {
      question: "How much does commercial HVAC service cost in Vancouver?",
      answer: baseCostAnswer("Commercial HVAC work"),
    },
    {
      question: "What commercial systems do you service?",
      answer:
        "Rooftop units, VRF systems, split systems, boilers, and building automation interfaces. Tell us your equipment type when requesting a quote.",
    },
    {
      question: "Do you offer commercial maintenance contracts?",
      answer:
        "Yes. Preventive maintenance plans reduce downtime and extend equipment life. We tailor plans to your building and equipment.",
    },
    {
      question: "Can you respond after hours for commercial clients?",
      answer:
        "Yes. We offer 24/7 emergency response for commercial HVAC failures across Greater Vancouver.",
    },
    {
      question: "Do you work with property managers?",
      answer:
        "Yes. We serve strata, retail, office, and light industrial clients with clear written scopes and documentation.",
    },
    {
      question: "Are you licensed for commercial HVAC in Vancouver?",
      answer: licensedAnswer,
    },
  ],
  "hvac-maintenance-vancouver": [
    {
      question: "How much does HVAC maintenance cost in Vancouver?",
      answer: baseCostAnswer("HVAC maintenance"),
    },
    {
      question: "When should I schedule HVAC maintenance?",
      answer:
        "Service your AC in April–May and your furnace in September–October. Annual tune-ups prevent most breakdowns and keep warranties valid.",
    },
    {
      question: "What does a maintenance visit include?",
      answer:
        "Filter check, coil cleaning, refrigerant check (AC), safety inspection (furnace), thermostat calibration, and performance testing. Scope is confirmed in your quote.",
    },
    {
      question: "Do you offer maintenance plans?",
      answer:
        "Yes. Annual and multi-visit plans are available for residential and commercial clients. Ask for a custom plan quote.",
    },
    {
      question: "Will maintenance void my warranty?",
      answer:
        "Regular professional maintenance typically helps maintain manufacturer warranty requirements. We document each visit for your records.",
    },
    {
      question: "Which areas do you serve for HVAC maintenance?",
      answer: areaAnswer,
    },
  ],
  "emergency-hvac-vancouver": [
    {
      question: "How fast is emergency HVAC response in Vancouver?",
      answer:
        "We target a 2-hour response for urgent no-heat and no-cool calls across Greater Vancouver, depending on location and call volume.",
    },
    {
      question: "What counts as an HVAC emergency?",
      answer:
        "No heat in winter, no cooling during extreme heat, gas odours, grinding or burning smells, water leaks from equipment, or total system failure. Call immediately for gas odours.",
    },
    {
      question: "Do you charge extra for after-hours emergency calls?",
      answer:
        "Emergency pricing is confirmed in writing before work begins. We explain scope and timing upfront — no surprise fees.",
    },
    {
      question: "Do you serve Burnaby and Richmond for emergencies?",
      answer: areaAnswer,
    },
    {
      question: "Can you fix any brand?",
      answer:
        "Yes. Our technicians service major residential and commercial HVAC brands. We diagnose first and quote before major repairs.",
    },
    {
      question: "Are you licensed for emergency HVAC work?",
      answer: licensedAnswer,
    },
  ],
};

export const getServiceFAQs = (serviceKey: string): FAQItem[] =>
  serviceFAQs[serviceKey] || serviceFAQs.hvac;

export const buildLocationFAQs = (
  city: string,
  serviceLabel: string,
  serviceKey: string
): FAQItem[] => {
  const base = getServiceFAQs(serviceKey);
  return [
    {
      question: `Do you offer ${serviceLabel.toLowerCase()} in ${city}?`,
      answer: `Yes. Felicita Holdings Ltd. provides professional ${serviceLabel.toLowerCase()} in ${city} and surrounding neighbourhoods. Request a free custom quote online or call ${business.phone.display}.`,
    },
    ...base.slice(0, 5),
  ];
};
