import React, { useState, useEffect, ReactNode, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Droplets } from "lucide-react";
import Image from "next/image";

// Create a simple Card component instead of importing to avoid circular references
interface TestimonialCardProps {
  children: ReactNode;
  className?: string;
}

const TestimonialCard = ({ children, className }: TestimonialCardProps) => {
  return <div className={`${className || ""}`}>{children}</div>;
};

const Testimonials = () => {
  const floodReviews = [
    {
      name: "Sarah Johnson",
      role: "Vancouver Homeowner",
      text: "After a pipe burst in my basement, Felicita Holdings responded within an hour. Their flood restoration team was professional, efficient, and saved us thousands in potential damage. Couldn't recommend them more highly!",
      image: "/photos/reviews/1.jpg",
      hasImage: true,
    },
    {
      name: "Michael Chen",
      role: "Commercial Property Manager",
      text: "Managing multiple properties in Vancouver, I need reliable emergency flood services. Their 24/7 response team has saved us multiple times from serious water damage situations. Their thorough moisture detection and drying process is exceptional.",
      image: "/photos/reviews/2.jpg",
      hasImage: true,
    },
    {
      name: "Emily Rodriguez",
      role: "Restaurant Owner",
      text: "When our restaurant kitchen flooded overnight, we feared the worst. Felicita's team arrived quickly, extracted all the water, and had industrial dryers set up within hours. They saved our business from closing for repairs!",
      image: "/photos/reviews/3.jpg",
      hasImage: true,
    },
    {
      name: "Carlos Crespo",
      role: "Verified Customer",
      text: "Thank you Danny for doing a great job repairing the water damage and installing new drywall after our flooding incident. The whole experience was very pleasant, and I appreciate the team's responsiveness during such a stressful situation.",
      hasImage: false,
    },
    {
      name: "Anmol Virk",
      role: "Verified Customer",
      text: "Very satisfied with their flood restoration service and quality of work. Danny is very knowledgeable about water damage issues and gives his honest opinion. Their flood cleanup was thorough and prices are very reasonable.",
      hasImage: false,
    },
    {
      name: "Monty Gill",
      role: "Verified Customer",
      text: "Great emergency flood response and work ethic. They arrived quickly after our basement flooded, extracted all water efficiently, and prevented mold growth. Great prices and quality work!",
      hasImage: false,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviewsToShow = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= floodReviews.length - (reviewsToShow.desktop - 1)
        ? 0
        : nextIndex;
    });
  }, [floodReviews.length, reviewsToShow.desktop]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? floodReviews.length - reviewsToShow.desktop
        : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, handleNext]);

  // Schema markup is now a simple object (not rendered in component)
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Felicita Holdings - Vancouver Flood Restoration",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "6",
      bestRating: "5",
      worstRating: "1",
    },
    review: floodReviews.map((review) => ({
      "@type": "Review",
      datePublished: new Date().toISOString().split("T")[0],
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Person",
        name: review.name,
      },
      reviewBody: review.text,
    })),
  };

  return (
    <section className="py-16 px-5 bg-white relative overflow-hidden">
      {/* Background water pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/4">
          <Droplets className="w-96 h-96 text-[#8B2635] opacity-10" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Customer Stories
          </h2>
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="h-px w-16 bg-yellow-400" />
            <p className="text-lg text-gray-600">What Our Clients Say</p>
            <div className="h-px w-16 bg-yellow-400" />
          </div>
          <div className="flex justify-center items-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="ml-2 text-xl font-semibold">5.0</span>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / reviewsToShow.desktop)
                }%)`,
                transition: "transform 2s ease-in-out",
              }}
            >
              {floodReviews.map((review, index) => (
                <div
                  key={`${review.name}-${index}`}
                  className="w-full min-w-full md:w-1/2 md:min-w-[50%] lg:w-1/3 lg:min-w-[33.333%] px-4"
                >
                  <TestimonialCard className="bg-white p-8 h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border border-gray-100">
                    <div className="flex flex-col h-full">
                      {/* Star Rating */}
                      <div className="mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400 inline-block mr-1"
                          />
                        ))}
                      </div>

                      {/* Review Text */}
                      <blockquote className="flex-grow mb-6">
                        <p className="text-gray-600 leading-relaxed">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </blockquote>

                      {/* Reviewer Info */}
                      <div className="flex items-center">
                        {review.hasImage && review.image ? (
                          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                            <Image
                              src={review.image}
                              alt={review.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                            <span className="text-xl font-semibold text-gray-500">
                              {review.name[0]}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <p className="text-sm text-gray-500">{review.role}</p>
                        </div>
                      </div>
                    </div>
                  </TestimonialCard>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:translate-x-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Google Review Link */}
        <div className="text-center mt-12">
          <a
            href="https://g.co/kgs/MPxhuzL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors"
          >
            See all reviews on Google
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
