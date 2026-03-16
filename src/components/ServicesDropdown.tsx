import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowRight, X } from "lucide-react";

const SERVICES = [
  { title: "AC Repair & Installation", description: "Central air, ductless. 24/7 emergency.", image: "/photos/homepage/aircondtioning.png", link: "/hvac" },
  { title: "Furnace Repair & Installation", description: "Gas and electric. Rebate assistance.", image: "/photos/homepage/heating.png", link: "/furnace-repair-vancouver" },
  { title: "Heat Pump Vancouver", description: "Energy-efficient heating & cooling. Rebates.", image: "/photos/homepage/boiler.png", link: "/heat-pump-vancouver" },
  { title: "Ductless Mini-Split", description: "No ductwork needed. Rebates available.", image: "/photos/homepage/Duct-lessminisplit.png", link: "/ductless-mini-split-vancouver" },
  { title: "Boiler Service", description: "Hydronic heating systems.", image: "/photos/homepage/boilerservice.png", link: "/boiler-service-vancouver" },
  { title: "Duct Cleaning", description: "Professional duct cleaning. Air quality.", image: "/photos/homepage/ductcleaning.png", link: "/duct-cleaning-vancouver" },
  { title: "Commercial HVAC", description: "Rooftop units, VRF systems. Maintenance.", image: "/photos/homepage/commericial.jpg", link: "/commercial-hvac-vancouver" },
  { title: "HVAC Maintenance", description: "Preventive plans. Annual tune-ups.", image: "/photos/homepage/aircondtioning.png", link: "/hvac-maintenance-vancouver" },
  { title: "Emergency HVAC", description: "24/7 service. 2-hour response.", image: "/photos/homepage/24/7-response.png", link: "/emergency-hvac-vancouver" },
];

const ServicesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 bg-white/95 backdrop-blur-sm text-gray-900 px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-yellow-400 transition-all duration-300 border border-gray-100"
      >
        <span>Explore Our Services</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Dropdown panel */}
      <div
        className={`fixed left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:max-w-4xl top-24 md:top-28 z-50 transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-gray-900 text-lg">Our HVAC Services</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((service, i) => (
                <Link
                  key={i}
                  href={service.link}
                  onClick={() => setIsOpen(false)}
                  className="group flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 group-hover:text-gray-700">{service.title}</h4>
                    <p className="text-sm text-gray-500 mt-0.5">{service.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 mt-2 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 text-center">
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-yellow-600 transition-colors"
            >
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesDropdown;
