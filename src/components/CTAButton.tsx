import React from "react";
import { Phone, ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/utils/analytics";

interface CTAButtonProps {
  text: string;
  onClick: () => void;
  location: string; // hero, mid_page, bottom, sticky
  page: string;
  variant?: "primary" | "secondary" | "outline";
  showPhoneIcon?: boolean;
  showArrow?: boolean;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Reusable CTA button component with analytics tracking
 * Tracks all CTA clicks with location and text for conversion analysis
 */
const CTAButton: React.FC<CTAButtonProps> = ({
  text,
  onClick,
  location,
  page,
  variant = "primary",
  showPhoneIcon = false,
  showArrow = true,
  className = "",
  fullWidth = false,
}) => {
  const handleClick = () => {
    trackCTAClick(location, text, page);
    onClick();
  };

  const baseClasses = `group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 ${
    fullWidth ? "w-full" : ""
  }`;

  const variantClasses = {
    primary:
      "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl",
    secondary:
      "bg-white text-gray-900 hover:bg-gray-50 shadow-lg hover:shadow-xl",
    outline:
      "bg-transparent text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white",
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={text}
      data-cta-location={location}
      data-cta-text={text}
    >
      {showPhoneIcon && <Phone className="w-6 h-6" />}
      <span>{text}</span>
      {showArrow && (
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      )}
    </button>
  );
};

export default CTAButton;
