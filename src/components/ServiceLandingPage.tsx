import React, { useState } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Image from "next/image";
import { CheckCircle2, ArrowRight, Phone, Star } from "lucide-react";
import StickyCTA from "@/components/StickyCTA";
import CTAButton from "@/components/CTAButton";
import RelatedServices from "@/components/RelatedServices";
import { getGMBProfile } from "@/data/gmb-profiles";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import {
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateFAQPageSchema,
  generateWebPageSchema,
} from "@/utils/seo";

export interface ServiceLandingConfig {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  serviceType: string;
  breadcrumbName: string;
  features: { title: string; points: string[] }[];
  faqs: { question: string; answer: string }[];
  testimonials?: { name: string; role: string; text: string }[];
  heroImage?: string;
  /** Trust badge text under hero (e.g. "2-Hour Response | Licensed & Insured | 100% Satisfaction") */
  heroTrustBadge?: string;
  /** Value proposition cards */
  valueProps?: { title: string; description: string }[];
  /** Process steps/phases */
  processSteps?: { phase: string; title: string; time: string; points: string[] }[];
  /** Use simple 4-step process design (handyman-style) instead of detailed processSteps */
  useSimpleProcess?: boolean;
  /** Stats grid */
  stats?: { value: string; label: string }[];
  /** Rich intro content paragraph */
  introContent?: string;
  /** Show emergency banner */
  showEmergencyBanner?: boolean;
  /** Service area cities for SEO/local */
  serviceAreas?: string[];
}

const ServiceLandingPage = ({ config }: { config: ServiceLandingConfig }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    projectDetails: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      serviceType: config.serviceType,
      projectDetails: formData.projectDetails
        ? `${config.serviceType}: ${formData.projectDetails}`
        : config.serviceType,
    };
    try {
      const response = await fetch("/api/hvac_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        try {
          const { sendLeadToGetTimber } = await import("@/utils/sendLeadToGetTimber");
          await sendLeadToGetTimber({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            message: payload.projectDetails,
            serviceType: config.serviceType,
            leadSource: `AZ Air Conditioning Website - ${config.serviceType} Form`,
            formPage: `/${config.slug}`,
          });
        } catch {
          // Lead tracking is optional
        }
        setShowSuccess(true);
        setFormData({ name: "", phone: "", email: "", address: "", projectDetails: "" });
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit");
      }
    } catch (err) {
      console.error("Form submit error:", err);
      alert("There was an error submitting your request. Please try again or call (778) 770-5721.");
    }
  };

  const handleCall = () => {
    window.location.href = "tel:+17787705721";
  };

  const gmbProfile = getGMBProfile("hvac");
  const localBusinessSchema = gmbProfile ? generateLocalBusinessSchema(gmbProfile) : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://azhvac.ca/" },
    { name: config.breadcrumbName, url: `https://azhvac.ca/${config.slug}` },
  ]);
  const serviceSchema = generateServiceSchema(
    config.serviceType,
    config.metaDescription,
    "Vancouver"
  );
  const faqSchema = generateFAQPageSchema(config.faqs, `https://azhvac.ca/${config.slug}`);
  const webPageSchema = generateWebPageSchema(config.heroTitle, `https://azhvac.ca/${config.slug}`, config.metaDescription);

  const defaultTestimonials = [
    { name: "Chris Anderson", role: "Vancouver Homeowner", text: "Excellent service! Professional and knowledgeable. Highly recommend." },
    { name: "Michelle Brown", role: "Verified Customer", text: "Fast response and great work. Fair pricing and quality service." },
    { name: "Daniel Park", role: "Vancouver Homeowner", text: "Best HVAC company in Vancouver. Will use again." },
  ];
  const testimonials = config.testimonials || defaultTestimonials;

  const valueProps = config.valueProps ?? [
    { title: "2-Hour Emergency Response", description: "Our Vancouver-based team arrives within 2 hours for urgent HVAC failures. We prioritize emergencies and get your heating or cooling restored quickly." },
    { title: "Transparent Pricing", description: "Upfront quotes with no hidden fees. We explain every cost before starting work. No upselling—we recommend only what your system needs." },
    { title: "100% Satisfaction Guarantee", description: "Vancouver's trusted HVAC service with 100+ 5-star reviews. We stand behind every repair and installation." },
  ];

  const stats = config.stats ?? [
    { value: "750+", label: "VANCOUVER PROJECTS COMPLETED" },
    { value: "2hr", label: "EMERGENCY RESPONSE TIME" },
    { value: "24/7", label: "LOWER MAINLAND SERVICE" },
    { value: "100%", label: "SATISFACTION GUARANTEE" },
  ];

  return (
    <>
      <Head>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDescription} />
        <meta name="keywords" content={`${config.serviceType.toLowerCase()} vancouver, ${config.serviceType} vancouver bc, hvac vancouver`} />
        <link rel="canonical" href={`https://azhvac.ca/${config.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://azhvac.ca/${config.slug}`} />
        <meta property="og:title" content={config.metaTitle} />
        <meta property="og:description" content={config.metaDescription} />
        <meta property="og:image" content={`https://azhvac.ca${config.heroImage || "/photos/homepage/aircondtioning.png"}`} />
        <meta property="og:site_name" content="AZ Air Conditioning and Heating" />
        <meta property="og:locale" content="en_CA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://azhvac.ca/${config.slug}`} />
        <meta name="twitter:title" content={config.metaTitle} />
        <meta name="twitter:description" content={config.metaDescription} />
        <meta name="twitter:image" content={`https://azhvac.ca${config.heroImage || "/photos/homepage/aircondtioning.png"}`} />
        {localBusinessSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      </Head>

      <div className="min-h-screen bg-white">
        <StickyCTA phoneNumber="+17787705721" ctaText="Call Now" page={config.slug} />
        <Navigation transparent />

        {/* Hero */}
        <section className="relative pt-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                {config.heroTrustBadge && (
                  <div className="inline-block bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium mb-6">
                    {config.heroTrustBadge}
                  </div>
                )}
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">{config.heroTitle}</h1>
                <p className="text-xl text-gray-600 mb-6">{config.heroSubtitle}</p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-lg font-medium text-gray-700">4.9/5 Rating (100+ Reviews)</span>
                </div>
                <p className="text-gray-600 mb-8">Trusted by Vancouver homeowners & businesses</p>
                <CTAButton text="Get Free Quote - Call (778) 770-5721" onClick={handleCall} location="hero" page={config.slug} showPhoneIcon={true} />
              </div>
              <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
                <Image src={config.heroImage || "/photos/homepage/aircondtioning.png"} alt={config.serviceType} fill className="object-cover rounded-xl shadow-xl" priority />
              </div>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Vancouver {config.serviceType} Solutions</h2>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Comprehensive {config.serviceType.toLowerCase()} services for Vancouver homes and businesses
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {valueProps.map((vp, i) => (
                <div key={i} className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{vp.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{vp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Banner (optional) */}
        {config.showEmergencyBanner && (
          <section className="py-12 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Vancouver&apos;s 24/7 Emergency {config.serviceType} Team</h2>
              <p className="text-xl text-gray-300 mb-6">2-Hour Response Time • All Vancouver Areas</p>
              <CTAButton text="Call Now - (778) 770-5721" onClick={handleCall} location="banner" page={config.slug} showPhoneIcon={true} variant="secondary" />
            </div>
          </section>
        )}

        {/* Intro Content */}
        {config.introContent && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <p className="text-lg text-gray-700 leading-relaxed">{config.introContent}</p>
            </div>
          </section>
        )}

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Our {config.serviceType} Services</h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Professional solutions tailored to Vancouver&apos;s climate and your property needs
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {config.features.map((f, i) => (
                <div key={i} className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{f.title}</h3>
                  <ul className="space-y-3">
                    {f.points.map((p, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                        <span className="text-gray-700">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        {config.useSimpleProcess ? (
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <div className="inline-block bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded mb-6 mx-auto block text-center">
                SIMPLE • FAST • EFFICIENT
              </div>
              <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">OUR 4-STEP PROCESS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { num: 1, title: "CONTACT US", desc: "Call us directly or submit your HVAC needs through our online form" },
                  { num: 2, title: "DIAGNOSTIC VISIT", desc: "Our licensed technician identifies the issue and recommends solutions" },
                  { num: 3, title: "UPFRONT QUOTE", desc: "Get a detailed, transparent quote with no hidden fees" },
                  { num: 4, title: "EXPERT SERVICE", desc: "We complete the work with quality craftsmanship and clean up thoroughly" },
                ].map((step) => (
                  <div key={step.num} className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.num}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-600 text-sm mt-8">
                Fast response for emergencies • Same-day service available
              </p>
            </div>
          </section>
        ) : config.processSteps && config.processSteps.length > 0 ? (
          <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-4">Our Vancouver {config.serviceType} Process</h2>
              <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
                Professional {config.serviceType.toLowerCase()} timeline—from first call to completed service
              </p>
              <div className="space-y-8">
                {config.processSteps.map((step, i) => (
                  <div key={i} className="bg-white p-8 rounded-xl shadow-md border-l-4 border-gray-900">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="bg-gray-900 text-white px-4 py-1 rounded-full font-bold">{step.phase}</span>
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      <span className="text-gray-500 font-medium">{step.time}</span>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {step.points.map((p, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-gray-900 flex-shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Trust Stats */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">VANCOUVER&apos;S TRUSTED HVAC TEAM</h2>
            <p className="text-gray-300 text-center mb-12">Greater Vancouver&apos;s Emergency Response Experts</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">{s.value}</div>
                  <div className="text-sm text-gray-300 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-20 bg-gray-50" id="contactform">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Get Your Free Quote</h2>
            <p className="text-gray-600 text-center mb-8">2-hour response • Vancouver-wide service • No obligation</p>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address *</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Details</label>
                  <textarea name="projectDetails" value={formData.projectDetails} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900" placeholder="Describe your HVAC needs..." />
                </div>
                {showSuccess ? (
                  <div className="text-center py-8 text-green-600 font-medium">Thank you! We&apos;ll contact you shortly.</div>
                ) : (
                  <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">Submit Quote Request</button>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {gmbProfile && (
          <ServiceTestimonials reviews={testimonials} gmbProfile={gmbProfile} serviceName={config.serviceType} reviewCount={100} />
        )}

        <div className="bg-gray-50">
          <RelatedServices currentPage={config.slug} />
        </div>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-center mb-12">Learn about our Vancouver {config.serviceType.toLowerCase()} services</p>
            <div className="space-y-6">
              {config.faqs.map((faq, i) => (
                <details key={i} className="group bg-gray-50 rounded-xl p-6">
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-gray-500 group-open:rotate-90 transition-transform inline-block">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vancouver {config.serviceType}? We&apos;re Here 24/7</h2>
            <p className="text-xl text-gray-300 mb-8">Vancouver&apos;s trusted name in HVAC. Rapid response, lasting solutions.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+17787705721" className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
                <Phone className="w-5 h-5" />
                (778) 770-5721
              </a>
              <a href="#contactform" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-gray-900 transition-colors">
                Request Service
              </a>
            </div>
          </div>
        </section>

        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default ServiceLandingPage;
