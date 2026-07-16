import Head from "next/head";
import { business } from "@/data/business";
import { generateMetaTags, type SEOConfig } from "@/utils/seo";

interface SEOHeadProps extends SEOConfig {
  noindex?: boolean;
  schemaGraph?: Record<string, unknown> | Record<string, unknown>[];
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  type = "website",
  noindex = false,
  schemaGraph,
}: SEOHeadProps) {
  const meta = generateMetaTags({
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    type,
  });

  const graphItems = schemaGraph
    ? Array.isArray(schemaGraph)
      ? schemaGraph
      : [schemaGraph]
    : [];

  const jsonLd =
    graphItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@graph": graphItems,
        }
      : null;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={meta.canonicalUrl} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}

      <meta property="og:type" content={meta.type} />
      <meta property="og:url" content={meta.canonicalUrl} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.ogImage} />
      <meta property="og:site_name" content={business.brandName} />
      <meta property="og:locale" content="en_CA" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={meta.canonicalUrl} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.ogImage} />

      <meta name="geo.region" content="CA-BC" />
      <meta name="geo.placename" content="Vancouver" />
      <meta
        name="geo.position"
        content={`${business.geo.latitude};${business.geo.longitude}`}
      />
      <meta
        name="ICBM"
        content={`${business.geo.latitude}, ${business.geo.longitude}`}
      />

      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
    </Head>
  );
}
