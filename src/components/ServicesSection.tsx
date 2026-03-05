import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    title: "AC Repair & Installation",
    description: "Central air, ductless. 24/7 emergency.",
    details: "Professional AC installation, repair, and maintenance. From ductless mini-splits to central air systems. Same-day service available.",
    image: "/photos/homepage/aircondtioning.png",
    link: "/hvac",
  },
  {
    title: "Furnace Repair & Installation",
    description: "Gas and electric. Rebate assistance.",
    details: "Furnace repair, installation, and maintenance. High-efficiency models. FortisBC rebates. 24/7 emergency heating service.",
    image: "/photos/homepage/heating.png",
    link: "/furnace-repair-vancouver",
  },
  {
    title: "Heat Pump Vancouver",
    description: "Energy-efficient heating & cooling. Rebates.",
    details: "Up to $16,000 in BC rebates. Ductless and ducted heat pumps. Year-round comfort from one system.",
    image: "/photos/homepage/boiler.png",
    link: "/heat-pump-vancouver",
  },
  {
    title: "Ductless Mini-Split",
    description: "No ductwork needed. Rebates available.",
    details: "Perfect for additions, condos, and homes without ducts. Zone-by-zone control. CleanBC and FortisBC rebates.",
    image: "/photos/homepage/Duct-lessminisplit.png",
    link: "/ductless-mini-split-vancouver",
  },
  {
    title: "Boiler Service",
    description: "Hydronic heating systems.",
    details: "Radiant floor, baseboard, and radiator systems. Circulator pumps, zone valves. 24/7 no-heat emergency.",
    image: "/photos/homepage/boilerservice.png",
    link: "/boiler-service-vancouver",
  },
  {
    title: "Duct Cleaning",
    description: "Professional duct cleaning. Air quality.",
    details: "HEPA-filtered equipment. Remove dust, allergens, mold. Better airflow and HVAC efficiency.",
    image: "/photos/homepage/ductcleaning.png",
    link: "/duct-cleaning-vancouver",
  },
  {
    title: "Commercial HVAC",
    description: "Rooftop units, VRF systems. Maintenance.",
    details: "Offices, retail, restaurants. Maintenance contracts. After-hours service. Priority emergency response.",
    image: "/photos/homepage/commericial.jpg",
    link: "/commercial-hvac-vancouver",
  },
  {
    title: "HVAC Maintenance",
    description: "Preventive plans. Annual tune-ups.",
    details: "Spring AC tune-up, fall furnace tune-up. Extend equipment life. Priority emergency. Repair discounts.",
    image: "/photos/homepage/hvacmaintance.png",
    link: "/hvac-maintenance-vancouver",
  },
  {
    title: "Emergency HVAC",
    description: "24/7 service. 2-hour response.",
    details: "No overtime charges. Heating and cooling emergencies. Same-day dispatch. Vancouver-wide.",
    image: "/photos/homepage/24/7-response.png",
    link: "/emergency-hvac-vancouver",
  },
];

const ServicesSection = () => {
  return (
    <section id="our-services" className="scroll-mt-24 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our HVAC Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional heating, cooling, and air quality solutions across Vancouver and the Lower Mainland
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <Link
              key={i}
              href={service.link}
              className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-200"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-300 group-hover:from-black/95 group-hover:via-black/60" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <h3 className="text-lg font-bold text-white">{service.title}</h3>
                  <div className="relative mt-2 min-h-[2.5rem]">
                    <p className="text-sm text-white/90 absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">
                      {service.description}
                    </p>
                    <p className="text-sm text-white/95 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {service.details}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5 border-t border-gray-100">
                <span className="inline-flex items-center gap-2 text-gray-900 font-semibold group-hover:text-yellow-600 transition-colors">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            View all services <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
