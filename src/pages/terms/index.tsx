import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/Navigation';

const TermsAndConditions = () => {
  const sections = [
    {
      title: "Service Agreement",
      content: `When engaging our services, you acknowledge and agree to the following terms:
        • Service requests must be clearly defined in writing
        • Pricing is determined based on scope of work
        • We reserve the right to adjust estimates if project scope changes
        • Emergency service rates apply outside regular business hours
        • Minimum service charges may apply
        • Cancellations require 24-hour notice to avoid charges`
    },
    {
      title: "Warranties & Guarantees",
      content: `Our commitment to quality includes:
        • 90-day warranty on workmanship
        • Manufacturer warranties on installed products
        • Satisfaction guarantee on completed work
        • Professional-grade materials and equipment
        • Licensed and insured service providers
        • Compliance with local building codes and regulations`
    },
    {
      title: "Payment Terms",
      content: `Our payment policies include:
        • Deposits may be required for large projects
        • Payment is due upon service completion
        • We accept major credit cards and e-transfers
        • Interest charges apply on overdue accounts
        • Special financing available for major renovations
        • Transparent pricing with no hidden fees`
    },
    {
      title: "Scheduling & Access",
      content: `To ensure efficient service delivery:
        • Provide clear access to work areas
        • Secure permits when required
        • Allow reasonable time for project completion
        • Communicate special access requirements
        • Respect agreed-upon scheduling windows
        • Notify us promptly of any scheduling conflicts`
    },
    {
      title: "Property Protection",
      content: `We take extensive measures to protect your property:
        • Comprehensive insurance coverage
        • Protective materials for floors and furniture
        • Careful handling of personal property
        • Thorough cleanup after service completion
        • Documentation of pre-existing conditions
        • Immediate reporting of any incidents`
    },
    {
      title: "Service Limitations",
      content: `Please note the following service limitations:
        • Hazardous materials handling requires special arrangements
        • Some repairs may require specialist contractors
        • Weather conditions may affect outdoor services
        • Access restrictions may limit service options
        • Code compliance may restrict certain modifications
        • Safety concerns may delay or prevent service`
    }
  ];

  return (
    <>
      <Head>
        <title>Terms & Conditions | A-Z Handyman - Felicita Holdings Ltd.</title>
        <meta 
          name="description" 
          content="Our comprehensive terms and conditions outline our service agreements, warranties, and commitments to our customers. Read about our professional service standards." 
        />
      </Head>

      <div className="min-h-screen bg-white">
        <Navigation showActions={false} />

        <div className="max-w-7xl mx-auto px-4 pb-20">
          {/* Header Section */}
          <div className="text-center pt-20 mb-20">
            <h1 className="text-5xl font-bold mb-6">Terms & Conditions</h1>
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="h-px w-16 bg-yellow-400" />
              <p className="text-lg text-gray-600">Service Agreement</p>
              <div className="h-px w-16 bg-yellow-400" />
            </div>
            <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
              The following terms and conditions govern all services provided by Felicita Holdings Ltd., 
              operating as A-Z Handyman. By engaging our services, you agree to these terms.
            </p>
          </div>

          {/* Terms Sections */}
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

            {/* Professional Standards Notice */}
            <div className="bg-gray-50 p-8 rounded-lg mb-16">
              <h2 className="text-3xl font-bold mb-6">Professional Standards</h2>
              <p className="text-gray-600 mb-4">
                A-Z Handyman maintains the highest professional standards in the industry. We are:
              </p>
              <ul className="list-none space-y-3 text-gray-600">
                <li>• Fully licensed and insured</li>
                <li>• WorkSafeBC compliant</li>
                <li>• Committed to ongoing professional development</li>
                <li>• Adherent to all local building codes and regulations</li>
                <li>• Dedicated to exceptional customer service</li>
              </ul>
            </div>

            {/* Contact Box */}
            <div className="bg-black text-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
              <p className="mb-6">
                Our team is here to help clarify any aspects of our terms and conditions.
              </p>
              <div className="space-y-2">
                <p>Felicita Holdings Ltd. (d.b.a. A-Z Handyman)</p>
                <p>1217 Howe St. Vancouver, BC V6Z 1R3</p>
                <div className="flex justify-center gap-8 mt-4">
                  <a href="mailto:info@azhandyman.ca" className="text-yellow-400 hover:text-yellow-300">
                    info@azhandyman.ca
                  </a>
                  <a href="tel:+17786534862" className="text-yellow-400 hover:text-yellow-300">
                    +1 778-653-4862
                  </a>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <p className="text-sm text-gray-500 text-center mt-16">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;