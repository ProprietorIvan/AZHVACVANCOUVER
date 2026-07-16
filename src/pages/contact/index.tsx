import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { business } from "@/data/business";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/utils/seo";
import { Phone, Mail, Clock, MapPin, Send, Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { sendLeadToGetTimber } from "@/utils/sendLeadToGetTimber";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let emailSent = false;
    let leadSent = false;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        emailSent = true;
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        console.error("❌ Email failed:", errorData);
      }
    } catch (error) {
      console.error("❌ Error sending email:", error);
    }

    try {
      const leadResult = await sendLeadToGetTimber({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: "",
        message: formData.message,
        serviceType: "General Inquiry",
        leadSource: "AZ Air Conditioning Website - Contact Form",
        formPage: "/contact",
      });

      if (leadResult.success && leadResult.leadCreated) {
        leadSent = true;
      }
    } catch (error) {
      console.error("❌ Error sending lead to Get Timber:", error);
    }

    if (emailSent || leadSent) {
      setShowSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      alert(
        `There was an error submitting your message. Please try again or call us directly at ${business.phone.display}.`
      );
    }

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: business.phone.display,
      href: `tel:${business.phone.tel}`,
    },
    {
      icon: Mail,
      title: "Email",
      content: business.email,
      href: `mailto:${business.email}`,
    },
    {
      icon: Clock,
      title: "Hours",
      content: "24 hours a day, 7 days a week",
      href: null,
    },
    {
      icon: MapPin,
      title: "Address",
      content: business.address.full,
      href: "/service-areas",
    },
  ];

  const pageUrl = `${business.siteUrl}/contact`;
  const inputClass =
    "w-full px-4 py-3.5 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffc527] focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={`Contact ${business.brandName} Vancouver | ${business.legalName}`}
        description={`Contact ${business.brandName} for a custom HVAC quote in Vancouver. Call ${business.phone.display} or email ${business.email}.`}
        keywords="contact HVAC vancouver, AZ Air Conditioning contact"
        canonicalUrl={pageUrl}
        schemaGraph={[
          generateOrganizationSchema(),
          generateWebSiteSchema(),
          generateWebPageSchema(
            `Contact ${business.brandName}`,
            pageUrl,
            `Contact ${business.legalName} in Vancouver.`
          ),
          generateBreadcrumbSchema([
            { name: "Home", url: business.siteUrl },
            { name: "Contact", url: pageUrl },
          ]),
        ]}
      />
      <Navigation />

      {/* Hero with photo */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/photos/homepage/aircondtioning.png"
            alt={`Contact ${business.brandName} Vancouver`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#ffc527] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-3xl leading-tight mb-5">
            Ready to simplify heating & cooling?
          </h1>
          <p className="text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed mb-8">
            Tell us about your HVAC project — we&apos;ll follow up with a clear
            custom quote. No published rates, no surprises.
          </p>
          <a
            href={`tel:${business.phone.tel}`}
            className="inline-flex items-center gap-2 bg-[#ffc527] text-black px-7 py-3.5 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call {business.phone.display}
          </a>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#ffc527]" />
              <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
                Send a message
              </p>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Request a custom quote
            </h2>

            {showSuccess ? (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-10 flex flex-col items-center text-center min-h-[360px] justify-center">
                <div className="w-16 h-16 bg-[#ffc527] rounded-full flex items-center justify-center mb-5">
                  <Check className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Message sent
                </h3>
                <p className="text-gray-600 mb-8 max-w-sm">
                  Thanks for reaching out. We&apos;ll get back to you shortly
                  with next steps.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="bg-gray-900 text-white px-7 py-3 rounded-full font-semibold hover:bg-[#ffc527] hover:text-black transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Tell us about your project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={inputClass}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-[#ffc527] hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="relative h-56 rounded-2xl overflow-hidden">
              <Image
                src="/photos/homepage/heating.png"
                alt={`${business.brandName} Vancouver crew`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium">
                {business.brandName} — a proud brand of Felicita Holdings Ltd.
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map((item) => {
                const inner = (
                  <>
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#ffc527] shrink-0">
                      <item.icon className="w-5 h-5 text-black" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-0.5">
                        {item.title}
                      </p>
                      <p className="text-gray-900 font-medium break-words">
                        {item.content}
                      </p>
                    </div>
                  </>
                );

                if (item.href?.startsWith("/")) {
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#ffc527] transition-colors"
                    >
                      {inner}
                    </Link>
                  );
                }

                if (item.href) {
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#ffc527] transition-colors"
                    >
                      {inner}
                    </a>
                  );
                }

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-4 rounded-xl border border-gray-200"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>

            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 underline underline-offset-4 decoration-[#ffc527]"
            >
              See all service areas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </aside>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactUs;
