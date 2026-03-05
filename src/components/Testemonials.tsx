import React, { useState, useEffect, ReactNode, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  children: ReactNode;
  className?: string;
}

const TestimonialCard = ({ children, className }: TestimonialCardProps) => {
  return <div className={`${className || ""}`}>{children}</div>;
};

const Testimonials = () => {
  const hvacReviews = [
    {
      name: "Chris Anderson",
      role: "Vancouver Homeowner",
      text: "Excellent HVAC service! They installed a new AC unit and the work was professional and clean. The technician was knowledgeable and explained everything clearly. Great value and service!",
      image: "/photos/reviews/1.jpg",
      hasImage: true,
    },
    {
      name: "Michelle Brown",
      role: "Verified Customer",
      text: "Fast emergency response when our furnace broke down in winter. They fixed it quickly and the technician was professional and courteous. Highly recommend AZ Air Conditioning!",
      image: "/photos/reviews/2.jpg",
      hasImage: true,
    },
    {
      name: "Daniel Park",
      role: "Commercial Property Owner",
      text: "Outstanding commercial HVAC service. They maintain our office building's HVAC systems and always provide excellent service. Professional team with great attention to detail.",
      image: "/photos/reviews/3.jpg",
      hasImage: true,
    },
    {
      name: "Lisa Chen",
      role: "Vancouver Homeowner",
      text: "Best HVAC company in Vancouver! They installed a new heat pump system and the results are amazing. Energy efficient and quiet. Very satisfied with the installation and service.",
      hasImage: false,
    },
    {
      name: "Ryan Martinez",
      role: "Verified Customer",
      text: "Professional AC repair service. They diagnosed and fixed the issue quickly. The technician was friendly and explained what was wrong. Fair pricing and excellent workmanship.",
      hasImage: false,
    },
    {
      name: "Amanda Wilson",
      role: "Vancouver Homeowner",
      text: "Great HVAC maintenance service. They do regular tune-ups for our system and it's been running perfectly. Preventative maintenance has saved us from costly repairs. Highly recommend!",
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
      return nextIndex >= hvacReviews.length - (reviewsToShow.desktop - 1)
        ? 0
        : nextIndex;
    });
  }, [hvacReviews.length, reviewsToShow.desktop]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? hvacReviews.length - reviewsToShow.desktop
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

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AZ Air Conditioning and Heating",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
    review: hvacReviews.map((review) => ({
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
      <div className="max-w-7xl mx-auto relative">
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
            <span className="ml-2 text-xl font-semibold">4.9 / 100+ 5-star reviews</span>
          </div>
        </div>

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
              {hvacReviews.map((review, index) => (
                <div
                  key={`${review.name}-${index}`}
                  className="w-full min-w-full md:w-1/2 md:min-w-[50%] lg:w-1/3 lg:min-w-[33.333%] px-4"
                >
                  <TestimonialCard className="bg-white p-8 h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border border-gray-100">
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400 inline-block mr-1"
                          />
                        ))}
                      </div>

                      <blockquote className="flex-grow mb-6">
                        <p className="text-gray-600 leading-relaxed">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </blockquote>

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

        <div className="text-center mt-12">
          <a
            href="https://share.google/UlbXkjmSZ6dfHxgFR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors"
          >
            See all 100+ reviews on Google
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
