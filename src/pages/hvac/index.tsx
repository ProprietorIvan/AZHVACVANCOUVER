import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import {
  Phone,
  ArrowRight,
  Thermometer,
  Fan,
  Clock,
  CheckCircle2,
  Shield,
  Building2,
  Home,
  Check,
  Snowflake,
  Flame,
  Wind,
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

// HVAC landing page - updated May 28, 2025 at 11:32
type CustomerType = "residential" | "commercial" | null;

interface FormData {
  name: string;
  phone: string;
  facilityType: string;
  hvacSystem: string;
  urgency: string;
  email: string;
  address: string;
  projectDetails: string;
}

const HVACLandingPage = () => {
  const [customerType, setCustomerType] = useState<CustomerType>(null);
  const [facilityType, setFacilityType] = useState("");
  const [urgency, setUrgency] = useState("");
  const [hvacSystem, setHvacSystem] = useState("");
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
    trackPageView("hvac");
  }, []);

  // Track CTA viewed when it enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackCTAViewed("hero", "hvac");
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
      trackFormStarted("hvac", "hvac");
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track form submission
    trackFormSubmission("hvac", "hvac", {
      customer_type: customerType || "unknown",
      urgency: urgency || "unknown",
      facility_type: facilityType || "unknown",
      hvac_system: hvacSystem || "unknown",
    });

    const submissionData = {
      ...formData,
      customerType,
      facilityType,
      urgency,
      hvacSystem,
    };
    try {
      const newLead: Lead = {
        name: formData.name,
        date_Mjj7SnLm: new Date().toISOString(),
        lead_status: "New Lead",
        status_1_Mjj7KSmv:
          customerType === "commercial" ? "Commercial Form" : "Form Handyman",
        text_Mjj7Hg3c: `project details: ${formData.projectDetails}, urgency: ${urgency}, customer type: ${customerType}, facility type: ${facilityType}, hvac system: ${hvacSystem}`,
        numbers_Mjj7fpib: 0,
        job_location_mkm418ra: formData.address,
        lead_phone: formData.phone,
        lead_email: formData.email,
        status_1_Mjj77YUc: "Handyman",
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
      const response = await fetch("/api/hvac_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        // Track form success
        trackFormSuccess("hvac", "hvac", {
          customer_type: customerType || "unknown",
        });
        
        // Track conversion complete
        trackConversionComplete("hvac", "form_submission", {
          form_type: "hvac",
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
          urgency: urgency,
          serviceType: "HVAC",
          leadSource: "AZ Handyman Website - HVAC Form",
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
        setHvacSystem("");
        formStartedRef.current = false;
      } else {
        throw new Error("Failed to submit service request");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      trackFormError("hvac", "hvac", error instanceof Error ? error.message : "Unknown error");
      alert("There was an error submitting your request. Please try again.");
    }
  };

  const handleEmergencyCall = (location: string = "hero") => {
    trackPhoneClick(location, "hvac");
    window.location.href = "tel:+17787705721";

    const yourhome = document.querySelector("#contactform");
    if (yourhome) {
      yourhome.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
  };

  const serviceFeatures = [
    {
      icon: <Snowflake className="w-6 h-6" />,
      title: "Cooling Experts",
      description: "AC installation, repair & maintenance",
    },
    {
      icon: <Flame className="w-6 h-6" />,
      title: "Heating Specialists",
      description: "Furnace, heat pump & boiler services",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Emergency",
      description: "2-hour response time guaranteed",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Certified Technicians",
      description: "Licensed and insured in Vancouver",
    },
  ];

  const serviceTypes = [
    {
      title: "Cooling Services",
      points: [
        "AC installation & replacement",
        "Emergency AC repair",
        "Preventive maintenance",
        "Ductless mini-split systems",
      ],
    },
    {
      title: "Heating Solutions",
      points: [
        "Furnace repair & installation",
        "Heat pump services",
        "Boiler maintenance",
        "Radiant heating systems",
      ],
    },
    {
      title: "Commercial HVAC",
      points: [
        "Rooftop unit service",
        "VRF/VRV systems",
        "Building automation",
        "Commercial refrigeration",
      ],
    },
    {
      title: "Indoor Air Quality",
      points: [
        "Air purification systems",
        "Ventilation solutions",
        "Humidity control",
        "Duct cleaning services",
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

  const gmbProfile = getGMBProfile("hvac");
  const hvacReviews = [
    {
      name: "Chris Anderson",
      role: "Vancouver Homeowner",
      text: "Excellent HVAC service! They installed a new AC unit and the work was professional and clean. The technician was knowledgeable and explained everything clearly. Great value and service!",
    },
    {
      name: "Michelle Brown",
      role: "Verified Customer",
      text: "Fast emergency response when our furnace broke down in winter. They fixed it quickly and the technician was professional and courteous. Highly recommend AZ Air Conditioning!",
    },
    {
      name: "Daniel Park",
      role: "Commercial Property Owner",
      text: "Outstanding commercial HVAC service. They maintain our office building's HVAC systems and always provide excellent service. Professional team with great attention to detail.",
    },
    {
      name: "Lisa Chen",
      role: "Vancouver Homeowner",
      text: "Best HVAC company in Vancouver! They installed a new heat pump system and the results are amazing. Energy efficient and quiet. Very satisfied with the installation and service.",
    },
    {
      name: "Ryan Martinez",
      role: "Verified Customer",
      text: "Professional AC repair service. They diagnosed and fixed the issue quickly. The technician was friendly and explained what was wrong. Fair pricing and excellent workmanship.",
    },
    {
      name: "Amanda Wilson",
      role: "Vancouver Homeowner",
      text: "Great HVAC maintenance service. They do regular tune-ups for our system and it's been running perfectly. Preventative maintenance has saved us from costly repairs. Highly recommend!",
    },
    {
      name: "Kevin Thompson",
      role: "Verified Customer",
      text: "Excellent emergency HVAC service. They responded quickly when our AC failed in summer. Professional installation and great customer service throughout.",
    },
    {
      name: "Sarah Kim",
      role: "Commercial Property Owner",
      text: "Top-notch commercial HVAC maintenance. They keep our building's systems running efficiently. Professional team with excellent response times.",
    },
  ];

  const localBusinessSchema = gmbProfile
    ? generateLocalBusinessSchema(gmbProfile)
    : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://az-handyman.ca/" },
    { name: "HVAC Services", url: "https://az-handyman.ca/hvac" },
  ]);
  const serviceSchema = generateServiceSchema(
    "HVAC Services - Heating, Ventilation, and Air Conditioning",
    "Professional HVAC installation, repair, and maintenance services in Vancouver. 24/7 emergency service for heating and cooling systems. Licensed technicians.",
    "Vancouver"
  );

  const faqs = [
    {
      question: "How quickly can you respond to HVAC emergencies?",
      answer:
        "We guarantee a 2-hour response time for emergency HVAC services across Vancouver and the Lower Mainland. Our technicians are available 24/7 to handle urgent heating and cooling failures when you need them most.",
    },
    {
      question: "What types of HVAC systems do you service?",
      answer:
        "We service all major brands and types of HVAC equipment including furnaces, air conditioners, heat pumps, ductless mini-splits, boilers, rooftop units, VRF/VRV systems, and commercial refrigeration. Our technicians are factory-trained on multiple equipment types.",
    },
    {
      question: "Do you offer maintenance plans?",
      answer:
        "Yes, we offer comprehensive maintenance plans for both residential and commercial HVAC systems. Regular maintenance extends equipment life, improves efficiency, prevents costly breakdowns, and maintains manufacturer warranties.",
    },
    {
      question: "Do you provide warranties on your work?",
      answer:
        "Absolutely. All our repair work comes with a 1-year labor warranty, and new installations include up to 10 years of warranty protection depending on the equipment. We stand behind our workmanship with a 100% satisfaction guarantee.",
    },
  ];

  const faqPageSchema = generateFAQPageSchema(
    faqs,
    "https://az-handyman.ca/hvac"
  );
  const webPageSchema = generateWebPageSchema(
    "Vancouver HVAC Services | Air Conditioning & Heating",
    "https://az-handyman.ca/hvac",
    "Vancouver's trusted HVAC specialists. AC installation, furnace repair, heat pump services. 24/7 emergency service. 750+ installations completed. Licensed & certified technicians."
  );

  return (
    <>
      <Head>
        <title>Vancouver HVAC Services | Air Conditioning & Heating | AZ HVAC</title>
        <meta
          name="description"
          content="Vancouver's trusted HVAC specialists. AC installation, furnace repair, heat pump services. 24/7 emergency service. 750+ installations completed. Licensed & certified technicians."
        />
        <meta
          name="keywords"
          content="hvac vancouver, air conditioning vancouver, furnace repair vancouver, ac installation vancouver, heat pump vancouver, hvac repair vancouver bc, commercial hvac vancouver"
        />
        <link rel="canonical" href="https://az-handyman.ca/hvac" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://az-handyman.ca/hvac" />
        <meta
          property="og:title"
          content="Vancouver HVAC Services | Air Conditioning & Heating | AZ HVAC"
        />
        <meta
          property="og:description"
          content="Vancouver's trusted HVAC specialists. AC installation, furnace repair, heat pump services. 24/7 emergency service. Licensed & certified technicians."
        />
        <meta
          property="og:image"
          content="https://az-handyman.ca/photos/homepage/AirConditioning.jpg"
        />
        <meta
          property="og:image:alt"
          content="Professional HVAC installation and repair services in Vancouver - Air conditioning, heating, and ventilation specialists"
        />
        <meta property="og:site_name" content="A-Z Handyman" />
        <meta property="og:locale" content="en_CA" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://az-handyman.ca/hvac" />
        <meta name="twitter:site" content="@azhandyman" />
        <meta name="twitter:creator" content="@azhandyman" />
        <meta
          name="twitter:title"
          content="Vancouver HVAC Services | Air Conditioning & Heating | AZ HVAC"
        />
        <meta
          name="twitter:description"
          content="Vancouver's trusted HVAC specialists. AC installation, furnace repair, heat pump services. 24/7 emergency service. 750+ installations completed. Get your free quote today!"
        />
        <meta
          name="twitter:image"
          content="https://az-handyman.ca/photos/homepage/AirConditioning.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="Professional HVAC installation and repair services in Vancouver"
        />

        {/* Mobile & Theme */}
        <meta name="theme-color" content="#111827" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AZ HVAC" />

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
        <ScrollTracker page="hvac" />
        <TimeTracker page="hvac" />
        <StickyCTA
          phoneNumber="+17787705721"
          ctaText="Call Now"
          page="hvac"
        />
        <Navigation transparent />

      {/* Hero Section */}
      <section className="relative pt-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 bg-grid-gray-100 bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row gap-12 items-center py-16">
            <div className="w-full md:w-1/2">
              <div className="inline-block bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
                #1 HVAC Service in Lower Mainland
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
                Superior HVAC Solutions.
                <span className="block text-gray-900">Year-Round Comfort.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Vancouver&apos;s most trusted HVAC specialists with over 10
                years of experience. 24/7 emergency service for residential and
                commercial clients.
              </p>

              <div ref={ctaRef}>
                <CTAButton
                  text="Get Instant Quote - 24/7 Emergency Service"
                  onClick={() => handleEmergencyCall("hero")}
                  location="hero"
                  page="hvac"
                  showPhoneIcon={true}
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="relative h-[600px] w-full">
                <Image
                  src="/photos/homepage/2.jpg"
                  alt="Professional HVAC installation and repair services in Vancouver - Air conditioning, heating, and ventilation specialists"
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
              #1 HVAC SPECIALISTS IN LOWER MAINLAND
            </div>
            <h2 className="text-6xl font-extrabold mb-6 text-gray-900">
              750+ PROJECTS COMPLETED
            </h2>
            <p className="text-2xl text-gray-800 max-w-3xl mx-auto font-medium">
              From routine maintenance to complete system installations — we
              deliver excellence at every level
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900 text-white p-10 rounded-xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gray-800 rounded-full -mt-20 -mr-20"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-6">
                  <div className="bg-white text-gray-900 p-4 rounded-xl">
                    <Shield className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold">TRUSTED EXPERTISE</h3>
                </div>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                    <span>
                      <strong>750+ installations</strong> successfully completed
                      throughout Lower Mainland
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                    <span>
                      <strong>100% satisfaction</strong> guaranteed on every
                      service call
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                    <span>
                      <strong>TECA certified</strong> technicians with ongoing
                      training & certification
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
                    <Clock className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold">24/7 EMERGENCY SERVICE</h3>
                </div>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                    <span>
                      <strong>2-hour response time</strong> for urgent heating &
                      cooling emergencies
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                    <span>
                      <strong>Fully stocked trucks</strong> ready to solve most
                      problems on first visit
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                    <span>
                      <strong>No overtime charges</strong> for after-hours
                      emergency service calls
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
              COMPLETE HVAC SOLUTIONS.
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
                  <path d="M2 12h20M12 2v20M7 12a5 5 0 0 1 5-5M12 17a5 5 0 0 1-5-5M12 7a5 5 0 0 1 5 5M17 12a5 5 0 0 1-5 5" />
                </svg>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2 uppercase">
                  HEATING, COOLING & AIR QUALITY
                </h3>
                <p className="text-xl text-gray-700">
                  Whether you need routine maintenance or a complete system
                  installation — we deliver premium service with every call.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-3">
                <div className="bg-gray-200 p-2 rounded-lg h-fit">
                  <CheckCircle2 className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Emergency Repairs</h4>
                  <p className="text-gray-700">
                    24/7 service for urgent heating & cooling failures
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-gray-200 p-2 rounded-lg h-fit">
                  <CheckCircle2 className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">
                    System Installations
                  </h4>
                  <p className="text-gray-700">
                    Expert installation of all heating & cooling systems
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-gray-200 p-2 rounded-lg h-fit">
                  <CheckCircle2 className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">
                    Preventive Maintenance
                  </h4>
                  <p className="text-gray-700">
                    Scheduled tune-ups to prevent breakdowns & extend equipment
                    life
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-gray-200 p-2 rounded-lg h-fit">
                  <CheckCircle2 className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Indoor Air Quality</h4>
                  <p className="text-gray-700">
                    Air purification, humidity control & ventilation solutions
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
                  <span>Furnace & AC repair</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Heat pump installation</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Mini-split systems</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Smart thermostat upgrades</span>
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
                  <span>Rooftop unit service</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>VRF/VRV systems</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Refrigeration systems</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Building automation</span>
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
                  <span>Air filtration systems</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Humidity control</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Duct cleaning</span>
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 flex-shrink-0" />
                  <span>Energy efficiency audits</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="#contactform"
              className="inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-gray-800 transition-all duration-300"
            >
              <span>SCHEDULE SERVICE NOW</span>
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
                  CONTACT US
                </h3>
                <p className="text-gray-700">
                  Call us directly or submit your HVAC needs through our online
                  form
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-gray-900 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gray-900 text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  DIAGNOSTIC VISIT
                </h3>
                <p className="text-gray-700">
                  Our licensed technician identifies the issue and recommends
                  solutions
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-gray-900 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gray-900 text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  UPFRONT QUOTE
                </h3>
                <p className="text-gray-700">
                  Get a detailed, transparent quote with no hidden fees
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-gray-900 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gray-900 text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold mb-6">
                  4
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  EXPERT SERVICE
                </h3>
                <p className="text-gray-700">
                  We complete the work with quality craftsmanship and clean up
                  thoroughly
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 text-lg">
              Fast response for emergencies • Same-day service available
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pt-8 pb-20 bg-white" id="contactform">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              Schedule Your Service
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
                      <p className="text-sm text-gray-600">Home HVAC systems</p>
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
                        Business HVAC solutions
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
                      HVAC System Type *
                    </label>
                    <select
                      name="hvacSystem"
                      value={hvacSystem}
                      onChange={(e) => {
                        setHvacSystem(e.target.value);
                        handleInputChange(e);
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      required
                    >
                      <option value="">Select system type</option>
                      <option value="rooftop">Rooftop Units</option>
                      <option value="split">Split Systems</option>
                      <option value="vrf">VRF/VRV Systems</option>
                      <option value="chillers">Chillers</option>
                      <option value="boilers">Boilers</option>
                      <option value="other">Other/Not Sure</option>
                    </select>
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
                        Emergency (System not working)
                      </option>
                      <option value="urgent">Urgent (Within 24 hours)</option>
                      <option value="standard">Standard (Within a week)</option>
                      <option value="planned">
                        Planned Maintenance/Installation
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
                  type="email"
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
                  Service Details
                </label>
                <textarea
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Please describe your HVAC needs or issues..."
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
                  Submit Service Request
                </button>
              )}
              <p className="text-sm text-gray-600 text-center">
                2-hour response • Expert service • Vancouver certified
              </p>
            </form>
          </div>
        </div>

        {/* Trust Badges Section */}
        <TrustBadges showCertifications={true} showResponseTime={true} />

        {/* Testimonials Section */}
        {gmbProfile && (
          <ServiceTestimonials
            reviews={hvacReviews}
            gmbProfile={gmbProfile}
            serviceName="HVAC Services"
            reviewCount={156}
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
                Premium HVAC Services
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                From emergency repairs to new system installations, our team
                delivers expert HVAC solutions throughout the Lower Mainland
                with precision and technical excellence.
              </p>
              <ul className="space-y-4">
                {[
                  "Certified technicians with ongoing training",
                  "24/7 emergency service availability",
                  "Industry-leading equipment and parts",
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
                alt="Vancouver HVAC specialists - Professional air conditioning, heating, and ventilation installation and repair services"
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
              Everything you need to know about our HVAC services
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
                      trackFAQInteraction(faq.question, "hvac", "expanded");
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
            Lower Mainland&apos;s Premier HVAC Specialists
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            750+ successful installations with exceptional customer satisfaction
          </p>
          <CTAButton
            text="Schedule Service Now - Free Quote"
            onClick={() => handleEmergencyCall("bottom")}
            location="bottom"
            page="hvac"
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
      <h3 className="text-2xl font-medium text-gray-900">
        Service request received
      </h3>

      <div className="space-y-2 text-center">
        <p className="text-gray-600">We&apos;ll get back to you shortly</p>
        <p className="text-gray-500 text-sm">
          Confirmation will be sent to your email
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

export default HVACLandingPage;
