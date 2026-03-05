import React from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const policySections = [
    {
      title: "Information Collection",
      content: `At AZ Air Conditioning and Heating, a Felicita Group company, we collect information to provide HVAC services and quote requests. This may include:
        • Contact information (name, email, phone number)
        • Property address for service estimates
        • Service details and HVAC system information
        • Payment information for completed work
        • Communication records
        • Website usage data through cookies and similar technologies`
    },
    {
      title: "Use of Information",
      content: `Your information helps us:
        • Provide HVAC quotes and estimates
        • Schedule and deliver heating and cooling services
        • Process payments and transactions
        • Communicate about appointments and service updates
        • Send important notices about your HVAC systems
        • Improve our website and service delivery`
    },
    {
      title: "Information Security",
      content: `We implement robust security measures to protect your data:
        • Encryption of sensitive information
        • Secure handling of payment data
        • Limited access to personal information
        • Secure data storage systems
        • Regular security assessments`
    },
    {
      title: "Data Sharing",
      content: `We may share your information with:
        • Felicita Group affiliates for business operations
        • Service providers who assist our HVAC operations
        • Payment processors for transactions
        • Legal authorities when required by law
        • Third parties only with your consent`
    },
    {
      title: "Your Rights",
      content: `You have the right to:
        • Access your personal information
        • Request corrections to your data
        • Opt-out of marketing communications
        • Request deletion of your information
        • Receive a copy of your data
        • Withdraw consent where applicable`
    }
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy | AZ Air Conditioning and Heating</title>
        <meta name="description" content="Privacy policy for AZ Air Conditioning and Heating. How we collect, use, and protect your personal information for HVAC services in Vancouver." />
      </Head>

      <div className="min-h-screen bg-white">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="text-center pt-20 pb-16">
            <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="h-px w-16 bg-yellow-400" />
              <p className="text-lg text-gray-600">Legal Guidelines</p>
              <div className="h-px w-16 bg-yellow-400" />
            </div>
            <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
              At AZ Air Conditioning and Heating, a Felicita Group company, we take your privacy seriously.
              This policy outlines our practices for collecting, using, and protecting your personal information when you request HVAC quotes or use our heating and cooling services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-16">
            {policySections.map((section, index) => (
              <div key={index} className="bg-white">
                <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}

            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <p className="text-gray-600 mb-6">
                For questions about this Privacy Policy or our data practices:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>AZ Air Conditioning and Heating</strong></p>
                <p>Felicita Group Company</p>
                <p>922 Homer St, Vancouver, BC V6B 1T7</p>
                <p>Email: <a href="mailto:office@azhvac.ca" className="text-black hover:text-gray-600">office@azhvac.ca</a></p>
                <p>Phone: <a href="tel:+17787705721" className="text-black hover:text-gray-600">(778) 770-5721</a></p>
              </div>
            </div>

            <p className="text-sm text-gray-500 text-center pt-8">
              Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
