import React from 'react';
import { 
  Bot, 
  CalendarCheck, 
  DollarSign, 
  Shield, 
  ListTodo, 
  Heart 
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Bot />,
      title: "Instant AI-Powered Quotes",
      description: "Get accurate repair estimates in minutes by simply uploading photos - no more waiting days for in-person assessments."
    },
    {
      icon: <CalendarCheck />,
      title: "Smart Scheduling",
      description: "Book appointments instantly through our real-time calendar integration. Pick a time that works for you."
    },
    {
      icon: <DollarSign />,
      title: "Transparent Pricing",
      description: "Know exactly what you'll pay upfront with our detailed breakdowns covering labor and materials."
    },
    {
      icon: <Shield />,
      title: "Quality Assurance",
      description: "All our handymen are thoroughly vetted and background-checked for your peace of mind."
    },
    {
      icon: <ListTodo />,
      title: "Project Tracking",
      description: "Monitor your repair status in real-time with photo updates and progress notifications."
    },
    {
      icon: <Heart />,
      title: "Satisfaction Guarantee",
      description: "Not happy with the work? We'll make it right or your money back - no questions asked."
    }
  ];

  return (
    <section className="py-16 px-5" id="features">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
          Everything You Need for Hassle-Free Home Repairs
        </h2>
        <p className="text-lg mt-4 text-slate-600 dark:text-slate-400">
          Modern solutions for modern homeowners
        </p>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-16">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="bg-black dark:bg-slate-800 rounded-full flex justify-center items-center w-8 h-8 text-white text-lg">
                {feature.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;