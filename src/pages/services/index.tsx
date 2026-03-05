import React from "react";
import Image from "next/image";
import Head from "next/head";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

interface Service {
  title: string;
  description: string;
  image: string;
  link: string;
}

const Services = () => {
  const services: Service[] = [
    {
      title: "AC Repair & Installation Vancouver",
      description: "Professional AC repair and installation. Central air, ductless. 24/7 emergency service.",
      image: "/photos/homepage/aircondtioning.png",
      link: "/hvac",
    },
    {
      title: "Furnace Repair & Installation Vancouver",
      description: "Furnace repair, installation, and maintenance. Gas and electric. Rebate assistance.",
      image: "/photos/homepage/heating.png",
      link: "/furnace-repair-vancouver",
    },
    {
      title: "Heat Pump Vancouver",
      description: "Heat pump installation with rebate assistance. Energy-efficient heating & cooling.",
      image: "/photos/homepage/2.jpg",
      link: "/heat-pump-vancouver",
    },
    {
      title: "Ductless Mini-Split Vancouver",
      description: "Ductless mini-split installation. No ductwork needed. Rebates available.",
      image: "/photos/homepage/Duct-lessminisplit.png",
      link: "/ductless-mini-split-vancouver",
    },
    {
      title: "Boiler Service Vancouver",
      description: "Boiler repair and installation. Hydronic heating systems.",
      image: "/photos/homepage/boilerservice.png",
      link: "/boiler-service-vancouver",
    },
    {
      title: "Duct Cleaning Vancouver",
      description: "Professional duct cleaning. Improve air quality.",
      image: "/photos/homepage/aircondtioning.png",
      link: "/duct-cleaning-vancouver",
    },
    {
      title: "Commercial HVAC Vancouver",
      description: "Rooftop units, VRF systems. Maintenance contracts.",
      image: "/photos/homepage/commericial.jpg",
      link: "/commercial-hvac-vancouver",
    },
    {
      title: "HVAC Maintenance Vancouver",
      description: "Preventive maintenance plans. Annual tune-ups.",
      image: "/photos/homepage/aircondtioning.png",
      link: "/hvac-maintenance-vancouver",
    },
    {
      title: "Emergency HVAC",
      description: "24/7 emergency service. 2-hour response. No overtime charges.",
      image: "/photos/homepage/24/7-response.png",
      link: "/emergency-hvac-vancouver",
    },
    {
      title: "All HVAC Services",
      description: "Complete HVAC solutions for Vancouver.",
      image: "/photos/homepage/aircondtioning.png",
      link: "/hvac",
    },
  ];

  const handleOpenService = (link: string) => {
    window.open(link, "_current");
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>HVAC Services in Vancouver | AZ Air Conditioning and Heating</title>
        <meta
          name="description"
          content="Professional HVAC services in Vancouver: AC installation, furnace repair, heat pump services, 24/7 emergency service. 100+ 5-star reviews."
        />
      </Head>

      <Navigation />

      <main className="pt-32 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vancouver&apos;s Premier HVAC Services
          </h1>
          <p className="text-lg text-gray-600">
            Heating, cooling, and air quality solutions for your home or business.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => handleOpenService(service.link)}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-[400px]"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/70" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-base opacity-90">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
