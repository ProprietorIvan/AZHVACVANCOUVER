import React from "react";
import { Phone, ClipboardCheck, FileText, Wrench } from "lucide-react";
import { business } from "@/data/business";

const steps = [
  {
    number: 1,
    icon: Phone,
    title: "Contact Us",
    description: `Call us at ${business.phone.display} or submit a quote request online. We respond within 2 hours. For emergencies, we dispatch same-day.`,
  },
  {
    number: 2,
    icon: ClipboardCheck,
    title: "Assessment",
    description:
      "Our licensed technician arrives, diagnoses your HVAC system, and identifies the issue. We explain everything in plain language.",
  },
  {
    number: 3,
    icon: FileText,
    title: "Custom Quote",
    description:
      "Get a written custom quote before work begins — no published rates, no hidden fees.",
  },
  {
    number: 4,
    icon: Wrench,
    title: "Expert Service",
    description:
      "We complete the repair or installation with fully stocked trucks. Most jobs done on the first visit. Clean up included.",
  },
];

const StepsSection = () => {
  return (
    <main className="w-full">
      <section
        className="w-full bg-black py-20"
        aria-label="Our HVAC Process"
      >
        <div className="max-w-6xl mx-auto px-4">
          <header className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-2">
              HOW IT WORKS
            </h2>
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="h-px w-12 bg-yellow-500" aria-hidden="true" />
              <p className="text-white">Simple 4-Step Process</p>
              <div className="h-px w-12 bg-yellow-500" aria-hidden="true" />
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              From your first call to completed service — we make HVAC simple and stress-free.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.number}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="bg-yellow-500 text-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold text-yellow-500 mb-2">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default StepsSection;
