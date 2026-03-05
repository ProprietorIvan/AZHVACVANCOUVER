import React from "react";
import Head from "next/head";
import Link from "next/link";
const SITE_URL = "https://azhvac.ca";
const BUSINESS_NAME = "AZ Air Conditioning and Heating";

const Footer = () => {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "HVACContractor",
    name: BUSINESS_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "922 Homer St",
      addressLocality: "Vancouver",
      addressRegion: "BC",
      postalCode: "V6B 1T7",
      addressCountry: "CA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+17787705721",
      contactType: "customer service",
      email: "office@azhvac.ca",
      availableLanguage: ["English"],
      areaServed: "CA-BC",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Felicita Group",
      url: "https://www.felicita.group",
    },
    openingHoursSpecification: {
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
      opens: "08:00",
      closes: "18:00",
    },
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </Head>

      <div className="relative mt-16">
        <footer
          className="bg-black text-white py-12 px-6"
          aria-label="Site Footer"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <section aria-label="About Us">
              <h2 className="text-lg font-semibold mb-4">
                We are here to help
              </h2>
              <div
                className="h-1 w-12 bg-orange-600 mb-4"
                aria-hidden="true"
              ></div>
              <p className="text-gray-300">
                Vancouver&apos;s trusted HVAC contractor. From AC installation to
                furnace repair, we deliver expert heating and cooling solutions.
                No HVAC job is too big or small—call us for a free estimate.
              </p>
            </section>

            <section aria-label="Opening Hours">
              <h2 className="text-lg font-semibold mb-4">
                OPENING <span className="text-yellow-500">HOURS</span>
              </h2>
              <div
                className="h-1 w-12 bg-orange-600 mb-4"
                aria-hidden="true"
              ></div>
              <p className="text-gray-300">
                Mon–Sun: 8 AM – 6 PM
                <br />
                24/7 Emergency Service Available
              </p>
            </section>

            <section aria-label="Contact Information">
              <h2 className="text-lg font-semibold mb-4">
                CONTACT <span className="text-yellow-500">HERE</span>
              </h2>
              <div
                className="h-1 w-12 bg-orange-600 mb-4"
                aria-hidden="true"
              ></div>
              <address className="text-gray-300 space-y-2 not-italic">
                <p>922 Homer St, Vancouver, BC V6B 1T7</p>
                <p>
                  Phone:{" "}
                  <a
                    href="tel:+17787705721"
                    className="hover:text-white transition-colors"
                  >
                    (778) 770-5721
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:office@azhvac.ca"
                    className="hover:text-white transition-colors"
                  >
                    office@azhvac.ca
                  </a>
                </p>
              </address>
            </section>
          </div>

          <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800">
            <div className="flex flex-col items-center text-gray-400 text-sm space-y-4">
              <div className="text-xs tracking-wider text-gray-500">
                <a
                  href="https://www.felicita.group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-normal hover:text-gray-300 transition-colors"
                >
                  Felicita Group Company
                </a>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center w-full">
                <p>© {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</p>
                <div className="flex space-x-8 mt-4 md:mt-0">
                  <Link
                    href="/privacy-policy"
                    className="hover:text-white transition-colors"
                  >
                    PRIVACY POLICY
                  </Link>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    TERMS & CONDITIONS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
