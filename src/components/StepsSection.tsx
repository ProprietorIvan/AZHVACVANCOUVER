import React from "react";
import Head from "next/head";
import { Phone, ClipboardCheck, FileText, Wrench } from "lucide-react";

const SITE_URL = "https://azhvac.ca";
const BUSINESS_NAME = "AZ Air Conditioning and Heating";

const steps = [
  {
    number: 1,
    icon: Phone,
    title: "Contact Us",
    description:
      "Call us at (778) 770-5721 or submit a quote request online. We respond within 2 hours. For emergencies, we dispatch same-day.",
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
    title: "Transparent Quote",
    description:
      "Get an upfront quote with no hidden fees. We recommend only what your system needs — no upselling.",
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
  const metricsStructuredData = {
    "@context": "https://schema.org",
    "@type": "HVACContractor",
    name: BUSINESS_NAME,
    description:
      "Professional HVAC services in Vancouver with 100+ 5-star reviews and 750+ installations completed.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <Head>
        <title>Our Process | {BUSINESS_NAME}</title>
        <meta
          name="description"
          content="Simple 4-step HVAC process: Contact, Assessment, Quote, Service. Vancouver's trusted HVAC contractor. 2-hour response."
        />
        <meta
          name="keywords"
          content="hvac vancouver, air conditioning vancouver, furnace installation"
        />
        <meta
          property="og:title"
          content={`Our Process | ${BUSINESS_NAME}`}
        />
        <meta
          property="og:description"
          content="Simple 4-step HVAC process. Contact, Assessment, Quote, Service. 2-hour response."
        />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(metricsStructuredData),
          }}
        />
      </Head>

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
    </>
  );
};

export default StepsSection;
