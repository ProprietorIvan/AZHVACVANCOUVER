import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import {
  Phone,
  ArrowRight,
  Ruler,
  Clock,
  CheckCircle2,
  Shield,
  Building2,
  Home,
  Check,
} from "lucide-react";
import Contact from "@/components/Contact";
import Image from "next/image";
import { Lead } from "@/utils/createLead";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import { getGMBProfile } from "@/data/gmb-profiles";
import {
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateFAQPageSchema,
  generateWebPageSchema,
} from "@/utils/seo";
import ScrollTracker from "@/components/ScrollTracker";
import TimeTracker from "@/components/TimeTracker";
import StickyCTA from "@/components/StickyCTA";
import CTAButton from "@/components/CTAButton";
import TrustBadges from "@/components/TrustBadges";
import {
  trackPageView,
  trackFormStarted,
  trackFormSubmission,
  trackFormSuccess,
  trackFormError,
  trackPhoneClick,
  trackCTAViewed,
  trackConversionComplete,
  trackFAQInteraction,
} from "@/utils/analytics";

// Drywall landing page - updated May 5, 2025 at 14:46
type CustomerType = "residential" | "commercial" | null;

interface FormData {
  name: string;
  phone: string;
  facilityType: string;
  projectSize: string;
  urgency: string;
  email: string;
  address: string;
  projectDetails: string;
}

const DrywallLandingPage = () => {
  const [customerType, setCustomerType] = useState<CustomerType>(null);
  const [facilityType, setFacilityType] = useState("");
  const [urgency, setUrgency] = useState("");
  const [projectSize, setProjectSize] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<
    Pick<FormData, "name" | "phone" | "email" | "address" | "projectDetails">
  >({
    name: "",
    phone: "",
    email: "",
    address: "",
    projectDetails: "",
  });
  const formStartedRef = useRef(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Track page view on mount
  useEffect(() => {
    trackPageView("drywall");
  }, []);

  // Track CTA viewed when it enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackCTAViewed("hero", "drywall");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    
    // Track form started on first field interaction
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackFormStarted("drywall", "drywall");
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track form submission
    trackFormSubmission("drywall", "drywall", {
      customer_type: customerType || "unknown",
      urgency: urgency || "unknown",
      facility_type: facilityType || "unknown",
    });

    const submissionData = {
      ...formData,
      customerType,
      facilityType,
      urgency,
      projectSize,
    };
    try {
      const newLead: Lead = {
        name: formData.name,
        date_Mjj7SnLm: new Date().toISOString(),
        lead_status: "New Lead",
        status_1_Mjj7KSmv:
          customerType === "commercial" ? "Commercial Form" : "Form Drywall",
        text_Mjj7Hg3c: `project details: ${formData.projectDetails},urgency: ${urgency}, customer type: ${customerType}, facility type: ${facilityType}, project size:${projectSize}`,
        numbers_Mjj7fpib: 0,
        job_location_mkm418ra: formData.address,
        lead_phone: formData.phone,
        lead_email: formData.email,
        status_1_Mjj77YUc: "Drywall Repair",
        status_1_Mjj7Dz0C: "No Payment Due",
        status_1_Mjj7nPIN: "Not Insurance",
      };
      fetch("/api/monday", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLead),
      });
    } catch (e) {
      console.warn(e);
    }
    try {
      // You can replace this with your actual API endpoint
      const response = await fetch("/api/drywall_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        // Track form success
        trackFormSuccess("drywall", "drywall", {
          customer_type: customerType || "unknown",
        });
        
        // Track conversion complete
        trackConversionComplete("drywall", "form_submission", {
          form_type: "drywall",
        });

        // Send lead to Get Timber webhook (with validation - gibberish won't be added)
        const { sendLeadToGetTimber } = await import("@/utils/sendLeadToGetTimber");
        await sendLeadToGetTimber({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          message: formData.projectDetails,
          facilityType: facilityType || "Residential",
          propertyType: customerType === "commercial" ? "Commercial" : "Residential",
          projectSize: projectSize,
          urgency: urgency,
          serviceType: "Drywall Repair",
          leadSource: "AZ Handyman Website - Drywall Form",
        });

        // Reset form
        setShowSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          projectDetails: "",
        });
        setCustomerType(null);
        setFacilityType("");
        setUrgency("");
        setProjectSize("");
        formStartedRef.current = false;
      } else {
        throw new Error("Failed to submit quote request");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      trackFormError("drywall", "drywall", error instanceof Error ? error.message : "Unknown error");
      alert("There was an error submitting your request. Please try again.");
    }
  };

  const handleEmergencyCall = (location: string = "hero") => {
    trackPhoneClick(location, "drywall");
    window.location.href = "tel:+17786501965";

    const yourhome = document.querySelector("#contactform");
    if (yourhome) {
      yourhome.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
  };

  const serviceFeatures = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Vancouver Experts",
      description: "Your local drywall repair specialists",
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      title: "Premium Solutions",
      description: "Industry-leading materials and techniques",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Fast Response",
      description: "2-hour response time guaranteed",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Certified Results",
      description: "Licensed and insured in Vancouver",
    },
  ];

  const serviceTypes = [
    {
      title: "Wall Repair",
      points: [
        "Water damage restoration",
        "Hole patching",
        "Crack repair",
        "Surface finishing",
      ],
    },
    {
      title: "Commercial Services",
      points: [
        "Office renovations",
        "Retail space repairs",
        "Industrial solutions",
        "Multi-unit projects",
      ],
    },
    {
      title: "Expert Finishing",
      points: [
        "Texture matching",
        "Paint blending",
        "Seamless repairs",
        "Premium materials",
      ],
    },
    {
      title: "Additional Services",
      points: [
        "Ceiling repairs",
        "Corner bead installation",
        "Sound insulation",
        "Complete remodels",
      ],
    },
  ];

  const facilityTypes = [
    "Office Building",
    "Retail Store",
    "Restaurant",
    "Warehouse",
    "Medical Facility",
    "Educational Institution",
    "Hotel/Hospitality",
    "Industrial Space",
  ];

  const gmbProfile = getGMBProfile("drywall");
  const drywallReviews = [
    {
      name: "Michael Chen",
      role: "Vancouver Homeowner",
      text: "Excellent drywall repair service! They patched multiple holes in my walls and the finish is flawless. You can't even tell there was damage. Professional, on-time, and reasonably priced.",
    },
    {
      name: "Sarah Johnson",
      role: "Commercial Property Owner",
      text: "AZ Drywall did an amazing job on our commercial office renovation. They handled a 5,000 sq ft space efficiently and the quality is outstanding. Highly recommend for any commercial project.",
    },
    {
      name: "David Park",
      role: "Home Renovation Client",
      text: "Water damage repair completed perfectly. They matched the texture exactly and the paint blend is seamless. Great communication throughout the project.",
    },
    {
      name: "Jennifer Martinez",
      role: "Verified Customer",
      text: "Fast response time and excellent workmanship. Fixed our ceiling cracks and did some wall repairs. Clean, professional, and affordable. Will definitely use again.",
    },
    {
      name: "Robert Kim",
      role: "Vancouver Homeowner",
      text: "Best drywall company in Vancouver! They completed our entire basement renovation including drywall installation, taping, and finishing. The results exceeded our expectations.",
    },
    {
      name: "Lisa Thompson",
      role: "Verified Customer",
      text: "Professional team that knows what they're doing. They repaired water-damaged drywall in our bathroom and it looks brand new. Very satisfied with the quality and service.",
    },
    {
      name: "Christopher Novak",
      role: "Vancouver Homeowner",
      text: "Highly recommend! They did an amazing job fixing a crack in my living room wall. Fast, professional, and affordable. Great experience with drywall repair in Vancouver.",
    },
    {
      name: "Shirley Badger",
      role: "Vancouver Homeowner",
      text: "Excellent work! Had a hole in my drywall from a plumbing repair, and they patched it up flawlessly. You can't even tell there was damage. Best drywall repair in Vancouver!",
    },
    {
      name: "Stunner mir",
      role: "Verified Customer",
      text: "Called for a few drywall holes after plumbing work—they were in and out in a day, super clean and professional.",
    },
    {
      name: "Murphy Kyrie",
      role: "Home Renovation Client",
      text: "Very impressed! Had a water-damaged ceiling, and they fixed it like new. If you need reliable drywall repair in Vancouver, this is the company to call.",
    },
    {
      name: "Yrouz",
      role: "Commercial Property Owner",
      text: "Top-notch service. Explained everything clearly, worked fast, and cleaned up perfectly. Definitely a trusted name for Vancouver drywall repair.",
    },
    {
      name: "Ivan vasquez",
      role: "Verified Customer",
      text: "They repaired several corners and re-mudded joints in our Vancouver condo. Smooth finish and zero tape lines.",
    },
  ];

  const localBusinessSchema = gmbProfile
    ? generateLocalBusinessSchema(gmbProfile)
    : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://az-handyman.ca/" },
    { name: "Drywall Repair", url: "https://az-handyman.ca/drywall" },
  ]);
  const serviceSchema = generateServiceSchema(
    "Drywall Repair and Installation",
    "Professional drywall repair, installation, and finishing services in Vancouver. Expert texture matching, water damage restoration, and commercial drywall solutions.",
    "Vancouver"
  );

  const faqs = [
    {
      question: "What sizes of drywall projects do you handle?",
      answer:
        "We handle projects of all sizes - from small residential repairs like patching holes and fixing cracks to complete commercial buildouts for retail, office, and industrial spaces. No job is too small or too big for our expert team.",
    },
    {
      question: "What is your process for drywall projects?",
      answer:
        "Our streamlined process includes: 1) Submit your request with details and photos, 2) We assess via video call or in-person visit by a project manager, 3) You receive a detailed quote, and 4) Once approved, our professional team begins work on your project.",
    },
    {
      question: "How quickly can you respond to emergency repairs?",
      answer:
        "We guarantee a 2-hour response time for emergency services across Vancouver and the Lower Mainland. Our team is available to handle urgent drywall repairs when you need them most.",
    },
    {
      question: "Do you provide warranties on your work?",
      answer:
        "Yes, all our drywall services come with a satisfaction guarantee and workmanship warranty. We stand behind our quality and ensure your complete satisfaction with every project we complete.",
    },
  ];

  const faqPageSchema = generateFAQPageSchema(
    faqs,
    "https://az-handyman.ca/drywall"
  );
  const webPageSchema = generateWebPageSchema(
    "Vancouver Drywall Repair | AZ Drywall Patch & Repair",
    "https://az-handyman.ca/drywall",
    "Vancouver's #1 drywall repair service. Expert drywall installation, patching, and finishing. 500+ projects completed. 2-hour response time. Licensed & insured."
  );

  return (
    <>
      <Head>
        <title>Vancouver Drywall Repair | AZ Drywall Patch & Repair | Top Rated</title>
        <meta
          name="description"
          content="Vancouver's #1 drywall repair service. Expert drywall installation, patching, and finishing. 500+ projects completed. 2-hour response time. Licensed & insured. Get your free quote today!"
        />
        <meta
          name="keywords"
          content="vancouver drywall repair, drywall installation vancouver, drywall patching, drywall finishing, commercial drywall vancouver, water damage drywall repair, texture matching vancouver"
        />
        <link rel="canonical" href="https://az-handyman.ca/drywall" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://az-handyman.ca/drywall" />
        <meta
          property="og:title"
          content="Vancouver Drywall Repair | AZ Drywall Patch & Repair | Top Rated"
        />
        <meta
          property="og:description"
          content="Vancouver's #1 drywall repair service. Expert drywall installation, patching, and finishing. 500+ projects completed. Licensed & insured."
        />
        <meta
          property="og:image"
          content="https://az-handyman.ca/photos/homepage/2.jpg"
        />
        <meta
          property="og:image:alt"
          content="Professional drywall repair and installation services in Vancouver - Expert texture matching and commercial drywall solutions"
        />
        <meta property="og:site_name" content="A-Z Handyman" />
        <meta property="og:locale" content="en_CA" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://az-handyman.ca/drywall" />
        <meta name="twitter:site" content="@azhandyman" />
        <meta name="twitter:creator" content="@azhandyman" />
        <meta
          name="twitter:title"
          content="Vancouver Drywall Repair | AZ Drywall Patch & Repair | Top Rated"
        />
        <meta
          name="twitter:description"
          content="Vancouver's #1 drywall repair service. Expert drywall installation, patching, and finishing. 500+ projects completed. 2-hour response time. Get your free quote today!"
        />
        <meta
          name="twitter:image"
          content="https://az-handyman.ca/photos/homepage/2.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="Professional drywall repair and installation services in Vancouver"
        />

        {/* Mobile & Theme */}
        <meta name="theme-color" content="#111827" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AZ Drywall" />

        {/* Geo Tags */}
        <meta name="geo.region" content="CA-BC" />
        <meta name="geo.placename" content="Vancouver" />
        <meta name="geo.position" content="49.2827;-123.1207" />
        <meta name="ICBM" content="49.2827, -123.1207" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="A-Z Handyman" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        {/* Structured Data */}
        {localBusinessSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(localBusinessSchema),
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webPageSchema),
          }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        <ScrollTracker page="drywall" />
        <TimeTracker page="drywall" />
        <StickyCTA
          phoneNumber="+17786501965"
          ctaText="Call Now"
          page="drywall"
        />
        <Navigation transparent />

      {/* Hero Section */}
      <section className="relative pt-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 bg-grid-gray-100 bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row gap-12 items-center py-16">
            <div className="w-full md:w-1/2">
              <div className="inline-block bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
                #1 Drywall Service in Lower Mainland
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
                Premium Drywall Solutions.
                <span className="block text-gray-900">Guaranteed Results.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Vancouver&apos;s most trusted drywall specialists with over 7
                years of experience. Professional service for residential and
                commercial clients.
              </p>

              <div ref={ctaRef}>
                <CTAButton
                  text="Get Instant Quote - No Obligation"
                  onClick={() => handleEmergencyCall("hero")}
                  location="hero"
                  page="drywall"
                  showPhoneIcon={true}
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="relative h-[600px] w-full">
                <Image
                  src="/photos/homepage/2.jpg"
                  alt="Vancouver drywall repair specialists - Professional drywall installation, patching, and finishing services"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-xl brightness-105 contrast-105"
                  priority
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-black/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Bold Power Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg text-lg font-bold mb-6">
              #1 DRYWALL SPECIALISTS IN LOWER MAINLAND
            </div>
            <h2 className="text-6xl font-extrabold mb-6 text-gray-900">
              500+ PROJECTS COMPLETED
            </h2>
            <p className="text-2xl text-gray-800 max-w-3xl mx-auto font-medium">
              From small repairs to full commercial buildouts — we deliver
              excellence at every scale
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900 text-white p-10 rounded-xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gray-800 rounded-full -mt-20 -mr-20"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-6">
                  <div className="bg-white text-gray-900 p-4 rounded-xl">
                    <Building2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold">PROVEN TRACK RECORD</h3>
                </div>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                    <span>
                      <strong>500+ projects</strong> successfully completed
                      throughout Lower Mainland
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                    <span>
                      <strong>100% satisfaction</strong> guaranteed on every
                      job, regardless of size
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                    <span>
                      <strong>Extensive portfolio</strong> spanning residential
                      & commercial sectors
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900 text-white p-10 rounded-xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gray-800 rounded-full -mt-20 -mr-20"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-6">
                  <div className="bg-white text-gray-900 p-4 rounded-xl">
                    <Ruler className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold">
                    ANY SIZE. ANY CHALLENGE.
                  </h3>
                </div>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                    <span>
                      <strong>No job too small</strong> — from single hole
                      repairs to entire buildings
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                    <span>
                      <strong>Scalable workforce</strong> to handle projects of
                      any magnitude
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                    <span>
                      <strong>Solutions for every need</strong> — residential to
                      large-scale commercial
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Direct and Powerful */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold mb-6 text-gray-900 uppercase">
              WE HANDLE IT ALL.
            </h2>
          </div>

          <div className="bg-white p-10 rounded-xl shadow-lg mb-10">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="bg-gray-900 text-white p-5 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-14 h-14"
                >
                  <path d="M2 20h20M2 4h20M4 4v16M20 4v16M7 9h4M7 14h4M15 9h2M15 14h2" />
                </svg>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2 uppercase">
                  FROM SMALL HOLES TO FULL BUILDOUTS
                </h3>
                <p className="text-xl text-gray-700">
                  Whether you need a simple patch or a complete commercial
                  installation — we deliver the same level of excellence on
                  every project.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-3">
                <div className="bg-gray-200 p-2 rounded-lg h-fit">
                  <CheckCircle2 className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">
                    Residential Repairs
                  </h4>
                  <p className="text-gray-700">
                    Quick fixes for holes, cracks, water damage
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-gray-200 p-2 rounded-lg h-fit">
                  <CheckCircle2 className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">
                    Full Room Renovations
                  </h4>
                  <p className="text-gray-700">
                    Complete residential room transformations
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-gray-200 p-2 rounded-lg h-fit">
                  <CheckCircle2 className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Commercial Spaces</h4>
                  <p className="text-gray-700">
                    Office buildings, retail, restaurants, multi-unit
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-gray-200 p-2 rounded-lg h-fit">
                  <CheckCircle2 className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">
                    Industrial Projects
                  </h4>
                  <p className="text-gray-700">
                    Warehouses, factories, large-scale installations
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-md flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase">
                RESIDENTIAL
              </h3>
              <ul className="space-y-3 mb-6 flex-1">
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Hole repairs</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Water damage restoration</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Crack remediation</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Ceiling repairs</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase">
                COMMERCIAL
              </h3>
              <ul className="space-y-3 mb-6 flex-1">
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Office buildouts</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Retail renovations</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Multi-unit developments</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Restaurant conversions</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase">
                SPECIALIZED
              </h3>
              <ul className="space-y-3 mb-6 flex-1">
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Texture matching</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Sound insulation</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Corner bead installation</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Complete remodels</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="#contactform"
              className="inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-gray-800 transition-all duration-300"
            >
              <span>GET YOUR QUOTE NOW</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Our Process Section - Enhanced */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-gray-900 text-white px-5 py-2 rounded-lg text-md font-bold uppercase mb-4">
              Simple • Fast • Efficient
            </div>
            <h2 className="text-5xl font-extrabold mb-4 text-gray-900">
              OUR 4-STEP PROCESS
            </h2>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -mt-px z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-gray-900 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gray-900 text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  SUBMIT REQUEST
                </h3>
                <p className="text-gray-700">
                  Send us your project details and photos through our form or
                  call us directly
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-gray-900 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gray-900 text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  GET ASSESSED
                </h3>
                <p className="text-gray-700">
                  We typically evaluate from photos. For complex projects, we
                  may arrange a video call or send a project manager on-site
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-gray-900 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gray-900 text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  RECEIVE QUOTE
                </h3>
                <p className="text-gray-700">
                  Get a detailed, transparent quote based on your specific
                  requirements
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-gray-900 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gray-900 text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold mb-6">
                  4
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  WORK BEGINS
                </h3>
                <p className="text-gray-700">
                  Our team arrives fully equipped to start your project
                  immediately
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 text-lg">
              Most projects begin within 4 days of initial request
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}

      <section className="pt-8 pb-20 bg-white" id="contactform">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              Let&apos;s Begin.
            </h2>
            <p className="text-lg text-gray-600">
              2-hour response • Vancouver-wide service
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Property Type Selection */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setCustomerType("residential")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    customerType === "residential"
                      ? "border-gray-900 bg-gray-900/5"
                      : "border-gray-200 hover:border-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Home
                      className={`w-5 h-5 ${
                        customerType === "residential"
                          ? "text-gray-900"
                          : "text-gray-600"
                      }`}
                    />
                    <div>
                      <h3
                        className={`text-lg font-semibold mb-1 ${
                          customerType === "residential"
                            ? "text-gray-900"
                            : "text-gray-900"
                        }`}
                      >
                        Residential
                      </h3>
                      <p className="text-sm text-gray-600">Home repairs</p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCustomerType("commercial")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    customerType === "commercial"
                      ? "border-gray-900 bg-gray-900/5"
                      : "border-gray-200 hover:border-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2
                      className={`w-5 h-5 ${
                        customerType === "commercial"
                          ? "text-gray-900"
                          : "text-gray-600"
                      }`}
                    />
                    <div>
                      <h3
                        className={`text-lg font-semibold mb-1 ${
                          customerType === "commercial"
                            ? "text-gray-900"
                            : "text-gray-900"
                        }`}
                      >
                        Commercial
                      </h3>
                      <p className="text-sm text-gray-600">
                        Business solutions
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Contact Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {customerType === "commercial" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Facility Type *
                    </label>
                    <select
                      name="facilityType"
                      value={facilityType}
                      onChange={(e) => {
                        setFacilityType(e.target.value);
                        handleInputChange(e);
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      required
                    >
                      <option value="">Select facility type</option>
                      {facilityTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Project Size (sq ft) *
                    </label>
                    <input
                      type="number"
                      name="projectSize"
                      value={projectSize}
                      onChange={(e) => {
                        setProjectSize(e.target.value);
                        handleInputChange(e);
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Enter approximate square footage"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Urgency *
                    </label>
                    <select
                      name="urgency"
                      value={urgency}
                      onChange={(e) => {
                        setUrgency(e.target.value);
                        handleInputChange(e);
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      required
                    >
                      <option value="">Select urgency level</option>
                      <option value="emergency">
                        Emergency (Need immediate attention)
                      </option>
                      <option value="urgent">Urgent (Within 24 hours)</option>
                      <option value="standard">Standard (Within a week)</option>
                      <option value="planned">
                        Planned Project (Flexible timing)
                      </option>
                    </select>
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email *
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Property Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Project Details
                </label>
                <textarea
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Please describe your project requirements..."
                ></textarea>
              </div>
              {showSuccess ? (
                <SuccessScreen
                  email={formData.email}
                  setShowSuccess={setShowSuccess}
                />
              ) : (
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
                >
                  Submit Quote Request
                </button>
              )}
              <p className="text-sm text-gray-600 text-center">
                2-hour response • Expert service • Vancouver certified
              </p>
            </form>
          </div>
        </div>

        {/* Trust Badges Section */}
        <TrustBadges showCertifications={false} showResponseTime={true} />

        {/* Testimonials Section */}
        {gmbProfile && (
          <ServiceTestimonials
            reviews={drywallReviews}
            gmbProfile={gmbProfile}
            serviceName="Drywall Repair"
            reviewCount={127}
          />
        )}

        <Contact />
      </section>

      {/* Results Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Expert Drywall Services
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                From small patch repairs to complete build-outs, our team
                delivers professional drywall solutions throughout the Lower
                Mainland with precision and attention to detail.
              </p>
              <ul className="space-y-4">
                {[
                  "Residential and commercial expertise",
                  "Fully licensed and insured team",
                  "Premium materials and finishes",
                  "100% satisfaction guarantee",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gray-900" />
                    <span className="text-gray-600 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[500px]">
              <Image
                src="/photos/homepage/1.jpg"
                alt="Professional drywall repair and installation services in Vancouver, BC - Expert texture matching and water damage restoration"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-xl brightness-105 contrast-105"
                priority
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-black/10" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Common Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our drywall services
            </p>
          </div>

          <article className="space-y-6">
            {faqs.map((faq, index) => {
              const [isExpanded, setIsExpanded] = useState(false);
              
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    if (!isExpanded) {
                      trackFAQInteraction(faq.question, "drywall", "expanded");
                    }
                    setIsExpanded(!isExpanded);
                  }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {faq.question}
                  </h3>
                  {isExpanded && (
                    <p className="text-gray-600">{faq.answer}</p>
                  )}
                </div>
              );
            })}
          </article>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Lower Mainland&apos;s Leading Drywall Specialists
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            500+ successful projects completed with excellent customer
            satisfaction
          </p>
          <CTAButton
            text="Start Your Project Now - Free Quote"
            onClick={() => handleEmergencyCall("bottom")}
            location="bottom"
            page="drywall"
            variant="secondary"
            showPhoneIcon={true}
          />
        </div>
      </section>
      </div>
    </>
  );
};

const SuccessScreen = ({
  email,
  setShowSuccess,
}: {
  email: string;
  setShowSuccess: (p: false) => void;
}) => {
  return (
    <div className="p-8 flex flex-col items-center justify-center space-y-6 min-h-[400px]">
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
        <Check className="w-8 h-8 text-green-500" />
      </div>
      <h3 className="text-2xl font-medium text-gray-900">Message received</h3>

      <div className="space-y-2 text-center">
        <p className="text-gray-600">We&apos;ll get back to you shortly</p>
        <p className="text-gray-500 text-sm">
          Response will be sent to your email
        </p>
      </div>

      <button
        onClick={() => {
          setShowSuccess(false);
        }}
        className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-[#ffc527] hover:text-black"
      >
        Done
      </button>
    </div>
  );
};

export default DrywallLandingPage;
