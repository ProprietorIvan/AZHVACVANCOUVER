import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/Navigation';

const PrivacyPolicy = () => {
  const policySections = [
    {
      title: "Information Collection",
      content: `We collect information to provide better services to our customers. This may include:
        • Contact information (name, email, phone number)
        • Service details and preferences
        • Payment information
        • Communication records
        • Website usage data through cookies and similar technologies`
    },
    {
      title: "Use of Information",
      content: `Your information helps us:
        • Deliver and improve our services
        • Process payments and transactions
        • Communicate with you about services
        • Send important notices and updates
        • Analyze and enhance our website performance`
    },
    {
      title: "Information Security",
      content: `We implement robust security measures to protect your data:
        • Encryption of sensitive information
        • Regular security assessments
        • Limited access to personal information
        • Secure data storage systems
        • Continuous monitoring for potential breaches`
    },
    {
      title: "Data Sharing",
      content: `We may share your information with:
        • Service providers who assist our operations
        • Payment processors for transactions
        • Legal authorities when required by law
        • Business partners with your consent`
    },
    {
      title: "Your Rights",
      content: `You have the right to:
        • Access your personal information
        • Request corrections to your data
        • Opt-out of marketing communications
        • Request deletion of your information
        • Receive a copy of your data`
    }
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy | A-Z Handyman - Felicita Holdings Ltd.</title>
        <meta name="description" content="Our commitment to protecting your privacy and personal information. Read our detailed privacy policy to understand how we collect, use, and protect your data." />
      </Head>

      <div className="min-h-screen bg-white">
        <Navigation showActions={false} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 pb-20">
          {/* Header Section */}
          <div className="text-center pt-20 pb-16">
            <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="h-px w-16 bg-yellow-400" />
              <p className="text-lg text-gray-600">Legal Guidelines</p>
              <div className="h-px w-16 bg-yellow-400" />
            </div>
            <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
              At Felicita Holdings Ltd., operating as A-Z Handyman, we take your privacy seriously. 
              This policy outlines our practices for collecting, using, and protecting your personal information.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="max-w-4xl mx-auto space-y-16">
            {policySections.map((section, index) => (
              <div key={index} className="bg-white">
                <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Contact Section */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <p className="text-gray-600 mb-6">
                For any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p>Felicita Holdings Ltd. (d.b.a. A-Z Handyman)</p>
                <p>1217 Howe St.</p>
                <p>Vancouver, BC V6Z 1R3</p>
                <p>Email: <a href="mailto:info@azhandyman.ca" className="text-black hover:text-gray-600">info@azhandyman.ca</a></p>
                <p>Phone: <a href="tel:+17786534862" className="text-black hover:text-gray-600">+1 778-653-4862</a></p>
              </div>
            </div>

            {/* Last Updated */}
            <p className="text-sm text-gray-500 text-center pt-8">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;