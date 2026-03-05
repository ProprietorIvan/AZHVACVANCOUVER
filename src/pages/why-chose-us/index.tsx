import FAQ from "@/components/FAQ";
import RelatedServices from "@/components/RelatedServices";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Testemonials from "@/components/Testemonials";
import {
  Clock,
  DollarSign,
  Shield,
  ThumbsUp,
  Thermometer,
  Wrench,
  Phone,
  FileText,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const WhyChooseUs = () => {
  const solutions = [
    {
      title: "24/7 Emergency Service",
      description: "When your HVAC fails, we respond. 2-hour guaranteed response time for urgent heating and cooling emergencies across Vancouver.",
      icon: Clock,
    },
    {
      title: "Transparent Pricing",
      description: "Know exactly what you'll pay with upfront cost breakdowns. No hidden fees—we provide detailed quotes before any work begins.",
      icon: DollarSign,
    },
    {
      title: "Licensed & Certified",
      description: "Our HVAC technicians are fully licensed, insured, and TECA certified. WorkSafeBC compliant with ongoing training.",
      icon: Shield,
    },
    {
      title: "100+ 5-Star Reviews",
      description: "Vancouver's most trusted HVAC contractor. Our track record speaks for itself—join thousands of satisfied customers.",
      icon: ThumbsUp,
    },
    {
      title: "All HVAC Systems",
      description: "Furnaces, AC units, heat pumps, ductless mini-splits, boilers, rooftop units, VRF systems—we service them all.",
      icon: Thermometer,
    },
    {
      title: "Satisfaction Guarantee",
      description: "Not happy with the results? We'll make it right. 100% satisfaction guaranteed on every service call.",
      icon: Wrench,
    },
  ];

  const steps = [
    { icon: Phone, title: "Contact Us", desc: "Call (778) 770-5721 or submit our online form with your HVAC needs." },
    { icon: FileText, title: "Get a Free Quote", desc: "Our licensed technician assesses your system and provides a detailed estimate." },
    { icon: Calendar, title: "Schedule Service", desc: "Choose a time that works for you. Same-day and emergency service available." },
    { icon: CheckCircle2, title: "Expert Service", desc: "Our certified technicians complete the work with quality craftsmanship and thorough cleanup." },
  ];

  const stats = [
    { value: "100+", label: "5-Star Reviews" },
    { value: "750+", label: "Installations" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "15+", label: "Certified Techs" },
  ];

  return (
    <>
      <Head>
        <title>Why Choose Us | AZ Air Conditioning and Heating | Vancouver HVAC</title>
        <meta name="description" content="Why Vancouver homeowners trust AZ Air Conditioning and Heating: 24/7 emergency service, transparent pricing, licensed technicians, 100+ 5-star reviews." />
        <link rel="canonical" href="https://azhvac.ca/why-chose-us" />
      </Head>
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero */}
        <section className="relative h-[55vh] min-h-[380px] flex items-center pt-24">
          <div className="absolute inset-0">
            <Image
              src="/photos/homepage/heating.png"
              alt="Why Choose AZ HVAC Vancouver"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gray-900/55" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 w-full text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Why Choose AZ
            </h1>
            <p className="text-xl text-white/95 max-w-2xl mx-auto">
              Vancouver&apos;s most trusted HVAC contractor—backed by 100+ 5-star reviews
            </p>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                What Sets Us Apart
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From emergency response to transparent pricing—here&apos;s why Vancouver homeowners choose us
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((item, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl hover:border-yellow-200 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-colors">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4-Step Process */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
                SIMPLE • FAST • EFFICIENT
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our 4-Step Process
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From first call to completed service—we make HVAC simple
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex w-16 h-16 bg-gray-900 rounded-2xl items-center justify-center mb-6 mx-auto">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-bold text-gray-500 mb-2">STEP {i + 1}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Get Your Free Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">{stat.value}</div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testemonials />
        <div className="bg-gray-50">
          <RelatedServices currentPage="why-chose-us" />
        </div>
        <FAQ />
        <Footer />
      </div>
    </>
  );
};

export default WhyChooseUs;
