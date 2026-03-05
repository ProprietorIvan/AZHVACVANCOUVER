import React, { useState } from "react";
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
  Droplets,
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
} from "@/utils/seo";

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

const FloodRepairLandingPage = () => {
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
          customerType === "commercial"
            ? "Commercial Form"
            : "Phone Lead - Flood Emergency",
        text_Mjj7Hg3c: `project details: ${formData.projectDetails},urgency: ${urgency}, customer type: ${customerType}, facility type: ${facilityType}, project size:${projectSize}`,
        numbers_Mjj7fpib: 0,
        job_location_mkm418ra: formData.address,
        lead_phone: formData.phone,
        lead_email: formData.email,
        status_1_Mjj77YUc: "Flood Restoration",
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
      const response = await fetch("/api/flood_repair_email", {
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
          serviceType: "Flood Repair",
          leadSource: "AZ Handyman Website - Flood Repair Form",
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
      } else {
        throw new Error("Failed to submit quote request");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your request. Please try again.");
    }
  };

  const handleEmergencyCall = () => {
    window.location.href = "tel:+1 (778) 653-4862"; // Replace with your phone number

    const yourhome = document.querySelector("#contactform");
    if (yourhome) {
      yourhome.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
  };

  const serviceFeatures = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Vancouver Experts",
      description: "Your local water damage specialists",
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      title: "Premium Solutions",
      description: "Industry-leading equipment and techniques",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Response",
      description: "Emergency response guaranteed",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Certified Results",
      description: "Licensed and insured in Vancouver",
    },
  ];

  const serviceTypes = [
    {
      title: "Water Extraction",
      points: [
        "Fast emergency response",
        "Professional grade equipment",
        "Complete water removal",
        "Moisture detection",
      ],
    },
    {
      title: "Structural Drying",
      points: [
        "Industrial dehumidifiers",
        "High-capacity air movers",
        "Comprehensive moisture removal",
        "Thermal imaging assessment",
      ],
    },
    {
      title: "Damage Restoration",
      points: [
        "Structural repairs",
        "Material replacement",
        "Mold prevention",
        "Sanitization services",
      ],
    },
    {
      title: "Additional Services",
      points: [
        "Content restoration",
        "Odor removal",
        "Insurance coordination",
        "Complete reconstruction",
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

  const gmbProfile = getGMBProfile("flood-repair");
  const floodRepairReviews = [
    {
      name: "Patricia Williams",
      role: "Vancouver Homeowner",
      text: "Emergency flood response was incredible! They arrived within 2 hours and started water extraction immediately. Professional team that saved our basement. Highly recommend for any water damage emergency.",
    },
    {
      name: "Mark Thompson",
      role: "Verified Customer",
      text: "Outstanding flood restoration service. They handled our entire basement flood damage including water extraction, drying, and restoration. The work was thorough and they kept us informed throughout.",
    },
    {
      name: "Susan Lee",
      role: "Vancouver Homeowner",
      text: "Fast emergency response and excellent work. They prevented mold growth and restored our home perfectly. The team was professional, knowledgeable, and very helpful with insurance coordination.",
    },
    {
      name: "Robert Martinez",
      role: "Commercial Property Owner",
      text: "Best flood restoration company in Vancouver! They responded quickly to our emergency, extracted all water, and completed full restoration. The results exceeded our expectations.",
    },
    {
      name: "Jennifer Kim",
      role: "Verified Customer",
      text: "Professional 24/7 emergency service. They arrived quickly after our pipe burst and prevented further damage. Complete water extraction and structural drying. Excellent service!",
    },
    {
      name: "David Chen",
      role: "Commercial Property Owner",
      text: "Excellent flood repair service for our commercial property. They handled a large-scale water damage situation efficiently and restored everything perfectly. Very satisfied!",
    },
    {
      name: "Lisa Park",
      role: "Vancouver Homeowner",
      text: "They responded to our flood emergency within hours. Professional water extraction and complete restoration. The team was knowledgeable and helped us through the entire process.",
    },
    {
      name: "Michael Rodriguez",
      role: "Verified Customer",
      text: "Outstanding 24/7 flood restoration service. They prevented further damage and restored our property completely. Highly professional and efficient team!",
    },
  ];

  const localBusinessSchema = gmbProfile
    ? generateLocalBusinessSchema(gmbProfile)
    : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://az-handyman.ca/" },
    { name: "Flood Repair", url: "https://az-handyman.ca/flood-repair" },
  ]);
  const serviceSchema = generateServiceSchema(
    "Flood Restoration and Water Damage Repair",
    "24/7 emergency flood restoration and water damage repair services in Vancouver. Professional water extraction, structural drying, and complete restoration.",
    "Vancouver"
  );

  return (
    <>
      <Head>
        <title>Vancouver Flood Restoration | Emergency Water Damage Repair | 24/7</title>
        <meta
          name="description"
          content="Vancouver's premier flood restoration service. 24/7 emergency water damage repair, extraction, and restoration. 200+ projects completed. Fast response guaranteed. Licensed & insured."
        />
        <meta
          name="keywords"
          content="flood restoration vancouver, water damage repair vancouver, emergency flood service, water extraction vancouver, flood cleanup vancouver, water damage restoration vancouver bc"
        />
        <link rel="canonical" href="https://az-handyman.ca/flood-repair" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://az-handyman.ca/flood-repair" />
        <meta
          property="og:title"
          content="Vancouver Flood Restoration | Emergency Water Damage Repair | 24/7"
        />
        <meta
          property="og:description"
          content="Vancouver's premier flood restoration service. 24/7 emergency water damage repair, extraction, and restoration. Fast response guaranteed."
        />
        <meta
          property="og:image"
          content="https://az-handyman.ca/photos/homepage/Flood-Restoration.jpg"
        />
        <meta property="og:site_name" content="A-Z Handyman" />
        <meta property="og:locale" content="en_CA" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://az-handyman.ca/flood-repair" />
        <meta
          name="twitter:title"
          content="Vancouver Flood Restoration | Emergency Water Damage Repair"
        />
        <meta
          name="twitter:description"
          content="24/7 emergency flood restoration and water damage repair services in Vancouver."
        />
        <meta
          name="twitter:image"
          content="https://az-handyman.ca/photos/homepage/Flood-Restoration.jpg"
        />

        {/* Geo Tags */}
        <meta name="geo.region" content="CA-BC" />
        <meta name="geo.placename" content="Vancouver" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="A-Z Handyman" />

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
        <Navigation transparent />

      {/* Hero Section */}
      <section className="relative pt-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 bg-grid-gray-100 bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row gap-12 items-center py-16">
            <div className="w-full md:w-1/2">
              <div className="inline-block bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
                Vancouver&apos;s Premier Flood Repair Experts
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
                Fast flood response.
                <span className="block text-gray-900">
                  Complete restoration.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Vancouver&apos;s trusted flood repair and water damage
                specialists for homes and businesses. 24/7 emergency response
                for water extraction, drying, and restoration.
              </p>

              <button
                onClick={handleEmergencyCall}
                className="group inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300"
              >
                <Phone className="w-6 h-6" />
                <span>Emergency Response</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="w-full md:w-1/2">
              <div className="relative h-[600px] w-full">
                <Image
                  src="/photos/homepage/2.jpg"
                  alt="24/7 emergency flood restoration and water damage repair services in Vancouver - Professional water extraction and structural drying"
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
              24/7 Flood Restoration Services
            </h2>
            <p className="text-lg text-gray-600">
              Vancouver&apos;s most trusted water damage specialists
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
              Comprehensive flood and water damage solutions for Vancouver
              properties
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
              Request Emergency Service
            </h2>
            <p className="text-lg text-gray-600">
              24/7 response • Vancouver-wide service
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
                  Damage Details
                </label>
                <textarea
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Please describe the water damage situation..."
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
                  Submit Emergency Request
                </button>
              )}
              <p className="text-sm text-gray-600 text-center">
                24/7 response • Expert service • Vancouver certified
              </p>
            </form>
          </div>
        </div>

        {/* Testimonials Section */}
        {gmbProfile && (
          <ServiceTestimonials
            reviews={floodRepairReviews}
            gmbProfile={gmbProfile}
            serviceName="Flood Restoration"
            reviewCount={203}
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
                Fast, Effective Solutions
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our certified team delivers comprehensive water damage
                solutions, restoring Vancouver properties with advanced
                equipment and expertise.
              </p>
              <ul className="space-y-4">
                {[
                  "Professional damage assessment",
                  "Rapid water extraction",
                  "Complete structural drying",
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
                alt="Vancouver flood restoration specialists - Emergency water damage repair, extraction, and complete restoration services"
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
              Everything you need to know about our flood repair services
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How quickly can you respond to flood emergencies?",
                answer:
                  "We provide 24/7 emergency response across Vancouver. Our team can be on-site within hours of your call to begin immediate water extraction and damage mitigation.",
              },
              {
                question:
                  "Do you handle both residential and commercial water damage?",
                answer:
                  "Yes, we specialize in both residential and commercial flood repair services. From small home water damage to large-scale commercial flooding, our team has the equipment and expertise to handle any project size.",
              },
              {
                question: "Will you work with my insurance company?",
                answer:
                  "Absolutely. We have extensive experience working with insurance companies and can help coordinate your claim, provide detailed documentation, and work directly with your adjuster to streamline the process.",
              },
              {
                question:
                  "What steps do you take to prevent mold after flooding?",
                answer:
                  "We implement comprehensive moisture detection, rapid water extraction, and thorough structural drying using industrial dehumidifiers and air movers. We also apply antimicrobial treatments when necessary to prevent mold growth.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Vancouver&apos;s Trusted Flood Repair Experts
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            24/7 emergency water damage services across Greater Vancouver
          </p>
          <button
            onClick={handleEmergencyCall}
            className="group inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-all duration-300"
          >
            <Phone className="w-6 h-6" />
            <span>Emergency Response</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
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
      <h3 className="text-2xl font-medium text-gray-900">Request received</h3>

      <div className="space-y-2 text-center">
        <p className="text-gray-600">We&apos;ll get back to you immediately</p>
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

export default FloodRepairLandingPage;
