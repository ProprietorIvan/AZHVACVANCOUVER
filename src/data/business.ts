export const business = {
  legalName: "Felicita Holdings Ltd.",
  brandName: "AZ Air Conditioning and Heating",
  shortBrandName: "AZ HVAC",
  parentOrg: {
    name: "Felicita Group",
    url: "https://www.felicita.group",
  },
  siteUrl: "https://azhvac.ca",
  email: "office@azhvac.ca",
  replyToEmail: "office@felicita-group.com",
  phone: {
    display: "(778) 770-5721",
    tel: "+17787705721",
  },
  address: {
    street: "922 Homer St",
    locality: "Vancouver",
    region: "BC",
    postalCode: "V6B 1T7",
    country: "CA",
    full: "922 Homer St, Vancouver, BC V6B 1T7",
  },
  geo: {
    latitude: "49.2766",
    longitude: "-123.1193",
  },
  worksafeBcNumber: "201008694",
  foundedYear: 2010,
  projectsCompleted: "750+",
  social: {
    facebook: "https://www.facebook.com/azhvac",
    instagram: "https://www.instagram.com/azhvac",
  },
  serviceAreaCities: [
    "Vancouver",
    "Burnaby",
    "Richmond",
    "Surrey",
    "North Vancouver",
    "Coquitlam",
    "New Westminster",
  ],
  aggregateRating: {
    ratingValue: "4.9",
    reviewCount: "100",
  },
  defaultOgImage: "https://azhvac.ca/photos/homepage/aircondtioning.png",
} as const;
