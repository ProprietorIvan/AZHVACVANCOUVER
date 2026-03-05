import React from "react";
import { Shield, Award, CheckCircle2, Clock } from "lucide-react";

interface TrustBadgesProps {
  showCertifications?: boolean;
  showResponseTime?: boolean;
}

/**
 * Trust badges component to display certifications, licenses, and trust signals
 * Helps build credibility and improve conversion rates
 */
const TrustBadges: React.FC<TrustBadgesProps> = ({
  showCertifications = true,
  showResponseTime = true,
}) => {
  const badges = [
    {
      icon: <Shield className="w-6 h-6" />,
      text: "Licensed & Insured",
      highlight: true,
    },
    {
      icon: <Award className="w-6 h-6" />,
      text: "500+ Projects Completed",
      highlight: false,
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      text: "100% Satisfaction Guarantee",
      highlight: false,
    },
    ...(showResponseTime
      ? [
          {
            icon: <Clock className="w-6 h-6" />,
            text: "2-Hour Response Time",
            highlight: true,
          },
        ]
      : []),
    ...(showCertifications
      ? [
          {
            icon: <Award className="w-6 h-6" />,
            text: "TECA Certified",
            highlight: false,
          },
        ]
      : []),
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 ${
                badge.highlight
                  ? "bg-gray-900 text-white shadow-lg"
                  : "bg-white text-gray-900 shadow-md hover:shadow-lg"
              }`}
            >
              <div
                className={`mb-3 ${
                  badge.highlight ? "text-white" : "text-gray-900"
                }`}
              >
                {badge.icon}
              </div>
              <p
                className={`text-sm font-semibold ${
                  badge.highlight ? "text-white" : "text-gray-900"
                }`}
              >
                {badge.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
