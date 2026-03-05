import React, { useState } from "react";
import Head from "next/head";
import DemolitionNavigation from "@/components/DemolitionNavigation";
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
import Link from "next/link";
import { Lead } from "@/utils/createLead";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import { getGMBProfile } from "@/data/gmb-profiles";
import {
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateServiceSchema,
} from "@/utils/seo";

// Demolition landing page - Rockwell Prime branding
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

const DemolitionLandingPage = () => {
  const [customerType, setCustomerType] = useState<CustomerType>(null);
  const [facilityType, setFacilityType] = useState("");
  const [urgency, setUrgency] = useState("");
  const [projectSize, setProjectSize] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState<
    Pick<FormData, "name" | "phone" | "email" | "address" | "projectDetails">
  >({
    name: "",
    phone: "",
    email: "",
    address: "",
    projectDetails: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const copyToClipboard = async (text: string, isPhone: boolean) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isPhone) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
          customerType === "commercial" ? "Commercial Form" : "Form Demolition",
        text_Mjj7Hg3c: `project details: ${formData.projectDetails},urgency: ${urgency}, customer type: ${customerType}, facility type: ${facilityType}, project size:${projectSize}`,
        numbers_Mjj7fpib: 0,
        job_location_mkm418ra: formData.address,
        lead_phone: formData.phone,
        lead_email: formData.email,
        status_1_Mjj77YUc: "Demolition",
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
      const response = await fetch("/api/demolition_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
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
          serviceType: "Demolition",
          leadSource: "AZ Handyman Website - Demolition Form",
        });

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
      } else {
        throw new Error("Failed to submit quote request");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your request. Please try again.");
    }
  };

  const handleEmergencyCall = () => {
    window.location.href = "tel:+17786553329";

    const yourhome = document.querySelector("#contactform");
    if (yourhome) {
      yourhome.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
  };

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

  const gmbProfile = getGMBProfile("demolition");
  const demolitionReviews = [
    {
      name: "Sarah Mitchell",
      role: "Vancouver Homeowner",
      text: "Rockwell Prime demolished our old house with incredible precision and care. They protected our neighbor's property and cleaned up everything perfectly. Highly professional team!",
    },
    {
      name: "David Chen",
      role: "Commercial Property Owner",
      text: "Needed our 5,000 sq ft office space stripped out quickly. Rockwell Prime completed the job in 3 days with no disruption to neighboring businesses. Excellent work!",
    },
    {
      name: "Jennifer Rodriguez",
      role: "Home Renovation Client",
      text: "They demolished our kitchen while keeping the rest of the house dust-free. Very impressed with their containment methods and attention to detail.",
    },
    {
      name: "Michael Thompson",
      role: "Verified Customer",
      text: "Professional demolition service from start to finish. Fair pricing, excellent communication, and they left the site spotless.",
    },
    {
      name: "Lisa Park",
      role: "Restaurant Owner",
      text: "Best demolition company in Vancouver! They handled our restaurant renovation with minimal disruption to our business.",
    },
    {
      name: "Robert Kim",
      role: "Verified Customer",
      text: "Rockwell Prime's team was incredibly efficient. What we thought would take a week was completed in 3 days. Highly recommend!",
    },
    {
      name: "Mark Wilson",
      role: "Commercial Property Owner",
      text: "Outstanding demolition service for our commercial building. They completed the project safely and efficiently. Professional team!",
    },
    {
      name: "Emily Johnson",
      role: "Vancouver Homeowner",
      text: "Excellent selective demolition work. They removed exactly what we needed while preserving the rest. Clean, professional, and on-time.",
    },
  ];

  const localBusinessSchema = gmbProfile
    ? generateLocalBusinessSchema(gmbProfile)
    : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://az-handyman.ca/" },
    { name: "Demolition Services", url: "https://az-handyman.ca/demolition" },
  ]);
  const serviceSchema = generateServiceSchema(
    "Demolition and Abatement Services",
    "Professional demolition services in Vancouver. Residential and commercial demolition, selective removal, and complete teardowns. Licensed and insured.",
    "Vancouver"
  );

  return (
    <>
      <Head>
        <title>Vancouver Demolition Services | Rockwell Prime Demolition | Expert</title>
        <meta
          name="description"
          content="Vancouver's trusted demolition specialists. Residential and commercial demolition services. 500+ projects completed. Selective removal and complete teardowns. Licensed & insured."
        />
        <meta
          name="keywords"
          content="demolition vancouver, demolition company vancouver, commercial demolition vancouver, residential demolition vancouver, selective demolition vancouver, demolition services vancouver bc"
        />
        <link rel="canonical" href="https://az-handyman.ca/demolition" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://az-handyman.ca/demolition" />
        <meta
          property="og:title"
          content="Vancouver Demolition Services | Rockwell Prime Demolition | Expert"
        />
        <meta
          property="og:description"
          content="Vancouver's trusted demolition specialists. Residential and commercial demolition services. 500+ projects completed. Licensed & insured."
        />
        <meta
          property="og:image"
          content="https://az-handyman.ca/photos/homepage/2.jpg"
        />
        <meta property="og:site_name" content="Rockwell Prime Demolition" />
        <meta property="og:locale" content="en_CA" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://az-handyman.ca/demolition" />
        <meta
          name="twitter:title"
          content="Vancouver Demolition Services | Rockwell Prime Demolition"
        />
        <meta
          name="twitter:description"
          content="Professional demolition services in Vancouver. Residential and commercial demolition. Licensed & insured."
        />
        <meta
          name="twitter:image"
          content="https://az-handyman.ca/photos/homepage/2.jpg"
        />

        {/* Geo Tags */}
        <meta name="geo.region" content="CA-BC" />
        <meta name="geo.placename" content="Vancouver" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Rockwell Prime Demolition" />

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
      </Head>

      <div className="min-h-screen bg-white">
        <DemolitionNavigation />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center py-16">
            <div className="w-full md:w-1/2">
              <div className="inline-block bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
                #1 Demolition Service in Lower Mainland
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
                Premium Demolition Solutions.
                <span className="block text-gray-900">Guaranteed Results.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Vancouver&apos;s most trusted demolition specialists with over
                20 years of experience. Professional service for residential and
                commercial clients.
              </p>

              <button
                onClick={handleEmergencyCall}
                className="group inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300"
              >
                <Phone className="w-6 h-6" />
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="w-full md:w-1/2">
              <div className="relative h-96 w-full">
                <Image
                  src="/photos/homepage/2.jpg"
                  alt="Professional demolition services in Vancouver - Residential and commercial demolition, selective removal, and complete teardowns"
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

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              #1 DEMOLITION SPECIALISTS IN LOWER MAINLAND
            </h2>
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              500+ PROJECTS COMPLETED
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              From small interior demo to full commercial teardowns — we deliver
              excellence at every scale
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                PROVEN TRACK RECORD
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <span>
                    500+ projects successfully completed throughout Lower
                    Mainland
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <span>
                    100% satisfaction guaranteed on every job, regardless of
                    size
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <span>
                    Extensive portfolio spanning residential & commercial
                    sectors
                  </span>
                </li>
              </ul>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                ANY SIZE. ANY CHALLENGE.
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <span>
                    No job too small — from single room demo to entire buildings
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <span>
                    Scalable workforce to handle projects of any magnitude
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <span>
                    Solutions for every need — residential to large-scale
                    commercial
                  </span>
                </li>
              </ul>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                WE HANDLE IT ALL.
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <span>Licensed and insured demolition specialists</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <span>WorkSafeBC certified for all projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-900 mt-1 flex-shrink-0" />
                  <span>Complete debris removal and site cleanup</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              FROM SMALL DEMO TO FULL TEARDOWNS
            </h2>
            <p className="text-lg text-gray-600">
              Whether you need interior strip-out or complete building
              demolition — we deliver the same level of excellence on every
              project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Residential Demo
              </h3>
              <p className="text-gray-600 mb-4">
                Interior strip-outs, kitchen demo, bathroom removal
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Kitchen demolition</li>
                <li>• Bathroom removal</li>
                <li>• Interior strip-outs</li>
                <li>• Wall removal</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Full Building Demo
              </h3>
              <p className="text-gray-600 mb-4">
                Complete residential and commercial building demolition
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• House demolition</li>
                <li>• Commercial buildings</li>
                <li>• Multi-story structures</li>
                <li>• Site preparation</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Commercial Spaces
              </h3>
              <p className="text-gray-600 mb-4">
                Office buildings, retail, restaurants, warehouses
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Office strip-outs</li>
                <li>• Retail renovations</li>
                <li>• Restaurant demo</li>
                <li>• Warehouse clearing</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Specialized Services
              </h3>
              <p className="text-gray-600 mb-4">
                Concrete removal, selective demo, environmental cleanup
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Concrete demolition</li>
                <li>• Selective removal</li>
                <li>• Asbestos abatement</li>
                <li>• Environmental cleanup</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              OUR 4-STEP PROCESS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                SUBMIT REQUEST
              </h3>
              <p className="text-gray-600">
                Send us your project details and photos through our form or call
                us directly
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                GET ASSESSED
              </h3>
              <p className="text-gray-600">
                We typically evaluate from photos. For complex projects, we
                arrange an on-site assessment
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                RECEIVE QUOTE
              </h3>
              <p className="text-gray-600">
                Get a detailed, transparent quote based on your specific
                requirements
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                WORK BEGINS
              </h3>
              <p className="text-gray-600">
                Our team arrives fully equipped to start your project
                immediately
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-lg font-medium text-gray-900">
              Most projects begin within 4 days of initial request
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-gray-50" id="contactform">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Let&apos;s Begin.
            </h2>
            <p className="text-lg text-gray-600">
              2-hour response • Vancouver-wide service
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            {showSuccess ? (
              <div className="p-8 flex flex-col items-center justify-center space-y-6 min-h-[400px]">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-medium text-gray-900">
                  Message received
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-gray-600">
                    We&apos;ll get back to you shortly
                  </p>
                  <p className="text-gray-500 text-sm">
                    Response will be sent to your email
                  </p>
                </div>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300"
                >
                  Done
                </button>
              </div>
            ) : (
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
                        <p className="text-sm text-gray-600">
                          Residential demolition
                        </p>
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
                          Commercial demolition
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
                        <option value="standard">
                          Standard (Within a week)
                        </option>
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

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
                >
                  Submit Quote Request
                </button>

                <p className="text-sm text-gray-600 text-center">
                  2-hour response • Expert service • Vancouver certified
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {gmbProfile && (
        <ServiceTestimonials
          reviews={demolitionReviews}
          gmbProfile={gmbProfile}
          serviceName="Demolition Services"
          reviewCount={94}
        />
      )}

      {/* Contact Section - Custom for Rockwell Prime */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Have a question?
            </h2>
            <p className="text-xl text-gray-600">Contact us today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                We are here to help
              </h3>
              <p className="text-gray-600">
                If you do not see the service you need, contact us. At Rockwell
                Prime, no task is too big or small—we are ready to take on new
                challenges and get the job done right.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                OPENING HOURS
              </h3>
              <p className="text-gray-600">
                Open 24 hours a day, 7 days a week!
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                CONTACT HERE
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>Address: 1217 Howe St. Vancouver BC</p>
                <p>
                  Phone:{" "}
                  <button
                    onClick={() => copyToClipboard("7786553329", true)}
                    className={`transition-colors duration-200 hover:text-gray-900 cursor-pointer ${
                      copiedPhone ? "text-green-500" : "text-gray-600"
                    }`}
                    aria-label="Copy phone number to clipboard"
                  >
                    {copiedPhone ? "Copied!" : "(778) 655-3329"}
                  </button>
                </p>
                <p>
                  Email:{" "}
                  <button
                    onClick={() => copyToClipboard("info@azhandyman.ca", false)}
                    className={`transition-colors duration-200 hover:text-gray-900 cursor-pointer ${
                      copiedEmail ? "text-green-500" : "text-gray-600"
                    }`}
                    aria-label="Copy email address to clipboard"
                  >
                    {copiedEmail ? "Copied!" : "info@azhandyman.ca"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default DemolitionLandingPage;
