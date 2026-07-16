import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import ServiceFAQSection from "@/components/ServiceFAQSection";
import { guides, getGuide, type Guide } from "@/content/guides/index";
import { business } from "@/data/business";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateArticleSchema,
  generateFAQPageSchema,
  generateBreadcrumbSchema,
} from "@/utils/seo";
import { ArrowRight, Phone } from "lucide-react";

interface GuidePageProps {
  guide: Guide;
}

export default function GuidePage({ guide }: GuidePageProps) {
  const pageUrl = `${business.siteUrl}/guides/${guide.slug}`;

  const schemaGraph = [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    generateArticleSchema(
      guide.title,
      guide.description,
      pageUrl,
      guide.published,
      guide.modified
    ),
    generateBreadcrumbSchema([
      { name: "Home", url: business.siteUrl },
      { name: "Guides", url: `${business.siteUrl}/guides` },
      { name: guide.title, url: pageUrl },
    ]),
    generateFAQPageSchema(guide.faqs, pageUrl),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={`${guide.title} | ${business.brandName}`}
        description={guide.description}
        keywords={guide.title}
        canonicalUrl={pageUrl}
        type="article"
        schemaGraph={schemaGraph}
      />
      <Navigation />

      <main className="pt-28 pb-16">
        <article className="max-w-3xl mx-auto px-4">
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/guides" className="hover:text-black transition-colors">
              Guides
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 line-clamp-1">{guide.title}</span>
          </nav>

          <div className="h-1 w-12 bg-[#ffc527] mb-6" />
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            {guide.title}
          </h1>

          <div className="relative mb-12 rounded-2xl overflow-hidden bg-black px-6 py-8 md:px-8">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#ffc527]" />
            <p className="text-[#ffc527] text-xs font-semibold tracking-[0.15em] uppercase mb-3">
              Quick answer
            </p>
            <p className="text-white/90 text-lg leading-relaxed">{guide.tldr}</p>
          </div>

          {guide.sections.map((section, i) => (
            <section key={i} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {section.heading}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {section.body}
              </p>
            </section>
          ))}

          <aside className="mb-12 rounded-2xl border border-gray-200 p-6 md:p-8 bg-gray-50">
            <p className="text-sm text-gray-500 mb-2">
              Published by {business.legalName}
            </p>
            <p className="text-gray-800 text-lg mb-6 leading-relaxed">
              Need help in Vancouver? Every job receives a custom written quote —
              no published rates.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${business.phone.tel}`}
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-900 px-6 py-3 rounded-full font-semibold hover:border-black transition-colors"
              >
                <Phone className="w-4 h-4" />
                {business.phone.display}
              </a>
            </div>
          </aside>

          {guide.relatedServices.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Related services
              </h2>
              <div className="flex flex-wrap gap-3">
                {guide.relatedServices.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {guide.faqs.length > 0 && (
          <ServiceFAQSection faqs={guide.faqs} title="Related questions" />
        )}
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: guides.map((g) => ({ params: { slug: g.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<GuidePageProps> = async ({
  params,
}) => {
  const guide = getGuide(params?.slug as string);
  if (!guide) return { notFound: true };
  return { props: { guide } };
};
