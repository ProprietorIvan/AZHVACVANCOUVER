import React, { useState, useEffect } from "react";
import { Phone, X } from "lucide-react";
import CTAButton from "./CTAButton";

interface StickyCTAProps {
  phoneNumber: string;
  ctaText: string;
  page: string;
  showAfterScroll?: number; // Show after scrolling X pixels
}

/**
 * Sticky/floating CTA component for mobile
 * Stays visible at bottom of screen while scrolling
 * Only shows on mobile devices
 */
const StickyCTA: React.FC<StickyCTAProps> = ({
  phoneNumber,
  ctaText,
  page,
  showAfterScroll = 300,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Show after scrolling
    const handleScroll = () => {
      if (!isDismissed && window.scrollY > showAfterScroll) {
        setIsVisible(true);
      } else if (window.scrollY <= showAfterScroll) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showAfterScroll, isDismissed]);

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  // Only show on mobile
  if (!isMobile || isDismissed || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-slide-up">
      <div className="bg-gray-900 text-white shadow-2xl border-t-2 border-yellow-400">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <button
            onClick={handlePhoneClick}
            className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-900 px-4 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            aria-label={`Call ${phoneNumber}`}
          >
            <Phone className="w-5 h-5" />
            <span>{ctaText}</span>
          </button>
          <button
            onClick={handleDismiss}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StickyCTA;
