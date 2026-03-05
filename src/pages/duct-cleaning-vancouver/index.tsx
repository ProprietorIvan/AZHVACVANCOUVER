import React from "react";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import type { ServiceLandingConfig } from "@/components/ServiceLandingPage";

const config: ServiceLandingConfig = {
  slug: "duct-cleaning-vancouver",
  title: "Duct Cleaning Vancouver",
  metaTitle: "Air Duct Cleaning Vancouver | HVAC Duct Cleaning | AZ HVAC",
  metaDescription: "Professional duct cleaning in Vancouver. Improve air quality. Remove dust, allergens. 100+ 5-star reviews. Call (778) 770-5721.",
  heroTitle: "Duct Cleaning Vancouver",
  heroSubtitle: "Improve indoor air quality with professional duct cleaning. Remove dust, allergens, and contaminants from your HVAC system.",
  heroTrustBadge: "Professional Equipment | Same-Day Service | 100% Satisfaction",
  serviceType: "Duct Cleaning",
  breadcrumbName: "Duct Cleaning Vancouver",
  heroImage: "/photos/homepage/aircondtioning.png",
  introContent: "Your ductwork circulates air throughout your home—and over time, it accumulates dust, pollen, mold spores, and other contaminants. Professional duct cleaning removes these pollutants, improving indoor air quality and HVAC efficiency. AZ Air Conditioning and Heating uses industry-standard equipment to thoroughly clean your duct system. Ideal after renovations, for allergy sufferers, or as part of regular home maintenance.",
  valueProps: [
    { title: "Improved Air Quality", description: "Remove built-up dust, allergens, and contaminants. Breathe easier—especially important for allergy sufferers, asthma, and families with young children." },
    { title: "Better HVAC Efficiency", description: "Clean ducts allow better airflow. Your system works less hard, uses less energy, and may last longer. We also clean the blower and coils." },
    { title: "Professional Equipment", description: "We use HEPA-filtered negative air machines and rotary brush systems. Not a quick vacuum—thorough cleaning that makes a difference." },
  ],
  features: [
    {
      title: "Residential Duct Cleaning",
      points: [
        "Full duct system cleaning",
        "Register and vent cleaning",
        "Dust and allergen removal",
        "Mold inspection",
        "Blower and coil cleaning",
        "Before/after documentation",
      ],
    },
    {
      title: "Benefits",
      points: [
        "Improved indoor air quality",
        "Better HVAC efficiency",
        "Reduced allergens",
        "Eliminate musty odors",
        "Extended equipment life",
        "Cleaner living environment",
      ],
    },
  ],
  useSimpleProcess: true,
  stats: [
    { value: "750+", label: "VANCOUVER DUCT CLEANINGS" },
    { value: "2-4hr", label: "TYPICAL DURATION" },
    { value: "HEPA", label: "FILTERED EXTRACTION" },
    { value: "100%", label: "SATISFACTION GUARANTEE" },
  ],
  faqs: [
    { question: "How often should I get my ducts cleaned?", answer: "Every 3-5 years for typical homes. More frequently if you have pets, allergies, or after renovations. We can assess your system and recommend a schedule based on your situation." },
    { question: "How long does duct cleaning take?", answer: "Most residential duct cleaning jobs are completed in 2-4 hours depending on system size, number of vents, and condition. We'll give you a timeframe during the quote." },
    { question: "Does duct cleaning improve air quality?", answer: "Yes. Removing built-up dust, mold, and contaminants from ducts significantly improves indoor air quality. Many customers notice less dust, fewer allergy symptoms, and fresher air." },
    { question: "Do you clean the furnace/AC unit too?", answer: "Yes. We clean the blower assembly, evaporator coil (if accessible), and other components that affect airflow. A complete cleaning includes the full system." },
  ],
  testimonials: [
    { name: "Jennifer H.", role: "Vancouver Homeowner", text: "Had our ducts cleaned after a renovation. The difference in air quality was noticeable immediately. Professional crew, thorough job." },
    { name: "Mark S.", role: "Allergy Sufferer", text: "My allergies have improved since we had the ducts cleaned. Less dust, cleaner air. Worth every penny." },
    { name: "Susan P.", role: "Verified Customer", text: "Quick to schedule, professional service. They explained what they were doing and left everything clean. Recommend!" },
  ],
};

export default function Page() {
  return <ServiceLandingPage config={config} />;
}
