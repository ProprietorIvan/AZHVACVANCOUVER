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

const BurnabyDrywallLandingPage = () => {
  const [customerType, setCustomerType] = useState<CustomerType>(null);
  const [facilityType, setFacilityType] = useState("");
  const [urgency, setUrgency] = useState("");
  const [projectSize, setProjectSize] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<Pick<FormData, "name"|"phone"|"email"|"address"|"projectDetails">>({
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
    trackPageView("burnaby-drywall");
  }, []);

  // Track CTA viewed when it enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackCTAViewed("hero", "burnaby-drywall");
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
      trackFormStarted("burnaby-drywall", "burnaby-drywall");
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track form submission
    trackFormSubmission("burnaby-drywall", "burnaby-drywall", {
      customer_type: customerType || "unknown",
      urgency: urgency || "unknown",
      facility_type: facilityType || "unknown",
      project_size: projectSize || "unknown",
    });

    const submissionData = {
      ...formData,
      customerType,
      facilityType,
      urgency,
      projectSize,
    };

    try{
      const newLead:Lead = {
        name: formData.name,
        date_Mjj7SnLm: new Date().toISOString(),
        lead_status: "New Lead",
        status_1_Mjj7KSmv: customerType === 'commercial'? "Commercial Form":"Form Drywall Burnaby",
        text_Mjj7Hg3c: `project details: ${formData.projectDetails},urgency: ${urgency}, customer type: ${customerType}, facility type: ${facilityType}, project size:${projectSize}`,
        numbers_Mjj7fpib: 0,
        job_location_mkm418ra: formData.address,
        lead_phone: formData.phone,
        lead_email: formData.email,
        status_1_Mjj77YUc: 'Drywall Repair',
        status_1_Mjj7Dz0C: "No Payment Due",
        status_1_Mjj7nPIN: "Not Insurance"
      }
      fetch("/api/monday", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLead),
      });
    }catch(e){
      console.warn(e)
    }
    try {

      // Replace this with your actual API endpoint
      const response = await fetch("/api/drywall_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        // Track form success
        trackFormSuccess("burnaby-drywall", "burnaby-drywall", {
          customer_type: customerType || "unknown",
        });
        
        // Track conversion complete
        trackConversionComplete("burnaby-drywall", "form_submission", {
          form_type: "burnaby-drywall",
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
          leadSource: "AZ Handyman Website - Burnaby Drywall Form",
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
      trackFormError("burnaby-drywall", "burnaby-drywall", error instanceof Error ? error.message : "Unknown error");
      alert("There was an error submitting your request. Please try again.");
    }
  };

  const handleEmergencyCall = (location: string = "hero") => {
    trackPhoneClick(location, "burnaby-drywall");
    window.location.href = "tel:+17786534862";
    
    const yourhome = document.querySelector("#contactform");
    if (yourhome) {
      yourhome.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
  };

  // SEO-friendly data:
  const pageTitle = "Burnaby's Premier Drywall Experts | Fast & Reliable Repairs";
  const pageDescription =
    "Looking for top drywall repair and installation services in Burnaby? Our certified team guarantees 2-hour response times and exceptional workmanship.";

  const serviceFeatures = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Burnaby Experts",
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
      description: "Licensed and insured in Burnaby",
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

  const gmbProfile = getGMBProfile("burnaby-drywall");
  const burnabyReviews = [
    {
      name: "Amanda Wilson",
      role: "Burnaby Homeowner",
      text: "Rockewell Drywall did an excellent job repairing water damage in our Burnaby home. They matched the texture perfectly and the work was completed quickly. Very professional team!",
    },
    {
      name: "James Liu",
      role: "Commercial Property Owner",
      text: "Outstanding service for our commercial space in Burnaby. They handled a large drywall installation project efficiently and the finish quality is top-notch. Highly recommend!",
    },
    {
      name: "Maria Rodriguez",
      role: "Verified Customer",
      text: "Fast response and excellent workmanship. Fixed multiple holes and cracks in our walls. The texture matching was perfect and you can't tell there was any damage. Great value!",
    },
    {
      name: "Kevin Park",
      role: "Burnaby Homeowner",
      text: "Professional drywall repair service in Burnaby. They completed our basement renovation including all drywall work. Clean, efficient, and reasonably priced. Will use again!",
    },
    {
      name: "Rachel Chen",
      role: "Verified Customer",
      text: "Best drywall company in Burnaby! They repaired our ceiling after a leak and the results are flawless. Great communication and excellent quality work.",
    },
    {
      name: "Tom Anderson",
      role: "Commercial Property Owner",
      text: "Excellent service for our office renovation. Rockewell handled the drywall installation and finishing professionally. On-time completion and great attention to detail.",
    },
    {
      name: "kapUSta",
      role: "Verified Customer",
      text: "Needed some drywall work after a renovation, and the team exceeded my expectations. Smooth finish and seamless blending. Great option for Burnaby drywall repair.",
    },
    {
      name: "Viktoriia Belova",
      role: "Verified Customer",
      text: "Best team I've used for Burnaby drywall repair. Punctual, professional, and no mess left behind. Will definitely call again.",
    },
  ];

  const localBusinessSchema = gmbProfile
    ? generateLocalBusinessSchema(gmbProfile)
    : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://az-handyman.ca/" },
    { name: "Burnaby Drywall Repair", url: "https://az-handyman.ca/burnaby-drywall" },
  ]);
  const serviceSchema = generateServiceSchema(
    "Drywall Repair and Installation",
    "Professional drywall repair and installation services in Burnaby, BC. Expert texture matching, water damage restoration, and commercial drywall solutions.",
    "Burnaby"
  );

  const faqs = [
    {
      question: "What areas in Burnaby do you serve?",
      answer:
        "We serve all areas of Burnaby including Metrotown, Brentwood, Lougheed, Edmonds, and surrounding neighborhoods. Our team is familiar with Burnaby's building codes and regulations, ensuring all work meets local standards.",
    },
    {
      question: "How quickly can you respond to drywall repairs in Burnaby?",
      answer:
        "We guarantee a 2-hour response time for emergency drywall repairs throughout Burnaby. Our team is strategically located to provide fast service to residential and commercial properties across the city.",
    },
    {
      question: "Do you handle both residential and commercial drywall projects?",
      answer:
        "Yes! We specialize in both residential and commercial drywall services in Burnaby. From single-room repairs to complete office buildouts, we have the expertise and resources to handle projects of any size.",
    },
    {
      question: "What is included in your drywall repair service?",
      answer:
        "Our comprehensive service includes assessment, material selection, professional installation or repair, texture matching, sanding, and cleanup. We ensure seamless results that match your existing walls perfectly.",
    },
  ];

  const faqPageSchema = generateFAQPageSchema(
    faqs,
    "https://az-handyman.ca/burnaby-drywall"
  );
  const webPageSchema = generateWebPageSchema(
    "Burnaby Drywall Repair | Rockewell Drywall Repair | Expert Service",
    "https://az-handyman.ca/burnaby-drywall",
    "Looking for top drywall repair and installation services in Burnaby? Our certified team guarantees 2-hour response times and exceptional workmanship."
  );

  return (
    <>
      <Head>
        <title>Burnaby Drywall Repair | Rockewell Drywall Repair | Expert Service</title>
        <meta
          name="description"
          content="Burnaby's trusted drywall repair specialists. Expert drywall installation, patching, and finishing. Commercial and residential services. Licensed & insured. Free quotes!"
        />
        <meta
          name="keywords"
          content="burnaby drywall repair, drywall installation burnaby, drywall patching burnaby bc, commercial drywall burnaby, drywall finishing burnaby, water damage drywall repair burnaby"
        />
        <link rel="canonical" href="https://az-handyman.ca/burnaby-drywall" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://az-handyman.ca/burnaby-drywall" />
        <meta
          property="og:title"
          content="Burnaby Drywall Repair | Rockewell Drywall Repair | Expert Service"
        />
        <meta
          property="og:description"
          content="Burnaby's trusted drywall repair specialists. Expert drywall installation, patching, and finishing. Commercial and residential services."
        />
        <meta
          property="og:image"
          content="https://az-handyman.ca/photos/homepage/2.jpg"
        />
        <meta
          property="og:image:alt"
          content="Professional drywall repair and installation services in Burnaby, BC - Expert texture matching and commercial drywall solutions"
        />
        <meta property="og:site_name" content="A-Z Handyman" />
        <meta property="og:locale" content="en_CA" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://az-handyman.ca/burnaby-drywall" />
        <meta name="twitter:site" content="@azhandyman" />
        <meta name="twitter:creator" content="@azhandyman" />
        <meta
          name="twitter:title"
          content="Burnaby Drywall Repair | Rockewell Drywall Repair | Expert Service"
        />
        <meta
          name="twitter:description"
          content="Burnaby's trusted drywall repair specialists. Expert drywall installation, patching, and finishing. Commercial and residential services. Licensed & insured. Free quotes!"
        />
        <meta
          name="twitter:image"
          content="https://az-handyman.ca/photos/homepage/2.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="Professional drywall repair and installation services in Burnaby"
        />

        {/* Mobile & Theme */}
        <meta name="theme-color" content="#111827" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Burnaby Drywall" />

        {/* Geo Tags */}
        <meta name="geo.region" content="CA-BC" />
        <meta name="geo.placename" content="Burnaby" />
        <meta name="geo.position" content="49.2488;-122.9805" />
        <meta name="ICBM" content="49.2488, -122.9805" />
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
        <ScrollTracker page="burnaby-drywall" />
        <TimeTracker page="burnaby-drywall" />
        <StickyCTA
          phoneNumber="+17786534862"
          ctaText="Call Now"
          page="burnaby-drywall"
        />
        <Navigation transparent />

      {/* Hero Section */}
      <section className="relative pt-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 bg-grid-gray-100 bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row gap-12 items-center py-16">
            <div className="w-full md:w-1/2">
              <div className="inline-block bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
                Burnaby&apos;s Premier Drywall Experts
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
                Expert drywall repair.
                <span className="block text-gray-900">Flawless results.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Burnaby&apos;s trusted drywall repair specialists for homes and
                businesses. From small patches to complete renovations.
              </p>

              <div ref={ctaRef}>
                <CTAButton
                  text="Get Instant Quote - No Obligation"
                  onClick={() => handleEmergencyCall("hero")}
                  location="hero"
                  page="burnaby-drywall"
                  showPhoneIcon={true}
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="relative h-[600px] w-full">
                <Image
                  src="/photos/homepage/2.jpg"
                  alt="Professional drywall repair and installation services in Burnaby, BC - Expert texture matching and commercial drywall solutions"
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

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Premium Drywall Services
            </h2>
            <p className="text-lg text-gray-600">
              Burnaby&apos;s most trusted repair specialists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-gray-900 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Our Services
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive drywall solutions for Burnaby properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {type.title}
                </h3>
                <ul className="space-y-3">
                  {type.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gray-900" />
                      <span className="text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-white" id="contactform">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Request a Quote
            </h2>
            <p className="text-lg text-gray-600">
              2-hour response • Burnaby-wide service
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
                      <option value="planned">Planned Project (Flexible timing)</option>
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
                2-hour response • Expert service • Burnaby certified
              </p>
            </form>
          </div>
        </div>

        {/* Trust Badges Section */}
        <TrustBadges showCertifications={false} showResponseTime={true} />

        {/* Testimonials Section */}
        {gmbProfile && (
          <ServiceTestimonials
            reviews={burnabyReviews}
            gmbProfile={gmbProfile}
            serviceName="Burnaby Drywall Repair"
            reviewCount={89}
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
                Proven Excellence
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our certified team delivers comprehensive drywall solutions,
                transforming Burnaby properties with precision and expertise.
              </p>
              <ul className="space-y-4">
                {[
                  "Professional damage assessment",
                  "BC-certified processes",
                  "Premium materials",
                  "Satisfaction guaranteed",
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
                alt="Burnaby drywall repair specialists - Professional drywall installation, patching, and finishing services in Burnaby, BC"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-xl"
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
              Everything you need to know about our drywall services in Burnaby
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
                      trackFAQInteraction(faq.question, "burnaby-drywall", "expanded");
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
            Burnaby&apos;s Trusted Drywall Experts
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Professional drywall services across Burnaby
          </p>
          <CTAButton
            text="Get Started Now - Free Quote"
            onClick={() => handleEmergencyCall("bottom")}
            location="bottom"
            page="burnaby-drywall"
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
  setShowSuccess: (val: boolean) => void;
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

export default BurnabyDrywallLandingPage;