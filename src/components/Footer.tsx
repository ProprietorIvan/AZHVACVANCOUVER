import React from "react";
import Link from "next/link";
import { business } from "@/data/business";
import { generateOrganizationSchema } from "@/utils/seo";

const Footer = () => {
  const organizationStructuredData = generateOrganizationSchema();

  const serviceLinks = [
    { label: "AC Repair & Installation", href: "/hvac" },
    { label: "Furnace Repair", href: "/furnace-repair-vancouver" },
    { label: "Heat Pump", href: "/heat-pump-vancouver" },
    { label: "Ductless Mini-Split", href: "/ductless-mini-split-vancouver" },
    { label: "HVAC Maintenance", href: "/hvac-maintenance-vancouver" },
    { label: "Emergency HVAC", href: "/emergency-hvac-vancouver" },
    { label: "Commercial HVAC", href: "/commercial-hvac-vancouver" },
  ];

  return (
    <div className="relative mt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />

      <footer
        className="bg-black text-white py-12 px-6"
        aria-label="Site Footer"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <section aria-label="About Us">
            <h2 className="text-lg font-semibold mb-4">We are here to help</h2>
            <div className="h-1 w-12 bg-[#ffc527] mb-4" aria-hidden="true" />
            <p className="text-gray-300 leading-relaxed">
              AZ Air Conditioning and Heating — a happy Felicita Holdings Ltd.
              company. Licensed HVAC across Greater Vancouver — heating,
              cooling, and 24/7 emergency service.
            </p>
          </section>

          <section aria-label="Services">
            <h2 className="text-lg font-semibold mb-4">
              <span className="text-[#ffc527]">SERVICES</span>
            </h2>
            <div className="h-1 w-12 bg-[#ffc527] mb-4" aria-hidden="true" />
            <ul className="space-y-2 text-gray-300">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Locations and resources">
            <h2 className="text-lg font-semibold mb-4">
              <span className="text-[#ffc527]">AREAS & GUIDES</span>
            </h2>
            <div className="h-1 w-12 bg-[#ffc527] mb-4" aria-hidden="true" />
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/service-areas" className="hover:text-white transition-colors">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-white transition-colors">
                  HVAC Guides
                </Link>
              </li>
              <li>
                <Link href="/why-chose-us" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </section>

          <section aria-label="Contact Information">
            <h2 className="text-lg font-semibold mb-4">
              CONTACT <span className="text-[#ffc527]">HERE</span>
            </h2>
            <div className="h-1 w-12 bg-[#ffc527] mb-4" aria-hidden="true" />
            <p className="text-gray-300 mb-4">Open 24 hours a day, 7 days a week</p>
            <address className="text-gray-300 space-y-2 not-italic">
              <p>Address: {business.address.full}</p>
              <p>
                Phone:{" "}
                <a
                  href={`tel:${business.phone.tel}`}
                  className="hover:text-white transition-colors"
                >
                  {business.phone.display}
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${business.email}`}
                  className="hover:text-white transition-colors"
                >
                  {business.email}
                </a>
              </p>
            </address>
          </section>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col items-center text-gray-400 text-sm space-y-4">
            <div className="text-xs tracking-wider text-gray-500">
              <a
                href={business.parentOrg.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-normal hover:text-gray-300 transition-colors"
              >
                Felicita Group Company
              </a>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center w-full">
              <p>© {new Date().getFullYear()}. ALL RIGHTS RESERVED</p>
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
  );
};

export default Footer;
