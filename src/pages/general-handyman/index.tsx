import React, { useState } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import Testemonials from "@/components/Testemonials";
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

const HandymanLandingPage = () => {
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
      const response = await fetch("/api/handyman_email", {
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
          serviceType: "General Handyman",
          leadSource: "AZ Handyman Website - General Handyman Form",
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
      description: "Your trusted local handyman service",
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      title: "Quality Work",
      description: "Professional tools and techniques",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Fast Response",
      description: "2-hour response time guaranteed",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Certified Team",
      description: "Licensed and insured in Vancouver",
    },
  ];

  const serviceTypes = [
    {
      title: "Home Repairs",
      points: [
        "Plumbing fixes",
        "Electrical work",
        "Door & window repairs",
        "Furniture assembly",
      ],
    },
    {
      title: "Commercial Services",
      points: [
        "Office maintenance",
        "Retail fixtures",
        "Building repairs",
        "Facility upkeep",
      ],
    },
    {
      title: "Installation Services",
      points: [
        "TV mounting",
        "Shelving & cabinets",
        "Light fixtures",
        "Smart home devices",
      ],
    },
    {
      title: "Additional Services",
      points: [
        "Painting",
        "Drywall repair",
        "Deck maintenance",
        "General carpentry",
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

  const gmbProfile = getGMBProfile("general-handyman");
  const handymanReviews = [
    {
      name: "Paul Thompson",
      role: "Vancouver Homeowner",
      text: "Excellent handyman service! They fixed multiple issues in our home including plumbing, electrical, and carpentry. Professional, reliable, and reasonably priced. Highly recommend!",
    },
    {
      name: "Karen Lee",
      role: "Verified Customer",
      text: "Fast response time and great workmanship. They installed shelves, fixed a leaky faucet, and did some painting. Everything was completed perfectly. Will definitely use again!",
    },
    {
      name: "Steve Martinez",
      role: "Commercial Property Owner",
      text: "Best handyman service in Vancouver! They handle all our office maintenance needs. Professional team that always shows up on time and does quality work.",
    },
    {
      name: "Nancy Chen",
      role: "Vancouver Homeowner",
      text: "Outstanding service for our home repairs. They fixed our door, installed a ceiling fan, and did some drywall patching. Very satisfied with the quality and professionalism.",
    },
    {
      name: "Mark Wilson",
      role: "Verified Customer",
      text: "Professional handyman service. They assembled furniture, mounted TVs, and fixed various issues around the house. Great value and excellent work!",
    },
    {
      name: "Susan Park",
      role: "Vancouver Homeowner",
      text: "Reliable and professional handyman service. They've helped with multiple projects and always deliver quality work. Very responsive and easy to work with.",
    },
    {
      name: "Robert Kim",
      role: "Verified Customer",
      text: "Great handyman service for all our home maintenance needs. They're always professional, on-time, and do quality work. Highly recommend!",
    },
    {
      name: "Jennifer Brown",
      role: "Vancouver Homeowner",
      text: "Excellent service! They've helped with multiple repairs and installations. Professional, reliable, and reasonably priced. Best handyman in Vancouver!",
    },
  ];

  const localBusinessSchema = gmbProfile
    ? generateLocalBusinessSchema(gmbProfile)
    : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://az-handyman.ca/" },
    { name: "General Handyman Services", url: "https://az-handyman.ca/general-handyman" },
  ]);
  const serviceSchema = generateServiceSchema(
    "General Handyman Services",
    "Professional handyman services in Vancouver. Home repairs, installations, maintenance, and general carpentry. Licensed and insured. 2-hour response time.",
    "Vancouver"
  );

  return (
    <>
      <Head>
        <title>Vancouver Handyman Services | Professional Home Repairs | A-Z Handyman</title>
        <meta
          name="description"
          content="Vancouver's trusted handyman service. Professional home repairs, installations, and maintenance. 1000+ satisfied customers. 2-hour response time. Licensed & insured. Free quotes!"
        />
        <meta
          name="keywords"
          content="handyman vancouver, home repair vancouver, handyman services vancouver, home maintenance vancouver, general handyman vancouver bc, professional handyman vancouver"
        />
        <link rel="canonical" href="https://az-handyman.ca/general-handyman" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://az-handyman.ca/general-handyman" />
        <meta
          property="og:title"
          content="Vancouver Handyman Services | Professional Home Repairs | A-Z Handyman"
        />
        <meta
          property="og:description"
          content="Vancouver's trusted handyman service. Professional home repairs, installations, and maintenance. 1000+ satisfied customers. Licensed & insured."
        />
        <meta
          property="og:image"
          content="https://az-handyman.ca/photos/homepage/Handyman.jpg"
        />
        <meta property="og:site_name" content="A-Z Handyman" />
        <meta property="og:locale" content="en_CA" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://az-handyman.ca/general-handyman" />
        <meta
          name="twitter:title"
          content="Vancouver Handyman Services | Professional Home Repairs"
        />
        <meta
          name="twitter:description"
          content="Professional handyman services in Vancouver. Home repairs, installations, and maintenance. Licensed & insured."
        />
        <meta
          name="twitter:image"
          content="https://az-handyman.ca/photos/homepage/Handyman.jpg"
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
                Vancouver&apos;s Professional Handyman Services
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
                Expert repairs.
                <span className="block text-gray-900">Quality assured.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Vancouver&apos;s trusted handyman service for homes and
                businesses. From quick fixes to complete renovations.
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
              <div className="relative h-[600px] w-full">
                <Image
                  src="/photos/homepage/2.jpg"
                  alt="Professional handyman services in Vancouver - Home repairs, installations, and maintenance specialists"
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
              Professional Handyman Services
            </h2>
            <p className="text-lg text-gray-600">
              Vancouver&apos;s most trusted repair specialists
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
              Comprehensive handyman solutions for Vancouver properties
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

      <Testemonials />

      {/* Testimonials Section */}
      {gmbProfile && (
        <ServiceTestimonials
          reviews={handymanReviews}
          gmbProfile={gmbProfile}
          serviceName="General Handyman Services"
          reviewCount={1000}
        />
      )}

      {/* Form Section */}
      <section className="py-20 bg-white" id="contactform">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Request a Quote
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
                2-hour response &bull; Expert service &bull; Vancouver certified
              </p>
            </form>
          </div>
        </div>
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
                Our certified team delivers comprehensive handyman solutions,
                transforming Vancouver properties with precision and expertise.
              </p>
              <ul className="space-y-4">
                {[
                  "Professional assessment",
                  "BC-certified technicians",
                  "Quality materials",
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
                alt="Vancouver handyman specialists - Professional home repairs, installations, and general maintenance services"
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
              Everything you need to know about our handyman services
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How quickly can you respond to emergency repairs?",
                answer:
                  "We guarantee a 2-hour response time for emergency services across Vancouver. Our team is available 24/7 to handle urgent repairs.",
              },
              {
                question:
                  "Do you handle both residential and commercial projects?",
                answer:
                  "Yes, we specialize in both residential and commercial handyman services. From small home repairs to large-scale commercial maintenance, our team has the expertise to handle any project size.",
              },
              {
                question: "Are you licensed and insured?",
                answer:
                  "Absolutely. We are fully licensed and insured in Vancouver, providing you complete peace of mind for any project we undertake.",
              },
              {
                question: "What types of handyman services do you offer?",
                answer:
                  "We offer a comprehensive range of services including plumbing repairs, electrical work, carpentry, painting, furniture assembly, TV mounting, and general maintenance for both homes and businesses.",
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
            Vancouver&apos;s Trusted Handyman Experts
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Professional handyman services across Greater Vancouver
          </p>
          <button
            onClick={handleEmergencyCall}
            className="group inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-all duration-300"
          >
            <Phone className="w-6 h-6" />
            <span>Get Started Now</span>
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
      <h3 className="text-2xl font-medium text-gray-900">Message received</h3>

      <div className="space-y-2 text-center">
        <p className="text-gray-600">We&apos;ll get back to you shortly</p>
        <p className="text-gray-500 text-sm">
          Response will be sent to your email
        </p>
      </div>

      <button
        onClick={() => setShowSuccess(false)}
        className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-[#ffc527] hover:text-black"
      >
        Done
      </button>
    </div>
  );
};

export default HandymanLandingPage;
