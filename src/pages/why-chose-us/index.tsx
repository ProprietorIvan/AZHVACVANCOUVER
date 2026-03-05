import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Testemonials from "@/components/Testemonials";
import { Camera, Calendar, DollarSign, Shield, Activity, ThumbsUp } from "lucide-react";

const WhyChooseUs = () => {
  const solutions = [
    {
      title: "AI-Powered Quotes",
      description: "Get repair estimates within minutes by uploading a photo – no in-person visits required.",
      icon: Camera
    },
    {
      title: "Real-Time Scheduling",
      description: "Book appointments instantly with our calendar integration.",
      icon: Calendar
    },
    {
      title: "Transparent Pricing",
      description: "Know exactly what you'll pay with upfront cost breakdowns.",
      icon: DollarSign
    },
    {
      title: "Verified Professionals",
      description: "Our handymen are licensed, insured, and thoroughly background-checked.",
      icon: Shield
    },
    {
      title: "Progress Tracking",
      description: "Receive real-time updates, photos, and notifications as your project progresses.",
      icon: Activity
    },
    {
      title: "Satisfaction Guarantee",
      description: "Not happy with the results? We'll fix it or refund your money – no questions asked.",
      icon: ThumbsUp
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Snap a Photo",
      description: "Upload a picture of the issue through our app or website."
    },
    {
      number: "2",
      title: "Get an Instant Quote",
      description: "Our AI analyzes your request and provides an accurate estimate within minutes."
    },
    {
      number: "3",
      title: "Book Online",
      description: "Choose a time slot that works best for you from our real-time availability calendar."
    },
    {
      number: "4",
      title: "Get It Fixed",
      description: "A vetted handyman will arrive on time and complete the repair professionally."
    }
  ];

  const stats = [
    { value: "600+", label: "Happy Clients" },
    { value: "250+", label: "Projects Completed" },
    { value: "4.5/5", label: "Average Customer Rating" },
    { value: "4", label: "Qualified Team Members" }
  ];

  return (
    <div className="bg-gray-50">
      <Navigation />
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              We Offer Modern Solutions for Modern Homeowners
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <solution.icon className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">{solution.title}</h3>
                </div>
                <p className="text-gray-600">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Fix Your Home in 4 Simple Steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-16 w-full border-t-2 border-dashed border-blue-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-6">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm sm:text-base text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Testemonials />
      <FAQ />
      <Footer />
    </div>
  );
};

export default WhyChooseUs;