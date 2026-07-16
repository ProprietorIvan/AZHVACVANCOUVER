import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import Testemonials from "@/components/Testemonials";
import { business } from "@/data/business";
import { gmbProfiles } from "@/data/gmb-profiles";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
  generateFAQPageSchema,
} from "@/utils/seo";
import { homepageFAQs } from "@/data/serviceFAQs";
import {
  Camera,
  Calendar,
  FileText,
  Shield,
  Activity,
  ThumbsUp,
  ArrowRight,
  ExternalLink,
  Phone,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WhyChooseUs = () => {
  const pageUrl = `${business.siteUrl}/why-chose-us`;
  const description = `${business.legalName} d.b.a. ${business.brandName} — licensed, insured Vancouver HVAC since ${business.foundedYear}. Custom quotes, no surprises.`;

  const gmbReviewLinks = Array.from(
    new Map(
      Object.values(gmbProfiles).map((profile) => [
        profile.gmbUrl,
        profile.businessName,
      ])
    ).entries()
  );

  const solutions = [
    {
      title: "Licensed & Insured",
      description:
        "Fully licensed, bonded, and insured crews on every job across Greater Vancouver.",
      icon: Shield,
    },
    {
      title: "Custom Written Quotes",
      description:
        "Every job is different. You get a clear written estimate before work begins — no published rates, no surprises.",
      icon: FileText,
    },
    {
      title: "Fast Scheduling",
      description:
        "Same-day and next-day appointments across Greater Vancouver when capacity allows.",
      icon: Calendar,
    },
    {
      title: "Photo-Based Quotes",
      description:
        "Send photos for faster estimates on many repair types — we confirm scope before we book.",
      icon: Camera,
    },
    {
      title: "Progress Updates",
      description: "Stay informed from quote through completion.",
      icon: Activity,
    },
    {
      title: "Satisfaction Guarantee",
      description: "We stand behind our work on every project.",
      icon: ThumbsUp,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Tell us about your project",
      description: "Call, fill out the form, or send photos of the issue.",
    },
    {
      number: "02",
      title: "Get a clear custom quote",
      description: "We confirm scope, timing, and pricing in writing upfront.",
    },
    {
      number: "03",
      title: "Book your service",
      description: "Pick a time that works — we arrive prepared.",
    },
    {
      number: "04",
      title: "Get it fixed",
      description: "Licensed technicians complete the job and clean up.",
    },
  ];

  const stats = [
    {
      value: `${business.aggregateRating.reviewCount}+`,
      label: "GOOGLE REVIEWS",
    },
    { value: business.projectsCompleted, label: "PROJECTS COMPLETED" },
    {
      value: business.aggregateRating.ratingValue,
      label: "AVERAGE RATING",
    },
    {
      value: String(new Date().getFullYear() - business.foundedYear),
      label: "YEARS IN BUSINESS",
    },
  ];

  const projects = [
    {
      src: "/photos/homepage/aircondtioning.png",
      alt: "AC installation by AZ Air Conditioning Vancouver",
    },
    {
      src: "/photos/homepage/heating.png",
      alt: "Furnace repair Vancouver",
    },
    {
      src: "/photos/homepage/boiler.png",
      alt: "Heat pump installation Greater Vancouver",
    },
    {
      src: "/photos/homepage/Duct-lessminisplit.png",
      alt: "Ductless mini-split installation Vancouver",
    },
    {
      src: "/photos/homepage/hvacmaintance.png",
      alt: "HVAC maintenance service Vancouver",
    },
    {
      src: "/photos/homepage/24/7-response.png",
      alt: "24/7 emergency HVAC Greater Vancouver",
    },
  ];

  const schemaGraph = [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    generateWebPageSchema(
      `About ${business.brandName} — Vancouver`,
      pageUrl,
      description
    ),
    generateBreadcrumbSchema([
      { name: "Home", url: business.siteUrl },
      { name: "About Us", url: pageUrl },
    ]),
    generateHowToSchema(
      `How to book HVAC service with ${business.brandName}`,
      "Our four-step process from request to completed service.",
      steps.map((s) => ({ name: s.title, text: s.description }))
    ),
    generateFAQPageSchema(homepageFAQs, pageUrl),
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEOHead
        title={`About Us — ${business.brandName} Vancouver | ${business.legalName}`}
        description={description}
        keywords="about AZ HVAC, Felicita Holdings, licensed HVAC Vancouver"
        canonicalUrl={pageUrl}
        schemaGraph={schemaGraph}
      />
      <Navigation />

      <main>
        {/* Split hero — matches drywall/service pages */}
        <section className="relative pt-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center py-16">
              <div className="w-full md:w-1/2">
                <div className="inline-block bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
                  Serving Greater Vancouver since {business.foundedYear}
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                  {business.brandName}.
                  <span className="block text-gray-900">Done right.</span>
                </h1>
                <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                  A happy{" "}
                  <a
                    href={business.parentOrg.url}
                    className="font-semibold text-gray-900 underline underline-offset-4 decoration-[#ffc527] hover:text-black"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Felicita Holdings Ltd.
                  </a>{" "}
                  company — licensed heating and cooling for homeowners and
                  businesses across the GVA.
                </p>
                <p className="text-gray-500 mb-8">
                  {business.address.full} · {business.phone.display}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-gray-900 text-white px-7 py-4 rounded-full font-semibold hover:bg-[#ffc527] hover:text-black transition-colors"
                  >
                    Get a Free Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`tel:${business.phone.tel}`}
                    className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-7 py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {business.phone.display}
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative h-[420px] md:h-[560px] w-full">
                  <Image
                    src="/photos/homepage/aircondtioning.png"
                    alt={`${business.brandName} team serving Greater Vancouver`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-xl"
                    priority
                  />
                  <div className="absolute inset-0 rounded-xl ring-1 ring-black/10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why choose us + photo */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative h-[400px] lg:h-[520px] order-2 lg:order-1">
                <Image
                  src="/photos/homepage/heating.png"
                  alt="Licensed HVAC technician at work in Vancouver"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover rounded-xl"
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-black/10" />
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px w-12 bg-[#ffc527]" />
                  <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
                    Why choose us
                  </p>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Clear communication. Licensed crews. Custom quotes.
                </h2>
                <ul className="space-y-4">
                  {[
                    "Written estimates before any work starts",
                    "Licensed & insured on every job site",
                    "Photo-based quotes for faster turnaround",
                    `${business.aggregateRating.reviewCount}+ five-star Google reviews across the GVA`,
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#ffc527] mt-0.5 shrink-0" />
                      <span className="text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((solution) => (
                <div
                  key={solution.title}
                  className="bg-gray-50 rounded-xl p-7 hover:bg-gray-900 hover:text-white transition-colors group"
                >
                  <solution.icon className="w-8 h-8 text-[#ffc527] mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-white">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/80 leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process — dark panel like homepage metrics */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <header className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                FIX YOUR HVAC IN 4 SIMPLE STEPS
              </h2>
              <div className="flex items-center justify-center mb-4">
                <div className="h-px w-12 bg-[#ffc527]" />
                <p className="text-white/80 mx-4">From request to finished job</p>
                <div className="h-px w-12 bg-[#ffc527]" />
              </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <article key={step.number} className="relative text-center md:text-left">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-[60%] right-0 h-px bg-[#ffc527]/40" />
                  )}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ffc527] text-black font-bold text-lg mb-5">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-900 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
              {stats.map((stat) => (
                <article key={stat.label} className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="h-px w-12 bg-[#ffc527] mx-auto mb-3" />
                  <div className="text-xs sm:text-sm text-white/70 tracking-wider">
                    {stat.label}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Project gallery */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <header className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                RECENT PROJECTS
              </h2>
              <div className="flex items-center justify-center">
                <div className="h-px w-12 bg-[#ffc527]" />
                <p className="mx-4 text-gray-600">A small gallery of our work</p>
                <div className="h-px w-12 bg-[#ffc527]" />
              </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.src}
                  className="group relative overflow-hidden rounded-xl h-64"
                >
                  <Image
                    src={project.src}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Google profiles */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px w-12 bg-[#ffc527]" />
                  <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
                    Reviews
                  </p>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  Google reviews & profiles
                </h2>
                <p className="text-gray-600 max-w-xl">
                  Read verified reviews across our service-specific Google
                  Business profiles.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-[#ffc527] hover:text-black transition-colors self-start"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gmbReviewLinks.map(([url, name]) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 px-5 py-5 bg-white border border-gray-200 rounded-xl hover:border-[#ffc527] shadow-sm hover:shadow-md transition-all"
                >
                  <span className="text-sm font-semibold text-gray-900">
                    {name}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#ffc527] shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <Testemonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default WhyChooseUs;
