import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { business } from "@/data/business";
import { locations, waveOneServices, getAllLocationServicePaths } from "@/data/locations";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/utils/seo";
import { ArrowRight, MapPin, Phone } from "lucide-react";

export default function ServiceAreasPage() {
  const pageUrl = `${business.siteUrl}/service-areas`;
  const description =
    "AZ Air Conditioning and Heating serves Vancouver, Burnaby, Richmond, Surrey, North Vancouver, Coquitlam, and New Westminster for AC, furnace, heat pump, and emergency HVAC.";

  const schemaGraph = [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    generateWebPageSchema("Service Areas — Greater Vancouver", pageUrl, description),
    generateBreadcrumbSchema([
      { name: "Home", url: business.siteUrl },
      { name: "Service Areas", url: pageUrl },
    ]),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Service Areas — Greater Vancouver | AZ HVAC"
        description={description}
        keywords="HVAC service areas Vancouver, Greater Vancouver heating cooling, Burnaby Richmond Surrey HVAC"
        canonicalUrl={pageUrl}
        schemaGraph={schemaGraph}
      />
      <Navigation />

      <main>
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/photos/homepage/aircondtioning.png"
              alt="Greater Vancouver HVAC service areas"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/75" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-[#ffc527] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Greater Vancouver
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
              Areas We Serve
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed mb-6">
              AZ Air Conditioning and Heating — a proud brand of Felicita Holdings Ltd. — provides licensed HVAC service across the GVA within
              ~50 km of downtown Vancouver.
            </p>
            <p className="text-white/60 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#ffc527]" />
                {business.address.full}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#ffc527]" />
                {business.phone.display}
              </span>
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4">
          <div className="max-w-7xl mx-auto space-y-8">
            {locations.map((location) => (
              <section
                key={location.slug}
                className="rounded-2xl border border-gray-200 p-6 md:p-8 hover:border-[#ffc527]/60 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {location.name}
                    </h2>
                    <p className="text-gray-600 leading-relaxed max-w-2xl">
                      {location.proofPoint}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-5">
                  Neighbourhoods: {location.neighborhoods.join(", ")}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {waveOneServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/locations/${location.slug}/${service.slug}`}
                        className="px-4 py-2 bg-gray-900 text-white hover:bg-[#ffc527] hover:text-black rounded-full text-sm font-medium transition-colors"
                      >
                        {service.label}
                      </Link>
                    ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="max-w-7xl mx-auto bg-black rounded-2xl px-8 py-12 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Not sure if we cover your area?
              </h2>
              <p className="text-white/70">
                Call {business.phone.display} or request a custom quote — we
                likely serve your neighbourhood.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#ffc527] text-black px-7 py-3.5 rounded-full font-semibold hover:bg-yellow-400 transition-colors shrink-0"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export function getServiceAreaPaths() {
  return getAllLocationServicePaths();
}
