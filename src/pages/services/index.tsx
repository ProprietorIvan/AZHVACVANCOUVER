import React from 'react';
import { Wrench } from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';
import Navigation from '../../components/Navigation';

interface Service {
  title: string;
  description: string;
  image: string;
  link: string;
}

const Services = () => {
  const services: Service[] = [
    {
      title: "General Handyman Services",
      description: "Comprehensive solutions for repairs, installations, and upgrades tailored to your needs.",
      image: "/photos/homepage/Handyman.jpg",
      link: '/general-handyman'
    },
    {
      title: "Drywall Installation & Repair",
      description: "Professional drywall services, including patching, installation, and painting.",
      image: "/photos/homepage/DrywallRepair.jpg",
      link: '/drywall'
    },
    {
      title: "Flood Repair",
      description: "Swift response to prevent further damage and ensure a seamless repair process.",
      image: "/photos/homepage/Flood-Restoration.jpg",
      link: '/flood-repair'
    },
    {
      title: "Demolition",
      description: "Professional demolition services for both residential and commercial projects. Safe and efficient execution.",
      image: "/photos/homepage/2.jpg",
      link: '/demolition'
    },
    {
      title: "Air Conditioning Services",
      description: "Regular servicing to keep your AC running efficiently and reliably.",
      image: "/photos/homepage/AirConditioning.jpg",
      link: '/hvac'
    }
  ];

  const handleOpenService = (link: string) => {
    window.open(link, '_current');
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Professional Handyman Services in Vancouver | A-Z Handyman</title>
        <meta name="description" content="Vancouver&apos;s trusted handyman service offering comprehensive solutions including repairs, installations, and maintenance." />
      </Head>

      <Navigation />
      
      <main className="pt-32 pb-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vancouver&apos;s Premier Handyman Services
          </h1>
          <p className="text-lg text-gray-600">
            One call solves all your home problems.
          </p>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => handleOpenService(service.link)}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-[400px]"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/70" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-base opacity-90">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;