import { ChevronRight, Mail, Phone, Copy, Check } from "lucide-react";
import { useState } from "react";
import { trackPhoneClick, trackPhoneCopied } from "@/utils/analytics";

const Contact = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyToClipboard = async (text: string, isPhone: boolean) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isPhone) {
        trackPhoneCopied("contact_section");
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 1500);
      } else {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 1500);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-8">
          Have a question?
        </h3>
        <p className="text-lg sm:text-xl text-gray-500 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          Contact us today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8 text-base sm:text-lg px-4">
          <a
            href="tel:+17787705721"
            onClick={() => trackPhoneClick("contact_section", "contact")}
            className={`flex items-center justify-center px-6 sm:px-8 py-4 rounded-full transition-all duration-200 group ${
              copiedPhone
                ? "bg-green-600 text-white scale-95"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {copiedPhone ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-in fade-in duration-200" />
            ) : (
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            )}
            <span>{copiedPhone ? "Copied!" : "(778) 770-5721"}</span>
            {!copiedPhone && (
              <Copy className="w-4 h-4 sm:w-5 sm:h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            )}
          </a>

          <button
            onClick={() => copyToClipboard("info@azhandyman.ca", false)}
            className={`flex items-center justify-center px-6 sm:px-8 py-4 rounded-full transition-all duration-200 group ${
              copiedEmail
                ? "bg-green-600 text-white scale-95"
                : "bg-white text-gray-900 hover:bg-gray-50 shadow-sm"
            }`}
          >
            {copiedEmail ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-in fade-in duration-200" />
            ) : (
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            )}
            <span className="hidden sm:inline">
              {copiedEmail ? "Copied!" : "info@azhandyman.ca"}
            </span>
            <span className="sm:hidden">
              {copiedEmail ? "Copied!" : "Email Us"}
            </span>
            {!copiedEmail && (
              <Copy className="w-4 h-4 sm:w-5 sm:h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
