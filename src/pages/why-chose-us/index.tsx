import FAQ from "@/components/FAQ";
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
} from "lucide-react";

const WhyChooseUs = () => {
  const solutions = [
    {
      title: "24/7 Emergency Service",
      description:
        "When your HVAC fails, we respond. 2-hour guaranteed response time for urgent heating and cooling emergencies across Vancouver.",
      icon: Clock,
    },
    {
      title: "Transparent Pricing",
      description:
        "Know exactly what you'll pay with upfront cost breakdowns. No hidden fees—we provide detailed quotes before any work begins.",
      icon: DollarSign,
    },
    {
      title: "Licensed & Certified",
      description:
        "Our HVAC technicians are fully licensed, insured, and TECA certified. WorkSafeBC compliant with ongoing training.",
      icon: Shield,
    },
    {
      title: "100+ 5-Star Reviews",
      description:
        "Vancouver's most trusted HVAC contractor. Our track record speaks for itself—join thousands of satisfied customers.",
      icon: ThumbsUp,
    },
    {
      title: "All HVAC Systems",
      description:
        "Furnaces, AC units, heat pumps, ductless mini-splits, boilers, rooftop units, VRF systems—we service them all.",
      icon: Thermometer,
    },
    {
      title: "Satisfaction Guarantee",
      description:
        "Not happy with the results? We'll make it right. 100% satisfaction guaranteed on every service call.",
      icon: Wrench,
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Contact Us",
      description:
        "Call (778) 770-5721 or submit our online form with your HVAC needs.",
    },
    {
      number: "2",
      title: "Get a Free Quote",
      description:
        "Our licensed technician assesses your system and provides a detailed estimate.",
    },
    {
      number: "3",
      title: "Schedule Service",
      description:
        "Choose a time that works for you. Same-day and emergency service available.",
    },
    {
      number: "4",
      title: "Expert Installation or Repair",
      description:
        "Our certified technicians complete the work with quality craftsmanship and thorough cleanup.",
    },
  ];

  const stats = [
    { value: "100+", label: "5-Star Reviews" },
    { value: "750+", label: "Installations Completed" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "15+", label: "Certified Technicians" },
  ];

  return (
    <div className="bg-gray-50">
      <Navigation />
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AZ Air Conditioning and Heating
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <solution.icon className="w-6 h-6 text-yellow-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {solution.title}
                  </h3>
                </div>
                <p className="text-gray-600">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Simple 4-Step Process
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-16 w-full border-t-2 border-dashed border-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-lg p-6"
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-white/80">
                  {stat.label}
                </div>
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
