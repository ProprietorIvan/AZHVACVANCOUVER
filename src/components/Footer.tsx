import React from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">
              AZ Air Conditioning and Heating
            </h3>
            <div className="h-1 w-16 bg-[#ffc527] mb-6" />
            <p className="text-gray-300 mb-6 leading-relaxed">
              Licensed HVAC across Greater Vancouver — heating, cooling,
              maintenance, and 24/7 emergency service for homes and businesses.
            </p>
            <div className="text-gray-400 text-sm space-y-2">
              <p>A proud brand of</p>
              <a
                href={business.parentOrg.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-[#ffc527] transition-colors duration-300"
              >
                {business.legalName} <ExternalLink size={14} />
              </a>
              <p className="text-gray-300">Open 24 hours a day, 7 days a week</p>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-300">
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
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              OUR <span className="text-[#ffc527]">SERVICES</span>
            </h3>
            <div className="h-1 w-16 bg-[#ffc527] mb-6" />
            <ul className="space-y-3 text-gray-300">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              GET IN <span className="text-[#ffc527]">TOUCH</span>
            </h3>
            <div className="h-1 w-16 bg-[#ffc527] mb-6" />
            <div className="text-gray-300 space-y-4">
              <div>
                <p className="font-semibold mb-2">Available:</p>
                <p className="text-white font-semibold">24 Hours a Day</p>
                <p className="text-white font-semibold">7 Days a Week</p>
                <p className="mt-2 text-[#ffc527] font-semibold">
                  24/7 Emergency HVAC Service
                </p>
              </div>
              <div className="pt-4 border-t border-gray-800">
                <a
                  href={`tel:${business.phone.tel}`}
                  className="flex items-center gap-2 hover:text-[#ffc527] transition-colors duration-300 mb-3"
                >
                  <Phone size={16} />
                  <p>{business.phone.display}</p>
                </a>
                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center gap-2 hover:text-[#ffc527] transition-colors duration-300 mb-3"
                >
                  <Mail size={16} />
                  <p>{business.email}</p>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <p>{business.address.full}</p>
                </div>
              </div>
              <div className="flex space-x-4 pt-4">
                {business.social?.facebook ? (
                  <a
                    href={business.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 hover:bg-[#ffc527] hover:text-black transition-all duration-300 rounded-lg"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                ) : null}
                {business.social?.instagram ? (
                  <a
                    href={business.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 hover:bg-[#ffc527] hover:text-black transition-all duration-300 rounded-lg"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} {business.brandName}. ALL RIGHTS
              RESERVED
            </p>
            <a
              href={business.parentOrg.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-[#ffc527] transition-colors tracking-wide font-medium"
            >
              Felicita Group Company
            </a>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2">
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors duration-300"
              >
                PRIVACY POLICY
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors duration-300"
              >
                TERMS & CONDITIONS
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
