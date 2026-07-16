import SEOHead from "@/components/SEOHead";
import { business } from "@/data/business";
import { getGMBProfile } from "@/data/gmb-profiles";
import { getServiceFAQs, serviceHowToSteps } from "@/data/serviceFAQs";
import { buildServicePageSchemaGraph } from "@/utils/seo";

interface ServicePageSEOProps {
  pageKey: string;
  canonicalPath: string;
  title: string;
  description: string;
  keywords: string;
  serviceName: string;
  serviceDescription: string;
  serviceArea?: string;
  ogImage?: string;
}

export default function ServicePageSEO({
  pageKey,
  canonicalPath,
  title,
  description,
  keywords,
  serviceName,
  serviceDescription,
  serviceArea = "Vancouver",
  ogImage,
}: ServicePageSEOProps) {
  const gmbProfile = getGMBProfile("hvac");
  const pageUrl = `${business.siteUrl}${canonicalPath}`;
  const faqs = getServiceFAQs(pageKey);

  const schemaGraph = gmbProfile
    ? buildServicePageSchemaGraph({
        pageKey,
        pageName: title,
        pageUrl,
        description: serviceDescription || description,
        gmbProfile,
        serviceName,
        serviceArea,
        faqs,
        howToSteps: serviceHowToSteps,
      })
    : undefined;

  return (
    <SEOHead
      title={title}
      description={description}
      keywords={keywords}
      canonicalUrl={pageUrl}
      ogImage={ogImage}
      schemaGraph={schemaGraph}
    />
  );
}
