import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Phone, Mail, Clock, MapPin, Send, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { sendLeadToGetTimber } from "@/utils/sendLeadToGetTimber";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let emailSent = false;
    let leadSent = false;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) emailSent = true;
    } catch (error) {
      console.error("Error sending email:", error);
    }

    try {
      const leadResult = await sendLeadToGetTimber({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: "",
        message: formData.message,
        serviceType: "HVAC Inquiry",
        leadSource: "AZ Air Conditioning Website - Contact Form",
      });
      if (leadResult.success && leadResult.leadCreated) leadSent = true;
    } catch (error) {
      console.error("Error sending lead:", error);
    }

    if (emailSent || leadSent) {
      setShowSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      alert("There was an error submitting your message. Please try again or call us directly at (778) 770-5721.");
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      content: "(778) 770-5721",
      link: "tel:+17787705721",
      desc: "24/7 emergency response",
    },
    {
      icon: Mail,
      title: "Email",
      content: "office@azhvac.ca",
      link: "mailto:office@azhvac.ca",
      desc: "2-hour reply guaranteed",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon–Sun: 8 AM – 6 PM",
      link: null,
      desc: "24/7 emergency available",
    },
    {
      icon: MapPin,
      title: "Visit",
      content: "922 Homer St, Vancouver",
      link: "https://maps.google.com/?q=922+Homer+St+Vancouver+BC",
      desc: "BC V6B 1T7",
    },
  ];

  return (
    <>
      <Head>
        <title>Contact Us | AZ Air Conditioning and Heating | Vancouver HVAC</title>
        <meta name="description" content="Get in touch with Vancouver's trusted HVAC contractor. Free estimates, 2-hour response. Call (778) 770-5721 or send a message." />
        <link rel="canonical" href="https://azhvac.ca/contact" />
      </Head>
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero */}
        <section className="relative h-[50vh] min-h-[320px] flex items-center pt-24">
          <div className="absolute inset-0">
            <Image
              src="/photos/homepage/slider.png"
              alt="Contact AZ HVAC Vancouver"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gray-900/60" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 w-full text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Let&apos;s Talk HVAC
            </h1>
            <p className="text-xl text-white/95 max-w-2xl mx-auto">
              Free estimate • 2-hour response • Vancouver-wide service
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative -mt-12 max-w-7xl mx-auto px-4 pb-24">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map((item, i) => {
                const card = (
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl hover:border-yellow-200 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                        <p className="text-gray-900 font-medium mt-0.5">{item.content}</p>
                        <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                      </div>
                      {item.link && (
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 flex-shrink-0 transition-colors" />
                      )}
                    </div>
                  </div>
                );
                return item.link ? (
                  <a key={i} href={item.link} target={item.link.startsWith("http") ? "_blank" : undefined} rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined} className="block group">
                    {card}
                  </a>
                ) : (
                  <div key={i} className="block group">{card}</div>
                );
              })}

              {/* Quick CTA */}
              <div className="bg-gray-900 rounded-2xl p-6 text-white">
                <p className="font-semibold mb-3">Need help right now?</p>
                <a
                  href="tel:+17787705721"
                  className="inline-flex items-center gap-2 bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call (778) 770-5721
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-10">
                {showSuccess ? (
                  <div className="py-16 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-8 max-w-sm">
                      We&apos;ll get back to you within 2 hours. Check your email for confirmation.
                    </p>
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                    <p className="text-gray-600 mb-8">Tell us about your HVAC needs. We respond within 2 hours.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">Phone *</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
                            placeholder="(778) 000-0000"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow resize-none"
                          placeholder="Describe your HVAC needs—AC repair, furnace installation, emergency service..."
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                      >
                        <Send className="w-5 h-5" />
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map / Location CTA */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
            <p className="text-gray-600 mb-6">922 Homer St, Vancouver, BC V6B 1T7</p>
            <Link
              href="https://maps.google.com/?q=922+Homer+St+Vancouver+BC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-yellow-600 transition-colors"
            >
              Get directions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
