import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import ServiceFAQSection from "@/components/ServiceFAQSection";
import { business } from "@/data/business";
import {
  getLocation,
  waveOneServices,
  type LocationConfig,
} from "@/data/locations";
import { buildLocationFAQs } from "@/data/serviceFAQs";
import { getGMBProfile } from "@/data/gmb-profiles";
import {
  buildServicePageSchemaGraph,
  generateWebPageSchema,
  generateFAQPageSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/utils/seo";
import { ArrowRight, MapPin, Phone } from "lucide-react";

interface LocationServicePageProps {
  citySlug: string;
  serviceSlug: string;
}

const serviceHeroImages: Record<string, string> = {
  hvac: "/photos/homepage/aircondtioning.png",
  "furnace-repair-vancouver": "/photos/homepage/heating.png",
  "heat-pump-vancouver": "/photos/homepage/boiler.png",
  "hvac-maintenance-vancouver": "/photos/homepage/hvacmaintance.png",
  "emergency-hvac-vancouver": "/photos/homepage/24/7-response.png",
};

export default function LocationServicePageContent({
  citySlug,
  serviceSlug,
}: LocationServicePageProps) {
  const location = getLocation(citySlug);
  const service = waveOneServices.find((s) => s.slug === serviceSlug);

  if (!location || !service) return null;

  const pageUrl = `${business.siteUrl}/locations/${citySlug}/${serviceSlug}`;
  const title = `${service.label} in ${location.name} | ${business.brandName}`;
  const description = `Professional ${service.label.toLowerCase()} in ${location.name}, BC. Licensed & insured. Custom written quotes. Serving ${location.neighborhoods.slice(0, 3).join(", ")} and more.`;
  const faqs = buildLocationFAQs(location.name, service.label, service.pageKey);
  const gmbProfile = getGMBProfile("hvac");
  const heroImage =
    serviceHeroImages[service.slug] || "/photos/homepage/aircondtioning.png";

  const schemaGraph = gmbProfile
    ? buildServicePageSchemaGraph({
        pageKey: service.pageKey,
        pageName: title,
        pageUrl,
        description,
        gmbProfile: { ...gmbProfile, location: location.name },
        serviceName: `${service.label} — ${location.name}`,
        serviceArea: location.name,
        faqs,
      })
    : [
        generateOrganizationSchema(),
        generateWebSiteSchema(),
        generateWebPageSchema(title, pageUrl, description),
        generateBreadcrumbSchema([
          { name: "Home", url: business.siteUrl },
          { name: "Service Areas", url: `${business.siteUrl}/service-areas` },
          { name: location.name, url: pageUrl },
        ]),
        generateFAQPageSchema(faqs, pageUrl),
      ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={title}
        description={description}
        keywords={`${service.label.toLowerCase()} ${location.name}, ${location.name} ${service.slug}, ${business.brandName}`}
        canonicalUrl={pageUrl}
        schemaGraph={schemaGraph}
      />
      <Navigation />

      <main>
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt={`${service.label} in ${location.name}`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/45" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link
                href="/service-areas"
                className="hover:text-white transition-colors"
              >
                Service Areas
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white/90">{location.name}</span>
            </nav>
            <p className="text-[#ffc527] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              {location.name}, BC
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 max-w-3xl leading-tight">
              {service.label} in {location.name}
            </h1>
            <p className="text-lg text-white/85 max-w-2xl leading-relaxed mb-8">
              {business.legalName} provides {service.label.toLowerCase()} across{" "}
              {location.name} and surrounding neighbourhoods including{" "}
              {location.neighborhoods.join(", ")}. {location.proofPoint}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#ffc527] text-black px-7 py-3.5 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${business.phone.tel}`}
                className="inline-flex items-center gap-2 border border-white/40 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {business.phone.display}
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="h-1 w-12 bg-[#ffc527] mb-5" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Licensed service in {location.name}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Fully licensed and insured. Every project receives a custom
                  written quote based on scope, materials, and site conditions —
                  request yours online or by phone.
                </p>
                <p className="flex items-center gap-2 text-gray-700 mb-8">
                  <MapPin className="w-5 h-5 text-[#ffc527]" />
                  Serving all listed neighbourhoods below
                </p>
                <Link
                  href={`/${service.pageKey}`}
                  className="inline-flex items-center gap-2 font-semibold text-gray-900 underline underline-offset-4 hover:text-black"
                >
                  View our main {service.label} page
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {location.name} neighbourhoods we serve
                </h3>
                <ul className="grid grid-cols-2 gap-3">
                  {location.neighborhoods.map((n) => (
                    <li
                      key={n}
                      className="px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ServiceFAQSection
          faqs={faqs}
          title={`${service.label} FAQ — ${location.name}`}
          subtitle={`Common questions about ${service.label.toLowerCase()} in ${location.name}`}
        />
      </main>
    </div>
  );
}

export function getLocationStaticProps(citySlug: string, serviceSlug: string) {
  const location = getLocation(citySlug);
  const service = waveOneServices.find((s) => s.slug === serviceSlug);
  if (!location || !service) return { notFound: true as const };
  return {
    props: { citySlug, serviceSlug, location, service },
  };
}

export type { LocationConfig };
