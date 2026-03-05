import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Phone, Mail, Clock, MapPin, Send, Check } from "lucide-react";
import { useState } from "react";
import { sendLeadToGetTimber } from "@/utils/sendLeadToGetTimber";

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        emailSent = true;
      }
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

      if (leadResult.success && leadResult.leadCreated) {
        leadSent = true;
      }
    } catch (error) {
      console.error("Error sending lead:", error);
    }

    if (emailSent || leadSent) {
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } else {
      alert(
        "There was an error submitting your message. Please try again or call us directly at (778) 770-5721."
      );
    }

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "(778) 770-5721",
      link: "tel:+17787705721",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@azhvac.ca",
      link: "mailto:info@azhvac.ca",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon–Sun: 8 AM – 6 PM • 24/7 Emergency",
      link: null,
    },
    {
      icon: MapPin,
      title: "Address",
      content: "922 Homer St, Vancouver, BC V6B 1T7",
      link: "https://maps.google.com/?q=922+Homer+St+Vancouver+BC",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <section className="relative bg-black py-20 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Ready for Year-Round Comfort?
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto">
            Get in touch for a free HVAC estimate. 2-hour response guaranteed.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
                <item.icon className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              {item.link ? (
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-yellow-600 hover:text-yellow-700 transition-colors"
                >
                  {item.content}
                </a>
              ) : (
                <p className="text-gray-600">{item.content}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {showSuccess ? (
            <div className="p-8 flex flex-col items-center justify-center space-y-6 min-h-[400px]">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-medium text-gray-900">
                Message Sent Successfully!
              </h3>
              <div className="space-y-2 text-center">
                <p className="text-gray-600">
                  Thank you for contacting us. We&apos;ll get back to you shortly.
                </p>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className="mt-8 bg-black text-white px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Describe your HVAC needs..."
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactUs;
