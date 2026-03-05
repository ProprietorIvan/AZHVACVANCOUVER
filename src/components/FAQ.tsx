import React from "react";
import { ArrowRight } from "lucide-react";
import Head from "next/head";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const faqData: FAQItem[] = [
    {
      question: "How quickly can you respond to HVAC emergencies?",
      answer:
        "We guarantee a 2-hour response time for emergency HVAC services across Vancouver and the Lower Mainland. Our technicians are available 24/7 to handle urgent heating and cooling failures when you need them most.",
    },
    {
      question: "What types of HVAC systems do you service?",
      answer:
        "We service all major brands and types of HVAC equipment including furnaces, air conditioners, heat pumps, ductless mini-splits, boilers, rooftop units, VRF/VRV systems, and commercial refrigeration. Our technicians are factory-trained on multiple equipment types.",
    },
    {
      question: "Do you offer maintenance plans?",
      answer:
        "Yes, we offer comprehensive maintenance plans for both residential and commercial HVAC systems. Regular maintenance extends equipment life, improves efficiency, prevents costly breakdowns, and maintains manufacturer warranties.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We serve the entire Greater Vancouver area, including Vancouver proper, North Vancouver, West Vancouver, Burnaby, Richmond, Surrey, Coquitlam, New Westminster, and the Tri-Cities area.",
    },
    {
      question: "Do you provide free estimates?",
      answer:
        "Yes, we provide free, no-obligation estimates for all HVAC installation, repair, and maintenance projects in Vancouver. Contact us for a transparent quote with no hidden fees.",
    },
    {
      question: "Are your technicians licensed and insured?",
      answer:
        "Yes, all our HVAC technicians are fully licensed, certified, and insured. We are WorkSafeBC compliant and carry comprehensive liability insurance. Our team undergoes ongoing training to stay current with the latest HVAC technology.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item: FAQItem) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <section
        className="py-16 px-5 bg-white"
        id="faq"
        aria-label="Frequently Asked Questions"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-yellow-400" />
                <p className="text-lg text-gray-600">Find Quick Answers</p>
              </div>
              <p className="text-lg text-gray-600 max-w-xl">
                Get instant answers to common questions about our HVAC services
                in Vancouver. Can&apos;t find what you&apos;re looking for? Call
                us at (778) 770-5721 for assistance.
              </p>
            </div>

            <div className="w-full md:w-1/2">
              <div className="grid divide-y divide-gray-200">
                {faqData.map((faq: FAQItem, index: number) => (
                  <div className="py-5" key={index}>
                    <details className="group">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className="text-lg font-semibold">
                          {faq.question}
                        </span>
                        <span className="transition-transform duration-300 group-open:rotate-90">
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      </summary>
                      <p className="mt-4 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
