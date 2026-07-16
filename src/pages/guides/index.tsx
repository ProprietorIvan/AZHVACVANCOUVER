import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { guides } from "@/content/guides/index";
import { business } from "@/data/business";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/utils/seo";
import { ArrowRight } from "lucide-react";

export default function GuidesIndexPage() {
  const pageUrl = `${business.siteUrl}/guides`;
  const description =
    "Expert guides on AC repair, choosing an HVAC contractor, heat pumps, maintenance, and Greater Vancouver service areas from AZ Air Conditioning and Heating.";

  const schemaGraph = [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    generateWebPageSchema("Home Repair Guides — Vancouver", pageUrl, description),
    generateBreadcrumbSchema([
      { name: "Home", url: business.siteUrl },
      { name: "Guides", url: pageUrl },
    ]),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="HVAC Guides — Vancouver | AZ Air Conditioning and Heating"
        description={description}
        keywords="AC repair Vancouver, choose HVAC Vancouver, heat pump Vancouver, HVAC maintenance guide"
        canonicalUrl={pageUrl}
        schemaGraph={schemaGraph}
      />
      <Navigation />

      <main>
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/photos/homepage/aircondtioning.png"
              alt="Vancouver HVAC guides"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/75" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-[#ffc527] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Resources
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
              HVAC Guides
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              Practical answers for Vancouver homeowners — maintenance,
              equipment choices, and honest advice from {business.legalName}.
              Pricing is always custom; request a written quote for your project.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <article
                key={guide.slug}
                className="group flex flex-col border border-gray-200 rounded-2xl p-7 hover:border-[#ffc527] hover:shadow-lg transition-all duration-300 bg-white"
              >
                <Link href={`/guides/${guide.slug}`} className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-black leading-snug">
                    {guide.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {guide.tldr}
                  </p>
                </Link>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:text-black"
                >
                  Read guide
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="max-w-7xl mx-auto bg-black rounded-2xl px-8 py-12 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Need a custom quote?
              </h2>
              <p className="text-white/70">
                Tell us about your project — we&apos;ll respond with a clear
                written estimate.
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
