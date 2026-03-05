import { GMBProfile } from "@/data/gmb-profiles";

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
    ogImage = "https://az-handyman.ca/photos/homepage/2.jpg",
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

export const generateLocalBusinessSchema = (gmbProfile: GMBProfile) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: gmbProfile.businessName,
    image: "https://az-handyman.ca/photos/homepage/2.jpg",
    url: `https://az-handyman.ca${gmbProfile.serviceType.toLowerCase().replace(/\s+/g, "-")}`,
    telephone: gmbProfile.phone || "+17786534862",
    address: {
      "@type": "PostalAddress",
      addressLocality: gmbProfile.location,
      addressRegion: "BC",
      addressCountry: "CA",
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
    priceRange: "$$",
    areaServed: [
      {
        "@type": "City",
        name: gmbProfile.location,
      },
      {
        "@type": "City",
        name: "Vancouver",
      },
      {
        "@type": "City",
        name: "Burnaby",
      },
      {
        "@type": "City",
        name: "Richmond",
      },
      {
        "@type": "City",
        name: "Surrey",
      },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "49.2827",
        longitude: "-123.1207",
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${gmbProfile.serviceType} Services`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: gmbProfile.serviceType,
            description: `Professional ${gmbProfile.serviceType} services in ${gmbProfile.location}`,
          },
        },
      ],
    },
    makesOffer: {
      "@type": "Offer",
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "CAD",
      },
    },
    sameAs: [gmbProfile.gmbUrl],
  };

  // Remove undefined aggregateRating if not present
  if (!schema.aggregateRating) {
    delete schema.aggregateRating;
  }

  return schema;
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const generateServiceSchema = (
  serviceName: string,
  description: string,
  serviceArea: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    description,
    areaServed: {
      "@type": "City",
      name: serviceArea,
    },
    provider: {
      "@type": "LocalBusiness",
      name: "A-Z Handyman",
    },
  };
};

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate FAQPage schema for structured data
 */
export const generateFAQPageSchema = (faqs: FAQItem[], pageUrl: string) => {
  return {
    "@context": "https://schema.org",
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
  };
};

export interface Review {
  name: string;
  role?: string;
  text: string;
  rating?: number;
  datePublished?: string;
}

/**
 * Generate Review schema for individual reviews
 */
export const generateReviewSchema = (
  review: Review,
  businessName: string,
  businessUrl: string
) => {
  return {
    "@context": "https://schema.org",
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
    datePublished: review.datePublished || new Date().toISOString().split("T")[0],
    itemReviewed: {
      "@type": "LocalBusiness",
      name: businessName,
      url: businessUrl,
    },
  };
};

/**
 * Generate WebPage schema for page-level metadata
 */
export const generateWebPageSchema = (
  pageName: string,
  pageUrl: string,
  description: string,
  datePublished?: string,
  dateModified?: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageName,
    url: pageUrl,
    description,
    datePublished: datePublished || new Date().toISOString().split("T")[0],
    dateModified: dateModified || new Date().toISOString().split("T")[0],
    inLanguage: "en-CA",
    isPartOf: {
      "@type": "WebSite",
      name: "A-Z Handyman",
      url: "https://az-handyman.ca",
    },
  };
};
