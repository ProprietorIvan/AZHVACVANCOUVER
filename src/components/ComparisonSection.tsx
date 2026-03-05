import React, { useState } from "react";
import { Check } from "lucide-react";
import Head from "next/head";
import Image from "next/image";

interface Service {
  title: string;
  description: string;
  buttonText: string;
  image: string;
  orientation: "left" | "right";
  url: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ComparisonSection = () => {
  const services: Service[] = [
    {
      title: "FLOOD REPAIR",
      description:
        "When your property had suffered from the flood, A-Z Handyman will respond quickly to keep you from further damage and will begin the repair and reconstruction procedure as quickly as possible.",
      buttonText: "FLOOD REPAIR",
      image: "/photos/homepage/Flood-Restoration.jpg",
      orientation: "right",
      url: "/flood-repair",
    },
    {
      title: "DRYWALL",
      description:
        "Do you need help for installing dry walls? With A-Z Handyman you have to the right place.",
      buttonText: "DRYWALL SERVICES",
      image: "/photos/homepage/DrywallRepair.jpg",
      orientation: "left",
      url: "/drywall",
    },
    {
      title: "General Handyman",
      description:
        "For any repair, installation, or upgrade you envision, we offer comprehensive handyman solutions tailored to your needs.",
      buttonText: "General Handyman",
      image: "/photos/homepage/Handyman.jpg",
      orientation: "right",
      url: "/general-handyman",
    },
    {
      title: "DEMOLITION",
      description:
        "Professional demolition services for residential and commercial properties. Safe, efficient, and complete cleanup included.",
      buttonText: "DEMOLITION SERVICES",
      image: "/photos/homepage/2.jpg",
      orientation: "left",
      url: "/demolition",
    },
    {
      title: "AIR CONDITIONING SERVICE",
      description:
        "A regular air conditioning service is essential since it keeps your air conditioner functioning more efficiently.",
      buttonText: "AIR CONDITIONING SERVICE",
      image: "/photos/homepage/AirConditioning.jpg",
      orientation: "left",
      url: "/hvac",
    },
  ];

  // Create JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "A-Z Handyman",
    url: "https://az-handyman.ca",
    logo: "https://az-handyman.ca/logo.png",
    image: services.map((service) => `https://az-handyman.ca${service.image}`),
    description:
      "Professional handyman services in Vancouver offering flood repair, drywall installation, general repairs, and HVAC services.",
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
    telephone: "+17786534862",
    email: "info@azhandyman.ca",
    priceRange: "$$",
    areaServed: "Vancouver Metropolitan Area",
    services: services.map((service) => ({
      "@type": "Service",
      name: service.title,
      description: service.description,
      url: `https://az-handyman.ca${service.url}`,
    })),
  };

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyToClipboard = async (text: string, isPhone: boolean) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isPhone) {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 1500);
      } else {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 1500);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => (
    <article
      className={`flex flex-col md:flex-row items-center w-full gap-8 py-16 ${
        service.orientation === "left" ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full md:w-1/2 relative group overflow-hidden">
        <a href={service.url} className="block cursor-pointer">
          <div className="relative overflow-hidden rounded-xl shadow-2xl transform transition-transform duration-500 hover:-translate-y-2">
            <div className="relative w-full h-[400px] md:h-[600px]">
              <Image
                src={service.image}
                alt={`${service.title} - Professional handyman services in Vancouver`}
                className="transition-transform duration-700 group-hover:scale-110 brightness-125 contrast-105 saturate-105"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
                quality={85}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/15 group-hover:to-black/25 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3
                className="text-2xl font-bold mb-2 drop-shadow-md"
                style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
              >
                {service.title}
              </h3>
              <p
                className="text-sm opacity-90 drop-shadow-md"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
              >
                Learn more about our professional {service.title.toLowerCase()}{" "}
                services in Vancouver
              </p>
            </div>
          </div>
        </a>
      </div>

      <div className="w-full md:w-1/2 px-6">
        <h2 className="text-4xl font-bold mb-6 tracking-wide">
          {service.title}
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          {service.description}
        </p>
        <a
          href={service.url}
          className="group inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300"
          aria-label={`Learn more about our ${service.title.toLowerCase()} services`}
        >
          {service.buttonText}
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </article>
  );

  return (
    <>
      <Head>
        <title>
          Professional Handyman Services in Vancouver | A-Z Handyman
        </title>
        <meta
          name="description"
          content="Vancouver's trusted handyman service offering flood repair, drywall installation, general repairs, and HVAC services. Fast, reliable, and professional service."
        />
        <meta
          name="keywords"
          content="handyman vancouver, flood repair, drywall installation, HVAC service, home repairs vancouver, professional handyman, emergency repairs"
        />

        {/* Open Graph tags */}
        <meta
          property="og:title"
          content="Professional Handyman Services in Vancouver | A-Z Handyman"
        />
        <meta
          property="og:description"
          content="Vancouver's trusted handyman service offering flood repair, drywall installation, general repairs, and HVAC services. Fast, reliable, and professional service."
        />
        <meta
          property="og:image"
          content="https://az-handyman.ca/photos/homepage/Handyman.jpg"
        />
        <meta property="og:url" content="https://az-handyman.ca" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Professional Handyman Services in Vancouver | A-Z Handyman"
        />
        <meta
          name="twitter:description"
          content="Vancouver's trusted handyman service offering flood repair, drywall installation, general repairs, and HVAC services."
        />
        <meta
          name="twitter:image"
          content="https://az-handyman.ca/photos/homepage/Handyman.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://az-handyman.ca" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main>
        {/* Contact Banner Section */}
        <section
          className="bg-black w-full p-8 space-y-6"
          aria-label="Contact Information"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            One Call Can Solve All Your House Problems
          </h1>

          <div className="flex justify-center">
            <svg
              className="w-16 h-16 mb-6"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden="true"
            >
              <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z" />
              <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a1 1 0 0 0-.086-1.391l-4.064-3.696z" />
            </svg>
          </div>

          <button
            onClick={() => copyToClipboard("7786534862", true)}
            className="w-full text-center transition-transform duration-200"
            aria-label="Copy phone number to clipboard"
          >
            <div
              className={`text-4xl md:text-6xl font-black text-white tracking-wider mb-8 text-center transition-colors duration-200 ${
                copiedPhone ? "text-green-400" : "text-white"
              }`}
              style={{
                textShadow: "4px 4px 0 rgba(0,0,0,0.3)",
              }}
            >
              {copiedPhone ? (
                <div className="flex items-center justify-center gap-4">
                  <span>Copied!</span>
                  <Check className="w-8 h-8 md:w-12 md:h-12 animate-in fade-in duration-200" />
                </div>
              ) : (
                "+1 778-653-4862"
              )}
            </div>
          </button>

          <h2 className="text-xl md:text-2xl text-white text-center mb-6">
            And, We Have More Options to Contact Us
          </h2>

          <div className="flex justify-center">
            <button
              onClick={() => copyToClipboard("info@azhandyman.ca", false)}
              className={`${
                copiedEmail
                  ? "bg-green-400 scale-95"
                  : "bg-yellow-400 hover:bg-yellow-300"
              } text-black px-8 py-2 font-medium rounded-full transition-all duration-300 flex items-center gap-2`}
              aria-label="Copy email address to clipboard"
            >
              {copiedEmail ? (
                <>
                  <span>Copied!</span>
                  <Check className="w-5 h-5 animate-in fade-in duration-200" />
                </>
              ) : (
                "Email Us"
              )}
            </button>
          </div>
        </section>

        {/* Main Services Section */}
        <section className="py-16 px-5" aria-label="Our Services">
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6">OUR SERVICES</h2>
              <div className="flex justify-center items-center gap-4 mb-8">
                <div className="h-px w-16 bg-yellow-400" aria-hidden="true" />
                <p className="text-lg text-gray-600">What We have Done</p>
                <div className="h-px w-16 bg-yellow-400" aria-hidden="true" />
              </div>
              <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
                Our skilled service delivers any complexity of household
                repairs. Calling our master will give you the chance to quickly
                and inexpensively resolve issues with the layout of your home.
                Get in touch with us and you will receive guarantees for all
                services as well as high-quality work.
              </p>
            </header>

            <div className="space-y-16">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ComparisonSection;
