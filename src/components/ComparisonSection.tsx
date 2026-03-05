import React, { useState } from "react";
import { Check } from "lucide-react";
import Head from "next/head";
import Image from "next/image";

const SITE_URL = "https://azhvac.ca";
const BUSINESS_NAME = "AZ Air Conditioning and Heating";

interface Service {
  title: string;
  description: string;
  buttonText: string;
  image: string;
  orientation: "left" | "right";
  url: string;
  compact?: boolean;
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ComparisonSection = () => {
  const services: Service[] = [
    {
      title: "AIR CONDITIONING",
      description:
        "Professional AC installation, repair, and maintenance. From ductless mini-splits to central air systems, we keep your Vancouver home cool and comfortable all summer long.",
      buttonText: "AC SERVICES",
      image: "/photos/homepage/aircondtioning.png",
      orientation: "right",
      url: "/hvac",
    },
    {
      title: "HEATING",
      description:
        "Furnace repair, heat pump installation, and boiler services. Our certified technicians ensure your heating system runs efficiently through Vancouver winters.",
      buttonText: "HEATING SERVICES",
      image: "/photos/homepage/heating.png",
      orientation: "left",
      url: "/furnace-repair-vancouver",
    },
    {
      title: "24/7 EMERGENCY SERVICE",
      description:
        "When your HVAC fails, we respond. 2-hour guaranteed response time for urgent heating and cooling emergencies across the Lower Mainland.",
      buttonText: "EMERGENCY HVAC",
      image: "/photos/homepage/24/7-response.png",
      orientation: "right",
      url: "/emergency-hvac-vancouver",
    },
    {
      title: "COMMERCIAL HVAC",
      description:
        "Rooftop units, VRF/VRV systems, building automation, and commercial refrigeration. We serve offices, retail, restaurants, and industrial facilities.",
      buttonText: "COMMERCIAL SERVICES",
      image: "/photos/homepage/commericial.jpg",
      orientation: "left",
      url: "/commercial-hvac-vancouver",
      compact: true,
    },
  ];

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
      className={`flex flex-col md:flex-row items-center w-full gap-8 ${
        service.compact ? "py-8 gap-6" : "py-16"
      } ${service.orientation === "left" ? "md:flex-row-reverse" : ""}`}
    >
      <div className="w-full md:w-1/2 relative group overflow-hidden">
        <a href={service.url} className="block cursor-pointer">
          <div className="relative overflow-hidden rounded-xl shadow-2xl transform transition-transform duration-500 hover:-translate-y-2">
            <div className={`relative w-full ${service.compact ? "h-[240px] md:h-[320px]" : "h-[400px] md:h-[600px]"}`}>
              <Image
                src={service.image}
                alt={`${service.title} - Professional HVAC services in Vancouver`}
                className="transition-transform duration-700 group-hover:scale-110 brightness-125 contrast-105 saturate-105"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
                quality={85}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/15 group-hover:to-black/25 transition-all duration-300" />
            <div className={`absolute bottom-0 left-0 right-0 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ${service.compact ? "p-4" : "p-6"}`}>
              <h3
                className={`font-bold mb-2 drop-shadow-md ${service.compact ? "text-xl" : "text-2xl"}`}
                style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
              >
                {service.title}
              </h3>
              <p
                className={`opacity-90 drop-shadow-md ${service.compact ? "text-xs" : "text-sm"}`}
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
              >
                Learn more about our {service.title.toLowerCase()} in Vancouver
              </p>
            </div>
          </div>
        </a>
      </div>

      <div className="w-full md:w-1/2 px-6">
        <h2 className={`font-bold tracking-wide ${service.compact ? "text-2xl md:text-3xl mb-4" : "text-4xl mb-6"}`}>
          {service.title}
        </h2>
        <p className={`text-gray-700 leading-relaxed ${service.compact ? "text-base mb-4" : "text-lg mb-8"}`}>
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
        <title>HVAC Services in Vancouver | {BUSINESS_NAME}</title>
        <meta
          name="description"
          content="Professional HVAC services in Vancouver: AC installation, furnace repair, heat pump services, 24/7 emergency. 100+ 5-star reviews."
        />
        <meta
          name="keywords"
          content="hvac vancouver, air conditioning vancouver, furnace repair vancouver, ac installation, heat pump vancouver, emergency hvac"
        />
        <meta property="og:title" content={`HVAC Services | ${BUSINESS_NAME}`} />
        <meta property="og:description" content="Professional HVAC services in Vancouver. AC, heating, 24/7 emergency." />
        <meta property="og:image" content={`${SITE_URL}/photos/homepage/aircondtioning.png`} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`HVAC Services | ${BUSINESS_NAME}`} />
        <link rel="canonical" href={SITE_URL} />
      </Head>

      <main>
        <section
          className="bg-black w-full p-8 space-y-6"
          aria-label="Contact Information"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            One Call Solves All Your HVAC Problems
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
            onClick={() => copyToClipboard("7787705721", true)}
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
                "+1 778-770-5721"
              )}
            </div>
          </button>

          <h2 className="text-xl md:text-2xl text-white text-center mb-6">
            Or Email Us for a Free Quote
          </h2>

          <div className="flex justify-center">
            <button
              onClick={() => copyToClipboard("office@azhvac.ca", false)}
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
                "office@azhvac.ca"
              )}
            </button>
          </div>
        </section>

        <section className="py-16 px-5" aria-label="Our Services">
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-20">
              <h2 className="text-5xl font-bold mb-6">OUR HVAC SERVICES</h2>
              <div className="flex justify-center items-center gap-4 mb-8">
                <div className="h-px w-16 bg-yellow-400" aria-hidden="true" />
                <p className="text-lg text-gray-600">Heating, Cooling & Air Quality</p>
                <div className="h-px w-16 bg-yellow-400" aria-hidden="true" />
              </div>
              <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
                Vancouver&apos;s trusted HVAC specialists. From emergency repairs to
                complete system installations, our certified technicians deliver
                expert service with 100+ 5-star reviews. 24/7 emergency
                availability.
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
