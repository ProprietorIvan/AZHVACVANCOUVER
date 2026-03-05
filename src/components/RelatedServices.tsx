import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ALL_SERVICES, getTopServicesForPage } from "@/data/services";

interface RelatedServicesProps {
  currentPage?: string;
  /** Optional id for scroll target (e.g. "our-services") */
  id?: string;
}

const ServiceCard = ({
  service,
  isLarge,
}: {
  service: (typeof ALL_SERVICES)[0];
  isLarge: boolean;
}) => (
  <Link
    href={service.link}
    className={`group/card block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 ${
      isLarge ? "" : "group-hover/section:!block"
    }`}
  >
    <div
      className={`relative overflow-hidden transition-all duration-500 ${
        isLarge ? "h-56" : "h-20 group-hover/section:h-56"
      }`}
    >
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover transition-transform duration-500 group-hover/card:scale-110"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 group-hover/section:p-6 transition-all duration-500">
        <h3 className={`font-bold text-white transition-all duration-500 ${isLarge ? "text-xl" : "text-base group-hover/section:text-xl"}`}>
          {service.title}
        </h3>
        <p className={`text-white/90 mt-0.5 transition-all duration-500 ${isLarge ? "text-sm" : "text-xs opacity-0 max-h-0 group-hover/section:opacity-100 group-hover/section:max-h-20 group-hover/section:text-sm"}`}>
          {service.description}
        </p>
      </div>
    </div>
    <div className={`transition-all duration-500 ${isLarge ? "p-5" : "p-3 max-h-0 overflow-hidden opacity-0 group-hover/section:max-h-24 group-hover/section:opacity-100 group-hover/section:p-5"}`}>
      <span className="inline-flex items-center gap-2 text-gray-900 font-semibold group-hover/card:text-yellow-600 transition-colors">
        Learn more <ArrowRight className="w-5 h-5 group-hover/card:translate-x-1 transition-transform" />
      </span>
    </div>
  </Link>
);

const RelatedServices = ({ currentPage, id }: RelatedServicesProps) => {
  const topServices = getTopServicesForPage(currentPage ?? "");
  const otherServices = ALL_SERVICES.filter((s) => !topServices.some((t) => t.link === s.link));

  return (
    <section id={id} className="group/section py-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Explore Our Services
        </h2>

        {/* Top 3 - Large prominent cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {topServices.map((s) => (
            <ServiceCard key={s.link} service={s} isLarge />
          ))}
        </div>

        {/* Remaining services - compact by default, expand to same size on section hover */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 md:group-hover/section:grid-cols-3 gap-4 md:group-hover/section:gap-8 mb-10 transition-all duration-500">
          {otherServices.map((s) => (
            <ServiceCard key={s.link} service={s} isLarge={false} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-10 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-lg"
          >
            View all services <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;
