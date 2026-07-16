import React from "react";
import { ArrowRight } from "lucide-react";
import { business } from "@/data/business";
import { homepageFAQs } from "@/data/serviceFAQs";

const FAQ: React.FC = () => {
  return (
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
                us at {business.phone.display} for assistance.
              </p>
            </div>

            <div className="w-full md:w-1/2">
              <div className="grid divide-y divide-gray-200">
                {homepageFAQs.map((faq, index) => (
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
  );
};

export default FAQ;
