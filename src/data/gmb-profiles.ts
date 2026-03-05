export interface GMBProfile {
  businessName: string;
  gmbUrl: string;
  placeId: string;
  serviceType: string;
  location: string;
  keyword: string;
  phone?: string;
  address?: string;
  rating?: number;
  reviewCount?: number;
}

export const gmbProfiles: Record<string, GMBProfile> = {
  "drywall": {
    businessName: "AZ DRYWALL PATCH & REPAIR",
    gmbUrl: "https://maps.app.goo.gl/YdJ6LyPD4VcgX88b6",
    placeId: "ChIJ0WJSFY5zhlQRqrpxltwDJyI",
    serviceType: "Drywall Repair",
    location: "Vancouver",
    keyword: "Vancouver Drywall Repair",
    rating: 5.0,
    reviewCount: 127,
  },
  "burnaby-drywall": {
    businessName: "ROCKEWELL DRYWALL REPAIR - BURNABY",
    gmbUrl: "https://share.google/LHu5AA51661fRJrvW",
    placeId: "ChIJgZMgK8V3hlQRqGCtLRDcZ3k",
    serviceType: "Drywall Repair",
    location: "Burnaby",
    keyword: "Drywall Repair near Burnaby BC",
    rating: 5.0,
    reviewCount: 89,
  },
  "flood-repair": {
    businessName: "VANCOUVER FLOOD RESTORATION AND EMERGENCY REPAIRS BY FELICITA",
    gmbUrl: "https://maps.app.goo.gl/MQKYo9rB2LQxmShu5",
    placeId: "ChIJ9cumL9xxhlQRyz6sK20H1Gs",
    serviceType: "Flood Restoration",
    location: "Vancouver",
    keyword: "Flood Restoration near Vancouver",
    rating: 5.0,
    reviewCount: 203,
  },
  "hvac": {
    businessName: "AZ AIR CONDITIONING AND HEATING",
    gmbUrl: "https://g.page/r/CZhLQFnJD-aZEAE/",
    placeId: "ChIJe39j5rFxhlQRmEtAWckP5pk",
    serviceType: "HVAC Services",
    location: "Vancouver",
    keyword: "Air Conditioning near Vancouver",
    rating: 4.9,
    reviewCount: 156,
  },
  "demolition": {
    businessName: "ROCKWELL PRIME DEMOLITION & ABATEMENT - VANCOUVER",
    gmbUrl: "https://share.google/xliIwZpZ3GHeX8b02",
    placeId: "ChIJ3frAVsFxhlQRyLtuZJ6VMOo",
    serviceType: "Demolition Services",
    location: "Vancouver",
    keyword: "Demolition company near Vancouver",
    rating: 5.0,
    reviewCount: 94,
  },
  "furniture-refinishing": {
    businessName: "AZ CLASSIC FURNITURE REFINISHING",
    gmbUrl: "https://g.co/kgs/uRguxjN",
    placeId: "ChIJtX09QpdxhlQRWowMrc2yY_c",
    serviceType: "Furniture Refinishing",
    location: "Vancouver",
    keyword: "Furniture Refinishing near Vancouver",
    rating: 5.0,
    reviewCount: 78,
  },
  "general-handyman": {
    businessName: "A-Z Handyman Vancouver",
    gmbUrl: "https://maps.app.goo.gl/MQKYo9rB2LQxmShu5",
    placeId: "ChIJ9cumL9xxhlQRyz6sK20H1Gs",
    serviceType: "General Handyman Services",
    location: "Vancouver",
    keyword: "handyman vancouver",
    rating: 4.8,
    reviewCount: 1000,
  },
};

export const getGMBProfile = (pageKey: string): GMBProfile | null => {
  return gmbProfiles[pageKey] || null;
};
