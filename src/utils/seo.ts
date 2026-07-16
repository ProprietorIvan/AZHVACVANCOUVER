import { GMBProfile, gmbProfiles } from "@/data/gmb-profiles";
import { business } from "@/data/business";
import type { FAQItem } from "@/data/serviceFAQs";

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogImage?: string;
  gmbProfile?: GMBProfile;
  type?: "website" | "article";
}

export const generateMetaTags = (config: SEOConfig) => {
  const {
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage = business.defaultOgImage,
    type = "website",
  } = config;

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    type,
  };
};

export const getServicePagePath = (pageKey: string): string => {
  const paths: Record<string, string> = {
    hvac: "/hvac",
    "furnace-repair-vancouver": "/furnace-repair-vancouver",
    "heat-pump-vancouver": "/heat-pump-vancouver",
    "ductless-mini-split-vancouver": "/ductless-mini-split-vancouver",
    "boiler-service-vancouver": "/boiler-service-vancouver",
    "duct-cleaning-vancouver": "/duct-cleaning-vancouver",
    "commercial-hvac-vancouver": "/commercial-hvac-vancouver",
    "hvac-maintenance-vancouver": "/hvac-maintenance-vancouver",
    "emergency-hvac-vancouver": "/emergency-hvac-vancouver",
  };
  return paths[pageKey] || `/${pageKey}`;
};

export const generateOrganizationSchema = () => ({
  "@type": ["Organization", "HVACContractor"],
  "@id": `${business.siteUrl}/#organization`,
  name: business.brandName,
  legalName: business.legalName,
  url: business.siteUrl,
  logo: `${business.siteUrl}/logo.png`,
  parentOrganization: {
    "@type": "Organization",
    name: business.parentOrg.name,
    url: business.parentOrg.url,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.locality,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: business.address.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: business.phone.tel,
    contactType: "customer service",
    email: business.email,
    availableLanguage: ["English"],
  },
  sameAs: [
    business.parentOrg.url,
    ...Array.from(
      new Set(Object.values(gmbProfiles).map((profile) => profile.gmbUrl))
    ),
  ],
});

export const generateWebSiteSchema = () => ({
  "@type": "WebSite",
  "@id": `${business.siteUrl}/#website`,
  name: business.brandName,
  url: business.siteUrl,
  publisher: { "@id": `${business.siteUrl}/#organization` },
  inLanguage: "en-CA",
});

export const generateLocalBusinessSchema = (
  gmbProfile: GMBProfile,
  pageKey: string
) => {
  const pagePath = getServicePagePath(pageKey);
  const schema: Record<string, unknown> = {
    "@type": ["LocalBusiness", "HVACContractor"],
    "@id": `${business.siteUrl}${pagePath}#localbusiness`,
    name: gmbProfile.businessName,
    image: business.defaultOgImage,
    url: `${business.siteUrl}${pagePath}`,
    telephone: gmbProfile.phone || business.phone.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: gmbProfile.location,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    aggregateRating: gmbProfile.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: gmbProfile.rating.toString(),
          reviewCount: gmbProfile.reviewCount?.toString() || "0",
          bestRating: "5",
          worstRating: "1",
        }
      : undefined,
    areaServed: business.serviceAreaCities.map((city) => ({
      "@type": "City",
      name: city,
    })),
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: business.geo.latitude,
        longitude: business.geo.longitude,
      },
      geoRadius: {
        "@type": "Distance",
        value: "50",
        unitCode: "KM",
      },
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [gmbProfile.gmbUrl],
  };

  if (!schema.aggregateRating) {
    delete schema.aggregateRating;
  }

  return schema;
};

export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const generateServiceSchema = (
  serviceName: string,
  description: string,
  serviceArea: string,
  pageUrl: string
) => ({
  "@type": "Service",
  name: serviceName,
  serviceType: serviceName,
  description,
  url: pageUrl,
  areaServed: {
    "@type": "City",
    name: serviceArea,
  },
  provider: { "@id": `${business.siteUrl}/#organization` },
});

export const generateFAQPageSchema = (faqs: FAQItem[], pageUrl: string) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
  url: pageUrl,
});

export interface Review {
  name: string;
  role?: string;
  text: string;
  rating?: number;
  datePublished?: string;
}

export const generateReviewSchema = (
  review: Review,
  businessName: string,
  businessUrl: string
) => ({
  "@type": "Review",
  author: {
    "@type": "Person",
    name: review.name,
    jobTitle: review.role,
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: (review.rating || 5).toString(),
    bestRating: "5",
    worstRating: "1",
  },
  reviewBody: review.text,
  datePublished:
    review.datePublished || new Date().toISOString().split("T")[0],
  itemReviewed: {
    "@type": "LocalBusiness",
    name: businessName,
    url: businessUrl,
  },
});

export const generateWebPageSchema = (
  pageName: string,
  pageUrl: string,
  description: string,
  datePublished?: string,
  dateModified?: string
) => ({
  "@type": "WebPage",
  name: pageName,
  url: pageUrl,
  description,
  datePublished: datePublished || new Date().toISOString().split("T")[0],
  dateModified: dateModified || new Date().toISOString().split("T")[0],
  inLanguage: "en-CA",
  isPartOf: { "@id": `${business.siteUrl}/#website` },
});

export const generateArticleSchema = (
  title: string,
  description: string,
  pageUrl: string,
  datePublished: string,
  dateModified: string
) => ({
  "@type": "Article",
  headline: title,
  description,
  url: pageUrl,
  datePublished,
  dateModified,
  inLanguage: "en-CA",
  author: {
    "@type": "Organization",
    name: business.legalName,
    url: business.parentOrg.url,
  },
  publisher: { "@id": `${business.siteUrl}/#organization` },
  isPartOf: { "@id": `${business.siteUrl}/#website` },
});

export const generateHowToSchema = (
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>
) => ({
  "@type": "HowTo",
  name,
  description,
  step: steps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
});

export const buildServicePageSchemaGraph = ({
  pageKey,
  pageName,
  pageUrl,
  description,
  gmbProfile,
  serviceName,
  serviceArea,
  faqs,
  howToSteps,
}: {
  pageKey: string;
  pageName: string;
  pageUrl: string;
  description: string;
  gmbProfile: GMBProfile;
  serviceName: string;
  serviceArea: string;
  faqs: FAQItem[];
  howToSteps?: Array<{ name: string; text: string }>;
}) => {
  const graph: Record<string, unknown>[] = [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    generateLocalBusinessSchema(gmbProfile, pageKey),
    generateWebPageSchema(pageName, pageUrl, description),
    generateBreadcrumbSchema([
      { name: "Home", url: business.siteUrl },
      { name: serviceName, url: pageUrl },
    ]),
    generateServiceSchema(serviceName, description, serviceArea, pageUrl),
    generateFAQPageSchema(faqs, pageUrl),
  ];

  if (howToSteps?.length) {
    graph.push(
      generateHowToSchema(
        `How our ${serviceName} process works`,
        `Our step-by-step ${serviceName.toLowerCase()} process in ${serviceArea}.`,
        howToSteps
      )
    );
  }

  return graph;
};

export type { FAQItem };
