import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface NavigationProps {
  currentPage?: string;
  showActions?: boolean;
  transparent?: boolean;
}

interface ContactButtonProps {
  textToCopy: string;
  displayText: string;
  href: string;
  icon: React.ReactNode;
  className?: string;
}

const ContactButton = ({
  textToCopy,
  displayText,
  href,
  icon,
  className = "",
}: ContactButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <a
      href={href}
      onClick={handleCopy}
      className={`relative flex items-center gap-3 w-full transition-colors ${className}`}
    >
      {icon}
      <div className="flex-1 min-w-0">
        <span className="block font-medium truncate">{displayText}</span>
      </div>
      <div
        className={`
        absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-gray-900 text-white text-xs whitespace-nowrap
        transition-all duration-200
        ${
          copied
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }
      `}
      >
        {copied ? "Copied!" : "Copy to clipboard"}
      </div>
    </a>
  );
};

const Navigation = ({
  currentPage,
  showActions = true,
  transparent = false,
}: NavigationProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomepage = router.pathname === "/" || router.pathname === "";
  const isDrywallPage = router.pathname === "/drywall";

  const phoneNumber = isDrywallPage ? "(778) 650-1965" : "(778) 770-5721";
  const phoneNumberClean = isDrywallPage ? "(778) 650-1965" : "(778) 770-5721";
  const email = "info@azhandyman.ca";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = isHomepage
    ? [{ text: "Services", url: "/services" }]
    : [
        { text: "Home", url: "/" },
        { text: "Services", url: "/services" },
      ];

  const navClasses = `
    w-full z-50 transition-all duration-300
    ${isHomepage ? "lg:absolute bg-white lg:bg-transparent" : "bg-white"}
    ${!isHomepage && isScrolled ? "shadow-lg" : ""}
    lg:fixed
  `;

  return (
    <nav className={navClasses}>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-36">
              <Image
                src="/logo.webp"
                alt="A-Z Handyman Vancouver"
                fill
                sizes="144px"
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Contact Info Bar - Always visible */}
        <div className="px-4 py-3 bg-gray-50">
          <div className="space-y-2">
            <ContactButton
              textToCopy={phoneNumber}
              displayText={phoneNumber}
              href={`tel:${phoneNumberClean}`}
              icon={
                <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-full">
                  <Phone className="w-5 h-5 text-white" />
                </div>
              }
              className="text-gray-900 hover:text-yellow-600"
            />
            <ContactButton
              textToCopy={email}
              displayText={email}
              href={`mailto:${email}`}
              icon={
                <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-full">
                  <Mail className="w-5 h-5 text-white" />
                </div>
              }
              className="text-gray-900 hover:text-yellow-600"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className="block px-4 py-3 text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex items-center">
            <div className="relative h-16 w-48">
              <Image
                src="/logo.webp"
                alt="A-Z Handyman Vancouver"
                fill
                sizes="192px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className={`text-base font-medium ${
                  isHomepage
                    ? "text-white hover:text-yellow-400"
                    : "text-gray-900 hover:text-yellow-600"
                } transition-colors`}
              >
                {link.text}
              </Link>
            ))}

            <div className="flex items-center gap-8 pl-8 border-l border-gray-200">
              <ContactButton
                textToCopy={phoneNumber}
                displayText={phoneNumber}
                href={`tel:${phoneNumberClean}`}
                icon={<Phone className="w-5 h-5" />}
                className={
                  isHomepage
                    ? "text-white hover:text-yellow-400"
                    : "text-gray-900 hover:text-yellow-600"
                }
              />
              <ContactButton
                textToCopy={email}
                displayText={email}
                href={`mailto:${email}`}
                icon={<Mail className="w-5 h-5" />}
                className={
                  isHomepage
                    ? "text-white hover:text-yellow-400"
                    : "text-gray-900 hover:text-yellow-600"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
