export interface LocationConfig {
  slug: string;
  name: string;
  region: string;
  latitude: string;
  longitude: string;
  neighborhoods: string[];
  proofPoint: string;
}

export const locations: LocationConfig[] = [
  {
    slug: "burnaby",
    name: "Burnaby",
    region: "BC",
    latitude: "49.2488",
    longitude: "-122.9805",
    neighborhoods: [
      "Metrotown",
      "Brentwood",
      "Lougheed",
      "Edmonds",
      "Deer Lake",
      "Capitol Hill",
    ],
    proofPoint:
      "Trusted by Burnaby homeowners and property managers for reliable heating and cooling.",
  },
  {
    slug: "richmond",
    name: "Richmond",
    region: "BC",
    latitude: "49.1666",
    longitude: "-123.1336",
    neighborhoods: [
      "Steveston",
      "Brighouse",
      "Terra Nova",
      "Ironwood",
      "East Richmond",
      "Sea Island",
    ],
    proofPoint:
      "Serving Richmond condos, townhomes, and commercial HVAC across the city.",
  },
  {
    slug: "surrey",
    name: "Surrey",
    region: "BC",
    latitude: "49.1913",
    longitude: "-122.8490",
    neighborhoods: [
      "Whalley",
      "Guildford",
      "Newton",
      "Cloverdale",
      "South Surrey",
      "Fleetwood",
    ],
    proofPoint:
      "Fast HVAC response across Surrey's growing neighbourhoods.",
  },
  {
    slug: "north-vancouver",
    name: "North Vancouver",
    region: "BC",
    latitude: "49.3200",
    longitude: "-123.0724",
    neighborhoods: [
      "Lower Lonsdale",
      "Central Lonsdale",
      "Lynn Valley",
      "Edgemont",
      "Deep Cove",
      "Capilano",
    ],
    proofPoint:
      "Experienced with North Shore homes, strata requirements, and mountain-climate HVAC.",
  },
  {
    slug: "coquitlam",
    name: "Coquitlam",
    region: "BC",
    latitude: "49.2838",
    longitude: "-122.7932",
    neighborhoods: [
      "Coquitlam Centre",
      "Burke Mountain",
      "Maillardville",
      "Westwood Plateau",
      "Austin Heights",
    ],
    proofPoint:
      "Local technicians familiar with Coquitlam building styles and heating needs.",
  },
  {
    slug: "new-westminster",
    name: "New Westminster",
    region: "BC",
    latitude: "49.2057",
    longitude: "-122.9110",
    neighborhoods: [
      "Uptown",
      "Queensborough",
      "Sapperton",
      "Downtown",
      "Queens Park",
    ],
    proofPoint:
      "HVAC specialists serving New Westminster's diverse housing stock.",
  },
];

export const waveOneServices = [
  {
    slug: "hvac",
    label: "AC Repair & Installation",
    pageKey: "hvac",
    description: "Central air and ductless AC repair and installation.",
    heroImage: "/photos/homepage/aircondtioning.png",
  },
  {
    slug: "furnace-repair-vancouver",
    label: "Furnace Repair",
    pageKey: "furnace-repair-vancouver",
    description: "Gas and electric furnace repair and installation.",
    heroImage: "/photos/homepage/heating.png",
  },
  {
    slug: "heat-pump-vancouver",
    label: "Heat Pump",
    pageKey: "heat-pump-vancouver",
    description: "Energy-efficient heat pump installation and service.",
    heroImage: "/photos/homepage/boiler.png",
  },
  {
    slug: "hvac-maintenance-vancouver",
    label: "HVAC Maintenance",
    pageKey: "hvac-maintenance-vancouver",
    description: "Seasonal tune-ups and preventive maintenance plans.",
    heroImage: "/photos/homepage/hvacmaintance.png",
  },
  {
    slug: "emergency-hvac-vancouver",
    label: "Emergency HVAC",
    pageKey: "emergency-hvac-vancouver",
    description: "24/7 no-heat and no-cool emergency response.",
    heroImage: "/photos/homepage/24/7-response.png",
  },
] as const;

export const getLocation = (slug: string) =>
  locations.find((l) => l.slug === slug);

export const getAllLocationServicePaths = () => {
  const paths: Array<{ city: string; service: string }> = [];
  for (const location of locations) {
    for (const service of waveOneServices) {
      paths.push({ city: location.slug, service: service.slug });
    }
  }
  return paths;
};

export const getLocationServicePath = (city: string, service: string) =>
  `/locations/${city}/${service}`;
