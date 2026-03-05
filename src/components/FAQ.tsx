import React from 'react';
import { ArrowRight } from 'lucide-react';
import Head from 'next/head';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const faqData: FAQItem[] = [
    {
      question: "What services do you provide?",
      answer: "We offer a comprehensive range of handyman services including plumbing repairs, electrical work, drywall installation and repair, painting, flood damage repair, HVAC maintenance, and general home repairs. Our team is equipped to handle both small fixes and larger renovation projects."
    },
    {
      question: "Do you provide emergency services?",
      answer: "Yes, we provide 24/7 emergency services for urgent issues like flood damage, electrical problems, or plumbing emergencies. Our team typically responds within 1-2 hours for emergency calls in the Vancouver area."
    },
    {
      question: "Are your handymen licensed and insured?",
      answer: "Yes, all our technicians are fully licensed, bonded, and insured. We are WorkSafeBC compliant and carry comprehensive liability insurance. Our team regularly undergoes professional training to stay current with the latest repair techniques and safety protocols."
    },
    {
      question: "What areas do you serve in Vancouver?",
      answer: "We serve the entire Greater Vancouver area, including Vancouver proper, North Vancouver, West Vancouver, Burnaby, Richmond, Surrey, and Coquitlam. We also handle projects in New Westminster and the Tri-Cities area."
    },
    {
      question: "How do you price your services?",
      answer: "We provide transparent, upfront pricing based on the scope of work. For standard services, we charge by the hour with a minimum service call fee. For larger projects, we provide detailed written estimates. All pricing includes labor, standard materials, and cleanup."
    }
  ];

  // FAQ Schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item: FAQItem) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <section className="py-16 px-5 bg-white" id="faq" aria-label="Frequently Asked Questions">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Header Section */}
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-yellow-400" />
                <p className="text-lg text-gray-600">Find Quick Answers</p>
              </div>
              <p className="text-lg text-gray-600 max-w-xl">
                Get instant answers to common questions about our handyman services in Vancouver. 
                Can&apos;t find what you&apos;re looking for? Contact us directly for more information.
              </p>
            </div>
            
            {/* FAQ List Section */}
            <div className="w-full md:w-1/2">
              <div className="grid divide-y divide-gray-200">
                {faqData.map((faq: FAQItem, index: number) => (
                  <div className="py-5" key={index}>
                    <details className="group">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className="text-lg font-semibold">{faq.question}</span>
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