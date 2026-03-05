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
  Brush,
  Palette,
  Truck,
} from "lucide-react";
import Contact from "@/components/Contact";
import Image from "next/image";
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

const FurnitureRefinishingPage = () => {
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
      // Submit to the furniture_email API endpoint
      const response = await fetch("/api/furniture_email", {
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
          serviceType: "Furniture Refinishing",
          leadSource: "AZ Handyman Website - Furniture Refinishing Form",
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
    window.location.href = "tel:+1 (778) 653-4862";

    const yourhome = document.querySelector("#contactform");
    if (yourhome) {
      yourhome.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
  };

  const serviceFeatures = [
    {
      icon: <Brush className="w-6 h-6" />,
      title: "Expert Craftsmen",
      description: "Master furniture refinishers with decades of experience",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Premium Materials",
      description: "High-quality stains, finishes, and restoration products",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Timely Delivery",
      description: "Projects completed on schedule with care",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Satisfaction Guaranteed",
      description: "We stand behind every refinishing project",
    },
  ];

  const serviceTypes = [
    {
      title: "Residential Services",
      points: [
        "Antique restoration",
        "Kitchen cabinet refinishing",
        "Dining table & chair sets",
        "Wood floor refinishing",
      ],
    },
    {
      title: "Commercial Services",
      points: [
        "Restaurant furniture",
        "Office desks & cabinets",
        "Hotel & hospitality pieces",
        "Retail display fixtures",
      ],
    },
    {
      title: "Specialized Techniques",
      points: [
        "French polishing",
        "Color matching",
        "Veneer repair",
        "Custom finishes",
      ],
    },
    {
      title: "Additional Services",
      points: [
        "Upholstery coordination",
        "Hardware restoration",
        "Custom staining",
        "Furniture modifications",
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

  const refinishingProcess = [
    {
      title: "Consultation & Assessment",
      description:
        "We evaluate your furniture piece, discuss your vision, and provide expert recommendations on finishes and techniques.",
    },
    {
      title: "Preparation & Stripping",
      description:
        "Careful removal of old finishes, repair of damages, and thorough sanding to create the perfect foundation.",
    },
    {
      title: "Staining & Finishing",
      description:
        "Application of premium stains and finishes using techniques that enhance the natural beauty of the wood.",
    },
    {
      title: "Final Touches & Delivery",
      description:
        "Hardware reattachment, quality inspection, and safe delivery of your beautifully restored furniture.",
    },
  ];

  const gmbProfile = getGMBProfile("furniture-refinishing");
  const furnitureReviews = [
    {
      name: "Emily Johnson",
      role: "Vancouver Homeowner",
      text: "AZ Classic Furniture did an amazing job refinishing our antique dining table. The finish is beautiful and they matched the original color perfectly. Professional service and excellent craftsmanship!",
    },
    {
      name: "James Wilson",
      role: "Home Renovation Client",
      text: "Outstanding furniture refinishing service. They restored our kitchen cabinets and they look brand new. The attention to detail is impressive. Highly recommend for any furniture refinishing project.",
    },
    {
      name: "Maria Garcia",
      role: "Vancouver Homeowner",
      text: "Best furniture refinishing in Vancouver! They refinished our bedroom set and the results exceeded our expectations. Professional team, fair pricing, and beautiful work.",
    },
    {
      name: "Kevin Park",
      role: "Restaurant Owner",
      text: "Excellent service for our restaurant furniture. They refinished all our tables and chairs and they look fantastic. Fast turnaround and great quality work.",
    },
    {
      name: "Rachel Chen",
      role: "Verified Customer",
      text: "Professional furniture refinishing service. They restored our antique dresser and it looks beautiful. The craftsmanship is top-notch and they were very careful with our piece.",
    },
    {
      name: "Tom Anderson",
      role: "Commercial Property Owner",
      text: "Great experience with AZ Classic Furniture. They refinished our office furniture and the results are excellent. Professional service from start to finish.",
    },
    {
      name: "Sarah Martinez",
      role: "Vancouver Homeowner",
      text: "Excellent antique furniture restoration. They brought our old dresser back to life with beautiful refinishing. Very satisfied with the quality and attention to detail.",
    },
    {
      name: "David Kim",
      role: "Verified Customer",
      text: "Outstanding cabinet refinishing work. They transformed our kitchen cabinets beautifully. Professional service and excellent results.",
    },
  ];

  const localBusinessSchema = gmbProfile
    ? generateLocalBusinessSchema(gmbProfile)
    : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://az-handyman.ca/" },
    { name: "Furniture Refinishing", url: "https://az-handyman.ca/furniture-refinishing" },
  ]);
  const serviceSchema = generateServiceSchema(
    "Furniture Refinishing and Restoration",
    "Professional furniture refinishing and restoration services in Vancouver. Antique restoration, cabinet refinishing, and custom finishes. Expert craftsmen.",
    "Vancouver"
  );

  return (
    <>
      <Head>
        <title>Vancouver Furniture Refinishing | AZ Classic Furniture | Expert</title>
        <meta
          name="description"
          content="Vancouver's premier furniture refinishing service. Antique restoration, cabinet refinishing, and custom finishes. 78+ satisfied customers. Expert craftsmen. Free quotes!"
        />
        <meta
          name="keywords"
          content="furniture refinishing vancouver, antique furniture restoration vancouver, cabinet refinishing vancouver, furniture restoration vancouver, wood refinishing vancouver bc"
        />
        <link rel="canonical" href="https://az-handyman.ca/furniture-refinishing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://az-handyman.ca/furniture-refinishing" />
        <meta
          property="og:title"
          content="Vancouver Furniture Refinishing | AZ Classic Furniture | Expert"
        />
        <meta
          property="og:description"
          content="Vancouver's premier furniture refinishing service. Antique restoration, cabinet refinishing, and custom finishes. Expert craftsmen."
        />
        <meta
          property="og:image"
          content="https://az-handyman.ca/photos/homepage/2.jpg"
        />
        <meta property="og:site_name" content="A-Z Handyman" />
        <meta property="og:locale" content="en_CA" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://az-handyman.ca/furniture-refinishing" />
        <meta
          name="twitter:title"
          content="Vancouver Furniture Refinishing | AZ Classic Furniture"
        />
        <meta
          name="twitter:description"
          content="Professional furniture refinishing and restoration services in Vancouver. Expert craftsmen."
        />
        <meta
          name="twitter:image"
          content="https://az-handyman.ca/photos/homepage/2.jpg"
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
                Vancouver&apos;s Premier Furniture Refinishing
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
                Furniture
                <span className="block text-gray-900">
                  beautifully restored.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Expert furniture refinishing for residential and commercial
                clients. From antique restoration to complete cabinet
                transformations.
              </p>

              <button
                onClick={handleEmergencyCall}
                className="group inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300"
              >
                <Phone className="w-6 h-6" />
                <span>Get Your Free Quote</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="w-full md:w-1/2">
              <div className="relative h-[600px] w-full">
                <Image
                  src="/photos/homepage/2.jpg"
                  alt="Professional furniture refinishing and restoration services in Vancouver - Antique restoration and custom finishes"
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
              Expert Furniture Refinishing
            </h2>
            <p className="text-lg text-gray-600">
              Bringing new life to treasured furniture across Vancouver
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
              Our Refinishing Services
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive furniture restoration solutions for every need
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

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Our Refinishing Process
            </h2>
            <p className="text-lg text-gray-600">
              A methodical approach to furniture restoration that ensures
              quality results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {refinishingProcess.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-50 p-6 rounded-xl h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {index < refinishingProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testemonials />

      {/* Testimonials Section */}
      {gmbProfile && (
        <ServiceTestimonials
          reviews={furnitureReviews}
          gmbProfile={gmbProfile}
          serviceName="Furniture Refinishing"
          reviewCount={78}
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
                      <p className="text-sm text-gray-600">Home furniture</p>
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
                        Business furniture
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

      {/* Before/After Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Transforming Furniture
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our expert craftsmen breathe new life into worn furniture
                pieces, preserving their character while enhancing their beauty
                and functionality.
              </p>
              <ul className="space-y-4">
                {[
                  "Detailed restoration plan",
                  "Premium, eco-friendly finishes",
                  "Expert wood repair techniques",
                  "Meticulous attention to detail",
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
                alt="Vancouver furniture refinishing specialists - Expert antique restoration, cabinet refinishing, and custom wood finishes"
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
              Everything you need to know about our furniture refinishing
              services
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question:
                  "How long does the furniture refinishing process typically take?",
                answer:
                  "The timeline varies depending on the complexity and size of the project. A single piece typically takes 2-3 weeks, while larger projects like kitchen cabinets may take 4-6 weeks. Commercial projects are scheduled according to your business needs with options for after-hours work.",
              },
              {
                question: "Do you offer pickup and delivery services?",
                answer:
                  "Yes, we provide complete pickup and delivery services throughout the Vancouver area. Your furniture is carefully wrapped and transported in our specialized vehicles to ensure it arrives safely at our workshop and back to your location.",
              },
              {
                question: "What types of finishes do you offer?",
                answer:
                  "We offer a wide range of premium finishes including traditional oil-based, water-based polyurethanes, shellac, French polish, milk paint, chalk paint, and specialty custom finishes. We can match existing finishes or create something entirely new to suit your taste and the piece's style.",
              },
              {
                question: "Can you repair damaged or antique furniture?",
                answer:
                  "Absolutely. Our skilled craftsmen specialize in structural repairs, veneer replacement, wood filling, joint regluing, and careful restoration of antique pieces. We take great care to preserve the character and integrity of each piece while addressing damage or wear.",
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
            Vancouver&apos;s Premier Furniture Refinishing Experts
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Residential and commercial furniture restoration throughout Greater
            Vancouver
          </p>
          <button
            onClick={handleEmergencyCall}
            className="group inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-all duration-300"
          >
            <Phone className="w-6 h-6" />
            <span>Get Your Free Quote</span>
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

export default FurnitureRefinishingPage;
