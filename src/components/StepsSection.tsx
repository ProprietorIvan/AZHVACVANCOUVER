import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

const StepsSection = () => {
  const metrics = [
    {
      value: "2200+",
      label: "HAPPY CLIENTS"
    },
    {
      value: "1000+",
      label: "PROJECTS COMPLETED"
    },
    {
      value: "4.8",
      label: "AVERAGE RATINGS"
    },
    {
      value: "15",
      label: "QUALIFIED STAFS"
    }
  ];

  const projects = [
    {
      id: 1,
      imgUrl: "/photos/homepage/renovation-services-2.jpg",
      alt: "Home renovation transformation - Professional renovation services in Vancouver",
      width: 800,
      height: 600
    },
    {
      id: 2,
      imgUrl: "/photos/homepage/Untitled-21-1.jpg",
      alt: "Living room renovation - Expert home improvement in Vancouver",
      width: 800,
      height: 600
    },
    {
      id: 3,
      imgUrl: "/photos/homepage/BeforeAfter.jpg",
      alt: "Floor renovation before and after - Quality flooring services in Vancouver",
      width: 800,
      height: 600
    },
    {
      id: 4,
      imgUrl: "/photos/homepage/1-90s-reno-before-and-after-listing-photos.jpg",
      alt: "Complete home renovation - Full-service home renovation in Vancouver",
      width: 800,
      height: 600
    },
    {
      id: 5,
      imgUrl: "/photos/homepage/introTileVR.jpg",
      alt: "Tile renovation work - Professional tile installation Vancouver",
      width: 800,
      height: 600
    },
    {
      id: 6,
      imgUrl: "/photos/homepage/house-renovation-cost-scaled-1.jpg",
      alt: "House renovation project - Affordable home renovation Vancouver",
      width: 800,
      height: 600
    }
  ];

  // Structured data for the success metrics
  const metricsStructuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "A-Z Handyman",
    "description": "Professional handyman and renovation services in Vancouver with over 2200 happy clients and 1000+ completed projects.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2200",
      "bestRating": "5",
      "worstRating": "1"
    },
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "15"
    }
  };

  // Structured data for the project gallery
  const galleryStructuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "A-Z Handyman Recent Projects Gallery",
    "description": "Gallery of recent renovation and home improvement projects completed by A-Z Handyman in Vancouver",
    "image": projects.map(project => ({
      "@type": "ImageObject",
      "contentUrl": `https://az-handyman.ca${project.imgUrl}`,
      "description": project.alt
    }))
  };

  return (
    <>
      <Head>
        <title>Our Success Rate & Recent Projects | A-Z Handyman Vancouver</title>
        <meta 
          name="description" 
          content="Discover our track record of success with 2200+ happy clients and 1000+ completed projects. View our recent renovation and home improvement projects in Vancouver."
        />
        <meta 
          name="keywords" 
          content="vancouver renovation, home improvement vancouver, renovation projects, home renovation gallery, handyman success rate"
        />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Our Success Rate & Recent Projects | A-Z Handyman Vancouver" />
        <meta 
          property="og:description" 
          content="Discover our track record of success with 2200+ happy clients and 1000+ completed projects. View our recent renovation projects."
        />
        <meta property="og:image" content={`https://az-handyman.ca${projects[0].imgUrl}`} />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(metricsStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryStructuredData) }}
        />
      </Head>

      <main className="w-full">
        <section className="w-full bg-black py-20" aria-label="Success Metrics">      
          <div className="max-w-6xl mx-auto px-4">
            <header className="text-center mb-16">
              <h1 className="text-4xl font-bold text-white mb-2">OUR SUCCESS RATE</h1>
              <div className="flex items-center justify-center">
                <div className="h-px w-12 bg-yellow-500"></div>
                <p className="text-white mx-4">What We have Done</p>
                <div className="h-px w-12 bg-yellow-500"></div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {metrics.map((metric, index) => (
                <article key={index} className="text-center">
                  <div className="flex flex-col items-center">
                    <div className="text-5xl font-bold text-white mb-2">{metric.value}</div>
                    <div className="h-px w-12 bg-yellow-500 mb-4"></div>
                    <div className="text-sm text-white tracking-wider">{metric.label}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-5" aria-label="Recent Projects">
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-2">RECENT PROJECTS</h2>
              <div className="flex items-center justify-center">
                <div className="h-px w-12 bg-yellow-500"></div>
                <p className="mx-4">A Small Gallery of Us</p>
                <div className="h-px w-12 bg-yellow-500"></div>
              </div>
              <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
                Lets see some of our top projects. You can ensure that every project on our platform 
                is rated and reviewed by their past customers. We come up with the results.
              </p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <article 
                  key={project.id} 
                  className="group relative overflow-hidden rounded-lg shadow-lg"
                >
                  <div className="relative w-full h-64">
                    <Image 
                      src={project.imgUrl}
                      alt={project.alt}
                      width={project.width}
                      height={project.height}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                      priority={project.id === 1}
                      quality={85}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default StepsSection;