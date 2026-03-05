import React from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  const sections = [
    {
      title: "Service Agreement",
      content: `When engaging our HVAC services, you acknowledge and agree to:
        • Service requests and quotes must be clearly defined in writing
        • Pricing is determined based on scope of work and equipment
        • We reserve the right to adjust estimates if project scope changes
        • Emergency HVAC service available 24/7—no overtime charges
        • Minimum service charges may apply for service calls
        • Cancellations require 24-hour notice to avoid charges`
    },
    {
      title: "Warranties & Guarantees",
      content: `Our commitment to quality includes:
        • 1-year labor warranty on repair work
        • Manufacturer warranties on installed HVAC equipment
        • Up to 10 years warranty on new installations
        • 100% satisfaction guarantee on completed work
        • Licensed and insured HVAC technicians
        • Compliance with local building codes and WorkSafeBC`
    },
    {
      title: "Payment Terms",
      content: `Our payment policies include:
        • Deposits may be required for large HVAC installations
        • Payment is due upon service completion unless otherwise agreed
        • We accept major credit cards, e-transfer, and cheque
        • Interest charges may apply on overdue accounts
        • Transparent pricing with no hidden fees
        • Written estimates provided before work begins`
    },
    {
      title: "Scheduling & Access",
      content: `To ensure efficient HVAC service delivery:
        • Provide clear access to HVAC equipment and work areas
        • Secure permits when required for installations
        • Allow reasonable time for project completion
        • Communicate special access requirements (gates, codes)
        • Respect agreed-upon scheduling windows
        • Notify us promptly of any scheduling conflicts`
    },
    {
      title: "Property Protection",
      content: `We take extensive measures to protect your property:
        • Comprehensive liability insurance coverage
        • Protective materials for floors and furnishings
        • Careful handling of HVAC equipment
        • Thorough cleanup after service completion
        • Documentation of pre-existing conditions
        • Immediate reporting of any incidents`
    },
    {
      title: "Service Limitations",
      content: `Please note the following:
        • Refrigerant handling requires certified technicians
        • Some HVAC work may require specialist contractors
        • Weather conditions may affect outdoor unit installations
        • Access restrictions may limit service options
        • Code compliance may restrict certain modifications
        • Safety concerns may delay or prevent service`
    }
  ];

  return (
    <>
      <Head>
        <title>Terms & Conditions | AZ Air Conditioning and Heating</title>
        <meta
          name="description"
          content="Terms and conditions for HVAC services from AZ Air Conditioning and Heating. Service agreements, warranties, and professional standards."
        />
      </Head>

      <div className="min-h-screen bg-white">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="text-center pt-20 mb-20">
            <h1 className="text-5xl font-bold mb-6">Terms & Conditions</h1>
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="h-px w-16 bg-yellow-400" />
              <p className="text-lg text-gray-600">Service Agreement</p>
              <div className="h-px w-16 bg-yellow-400" />
            </div>
            <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
              The following terms and conditions govern all HVAC services provided by AZ Air Conditioning and Heating, a Felicita Group company.
              By engaging our services or submitting a quote request, you agree to these terms.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {sections.map((section, index) => (
              <div key={index} className="mb-16">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-12 w-1 bg-yellow-400 mt-1" />
                  <div>
                    <h2 className="text-3xl font-bold">{section.title}</h2>
                  </div>
                </div>
                <div className="pl-5">
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}

            <div className="bg-gray-50 p-8 rounded-lg mb-16">
              <h2 className="text-3xl font-bold mb-6">Professional Standards</h2>
              <p className="text-gray-600 mb-4">
                AZ Air Conditioning and Heating maintains the highest professional standards in the HVAC industry. We are:
              </p>
              <ul className="list-none space-y-3 text-gray-600">
                <li>• Fully licensed and insured HVAC contractors</li>
                <li>• WorkSafeBC compliant</li>
                <li>• TECA certified technicians</li>
                <li>• Committed to ongoing professional development</li>
                <li>• Adherent to all local building codes and regulations</li>
                <li>• Dedicated to exceptional customer service</li>
              </ul>
            </div>

            <div className="bg-black text-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
              <p className="mb-6">
                Our team is here to help clarify any aspects of our terms and conditions.
              </p>
              <div className="space-y-2">
                <p>AZ Air Conditioning and Heating</p>
                <p>Felicita Group Company</p>
                <p>922 Homer St, Vancouver, BC V6B 1T7</p>
                <div className="flex justify-center gap-8 mt-4 flex-wrap">
                  <a href="mailto:office@azhvac.ca" className="text-yellow-400 hover:text-yellow-300">
                    office@azhvac.ca
                  </a>
                  <a href="tel:+17787705721" className="text-yellow-400 hover:text-yellow-300">
                    (778) 770-5721
                  </a>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 text-center mt-16">
              Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default TermsAndConditions;
