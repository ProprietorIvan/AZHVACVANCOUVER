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
  hvac: {
    businessName: "AZ AIR CONDITIONING AND HEATING",
    gmbUrl: "https://share.google/UlbXkjmSZ6dfHxgFR",
    placeId: "ChIJe39j5rFxhlQRmEtAWckP5pk",
    serviceType: "HVAC Services",
    location: "Vancouver",
    keyword: "Air Conditioning near Vancouver",
    phone: "+1 778-770-5721",
    address: "922 Homer St, Vancouver, BC V6B 1T7, Canada",
    rating: 4.9,
    reviewCount: 100,
  },
};

export const getGMBProfile = (pageKey: string): GMBProfile | null => {
  return gmbProfiles[pageKey] || null;
};
