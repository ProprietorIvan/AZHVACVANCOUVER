import { ArrowRight } from "lucide-react";
import type { FAQItem } from "@/data/serviceFAQs";

interface ServiceFAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
  id?: string;
}

export default function ServiceFAQSection({
  faqs,
  title = "Frequently Asked Questions",
  subtitle = "Quick answers",
  id = "faq",
}: ServiceFAQSectionProps) {
  return (
    <section
      className="py-16 px-5 bg-white"
      id={id}
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="h-1 w-12 bg-[#ffc527] mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {title}
          </h2>
          <p className="text-gray-600">{subtitle}</p>
        </header>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div className="py-5" key={index}>
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none gap-4">
                  <span className="text-lg font-semibold text-left">
                    {faq.question}
                  </span>
                  <span className="transition-transform duration-300 group-open:rotate-90 shrink-0">
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
    </section>
  );
}
