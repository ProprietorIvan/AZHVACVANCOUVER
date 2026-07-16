import { GetServerSideProps } from "next";

const SITE_URL = "https://azhvac.ca";

const staticPages = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/services", priority: "0.9", changefreq: "monthly" },
  { loc: "/service-areas", priority: "0.9", changefreq: "monthly" },
  { loc: "/guides", priority: "0.9", changefreq: "weekly" },
  { loc: "/contact", priority: "0.8", changefreq: "monthly" },
  { loc: "/why-chose-us", priority: "0.8", changefreq: "monthly" },
  { loc: "/hvac", priority: "1.0", changefreq: "weekly" },
  { loc: "/furnace-repair-vancouver", priority: "0.9", changefreq: "weekly" },
  { loc: "/heat-pump-vancouver", priority: "0.9", changefreq: "weekly" },
  { loc: "/ductless-mini-split-vancouver", priority: "0.8", changefreq: "monthly" },
  { loc: "/boiler-service-vancouver", priority: "0.8", changefreq: "monthly" },
  { loc: "/duct-cleaning-vancouver", priority: "0.8", changefreq: "monthly" },
  { loc: "/commercial-hvac-vancouver", priority: "0.8", changefreq: "monthly" },
  { loc: "/hvac-maintenance-vancouver", priority: "0.9", changefreq: "monthly" },
  { loc: "/emergency-hvac-vancouver", priority: "0.9", changefreq: "weekly" },
  { loc: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { loc: "/terms", priority: "0.3", changefreq: "yearly" },
];

function buildSitemapXml(): string {
  const lastmod = new Date().toISOString().split("T")[0];

  const { guides } = require("@/content/guides/index") as {
    guides: Array<{ slug: string }>;
  };
  const { getAllLocationServicePaths } = require("@/data/locations") as {
    getAllLocationServicePaths: () => Array<{ city: string; service: string }>;
  };

  const guideUrls = guides.map((g) => `/guides/${g.slug}`);
  const locationUrls = getAllLocationServicePaths().map(
    ({ city, service }) => `/locations/${city}/${service}`
  );

  const allUrls = [
    ...staticPages.map((p) => ({ ...p, lastmod })),
    ...guideUrls.map((loc) => ({
      loc,
      priority: "0.8",
      changefreq: "monthly",
      lastmod,
    })),
    ...locationUrls.map((loc) => ({
      loc,
      priority: "0.7",
      changefreq: "monthly",
      lastmod,
    })),
  ];

  const urlEntries = allUrls
    .map(
      (page) => `  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = buildSitemapXml();
  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate"
  );
  res.write(xml);
  res.end();
  return { props: {} };
};
