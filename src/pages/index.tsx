// Build timestamp: 2025-05-05T13:00:28.855Z
import React, { useState } from "react";
import ComparisonSection from "@/components/ComparisonSection";
import FAQ from "@/components/FAQ";
import FeaturesSection from "@/components/Features";
import Navigation from "@/components/Navigation";
import StepsSection from "@/components/StepsSection";
import Testemonials from "@/components/Testemonials";
import DomainRedirectHandler from "@/components/DomainRedirectHandler";
import { Star, Check } from "lucide-react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";

// Home page - updated May 5, 2025 at 14:47
const Home: NextPage = () => {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    projectDetails: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/home_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Send lead to Get Timber webhook (with validation - gibberish won't be added)
        const { sendLeadToGetTimber } = await import("@/utils/sendLeadToGetTimber");
        await sendLeadToGetTimber({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          message: formData.projectDetails,
          serviceType: formData.service || "General Inquiry",
          leadSource: "AZ Handyman Website - Homepage Form",
        });

        setShowSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          service: "",
          projectDetails: "",
        });
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit quote request");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your request. Please try again.");
    }
  };

  const services = [
    {
      id: "drywall",
      name: "Drywall Repair",
      description: "Professional drywall installation and repair services",
    },
    {
      id: "flood",
      name: "Flood Restoration",
      description: "Emergency flood damage restoration and water damage repair",
    },
    {
      id: "hvac",
      name: "HVAC Services",
      description: "Heating, ventilation, and air conditioning services",
    },
    {
      id: "handyman",
      name: "General Handyman",
      description: "General home repairs and maintenance services",
    },
    {
      id: "demolition",
      name: "Demolition Services",
      description:
        "Professional demolition services for residential and commercial properties",
    },
  ];

  const businessStructuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "A-Z Handyman",
    image: "https://az-handyman.ca/photos/homepage/2.jpg",
    url: "https://az-handyman.ca",
    "@id": "https://az-handyman.ca/#organization",
    description:
      "Most trusted home services and handyman company in Vancouver offering professional home repairs, renovations, and maintenance services.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vancouver",
      addressRegion: "BC",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "49.2827",
      longitude: "-123.1207",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "1000",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: "Vancouver Metropolitan Area",
    priceRange: "$$",
    openingHours: "Mo-Su 08:00-20:00",
    telephone: "+17786534862",
    sameAs: [
      "https://www.facebook.com/azhandyman",
      "https://www.instagram.com/azhandyman",
    ],
  };

  const localBusinessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "A-Z Handyman Vancouver",
    image: "https://az-handyman.ca/photos/homepage/2.jpg",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vancouver",
      addressRegion: "BC",
      addressCountry: "CA",
    },
    telephone: "+17786534862",
    url: "https://az-handyman.ca",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does a typical repair take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Small repairs can be completed in 2-4 hours. Larger projects typically take 1-2 days.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide free estimates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide free, no-obligation estimates for all repair and maintenance projects in Vancouver.",
        },
      },
    ],
  };

  return (
    <>
      <DomainRedirectHandler />
      <Head>
        <>
          <title>
            A-Z Handyman Vancouver | Professional Home Repair & Maintenance
            Services
          </title>
          <meta
            name="description"
            content="Vancouver's most trusted handyman service. Professional home repairs, renovations, and maintenance with 1000+ satisfied customers. Get your quote today!"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://az-handyman.ca" />
          <meta
            property="og:title"
            content="A-Z Handyman Vancouver | Professional Home Services"
          />
          <meta
            property="og:description"
            content="Vancouver's most trusted handyman service. Professional home repairs, renovations, and maintenance with 1000+ satisfied customers."
          />
          <meta
            property="og:image"
            content="https://az-handyman.ca/photos/homepage/2.jpg"
          />
          <meta property="og:site_name" content="A-Z Handyman" />
          <meta property="og:locale" content="en_CA" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://az-handyman.ca" />
          <meta
            name="twitter:title"
            content="A-Z Handyman Vancouver | Professional Home Services"
          />
          <meta
            name="twitter:description"
            content="Vancouver's trusted handyman service. Expert home repairs and maintenance."
          />
          <meta
            name="twitter:image"
            content="https://az-handyman.ca/photos/homepage/2.jpg"
          />

          {/* Additional meta tags */}
          <meta
            name="keywords"
            content="handyman vancouver, home repair vancouver, renovation services, home maintenance, professional handyman, vancouver contractor"
          />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="A-Z Handyman" />
          <meta name="geo.region" content="CA-BC" />
          <meta name="geo.placename" content="Vancouver" />
          <meta name="language" content="English" />
          <meta name="revisit-after" content="7 days" />
          <meta name="distribution" content="global" />
          <meta name="rating" content="general" />
          <link rel="canonical" href="https://az-handyman.ca/" />

          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(businessStructuredData),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(localBusinessStructuredData),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
        </>
      </Head>

      <div className="min-h-screen bg-white">
        <Navigation showActions={false} />

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/photos/homepage/2.jpg"
              alt="Professional handyman services in Vancouver - Home repairs, renovations, and maintenance specialists"
              fill
              className="object-cover object-[85%_25%] brightness-125 contrast-105"
              priority
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 w-full">
            <div className="max-w-2xl">
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white drop-shadow-lg"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
              >
                Home Repairs Made Effortless
              </h1>
              <p
                className="text-xl md:text-2xl text-white mb-8 drop-shadow-md"
                style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
              >
                Most trusted home services company in Vancouver
              </p>
              <button
                onClick={() => window.open("/services", "_current")}
                className="bg-white text-black px-8 py-4 rounded-lg text-lg font-medium mb-8 hover:bg-yellow-400 transition-colors duration-300"
              >
                Get Free Estimate
              </button>
              <div className="flex items-center gap-3">
                <div className="flex drop-shadow-md">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span
                  className="text-white text-lg drop-shadow-md"
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                >
                  1000+ Satisfied Customers
                </span>
              </div>
            </div>
          </div>
        </section>

        <main>
          <ComparisonSection />
          <StepsSection />
          <Testemonials />
          <FAQ />

          {/* Service Selection Form */}
          <section className="py-20 bg-white" id="contactform">
            <div className="max-w-3xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Get Started Today
                </h2>
                <p className="text-lg text-gray-600">
                  Tell us about your project and we&apos;ll get back to you
                  within 2 hours
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Service Needed *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Property Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Project Details
                    </label>
                    <textarea
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Please describe your project requirements..."
                    ></textarea>
                  </div>

                  {showSuccess ? (
                    <SuccessScreen
                      email={formData.email}
                      setShowSuccess={setShowSuccess}
                    />
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-gray-900 text-white py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
                    >
                      Submit Quote Request
                    </button>
                  )}
                  <p className="text-sm text-gray-600 text-center">
                    2-hour response • Expert service • Vancouver certified
                  </p>
                </form>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-black text-white py-24">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Home?
              </h2>
              <p className="text-gray-300 mb-12 text-xl max-w-3xl mx-auto">
                Join thousands of satisfied Vancouver homeowners who trust us
                with their home repairs
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => router.push("/quote")}
                  className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-yellow-400 transition-colors duration-300"
                >
                  Request Free Quote
                </button>
                <button
                  onClick={() => router.push("/services")}
                  className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-black transition-colors duration-300"
                >
                  View All Services
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

const SuccessScreen = ({
  email,
  setShowSuccess,
}: {
  email: string;
  setShowSuccess: (p: false) => void;
}) => {
  return (
    <div className="p-8 flex flex-col items-center justify-center space-y-6 min-h-[400px]">
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
        <Check className="w-8 h-8 text-green-500" />
      </div>
      <h3 className="text-2xl font-medium text-gray-900">Message received</h3>

      <div className="space-y-2 text-center">
        <p className="text-gray-600">We&apos;ll get back to you shortly</p>
        <p className="text-gray-500 text-sm">
          Response will be sent to your email
        </p>
      </div>

      <button
        onClick={() => {
          setShowSuccess(false);
        }}
        className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-[#ffc527] hover:text-black"
      >
        Done
      </button>
    </div>
  );
};

export default Home;
