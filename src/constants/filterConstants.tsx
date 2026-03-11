export const FILTER_DEFAULTS = {
  selectedStar: 4,
  reviewScore: 3,
  propertyType: "hotel",
  accommodationType: [] as string[],
  amenities: [] as string[],
};

export const STAR_OPTIONS = [2, 3, 4, 5];
export const REVIEW_OPTIONS = [3, 3.5, 4, 4.5];
export const PROPERTY_TYPES = [
  { label: "Hotel", value: "hotel" },
  { label: "Resort", value: "resort" },
  { label: "Airbnb", value: "airbnb" },
];

export const ACCOMODATION_TYPES = [
  "Beach Hotel",
  "Budget Hotel",
  "Boutique Hotel",
  "Business Hotel",
  "Luxury Hotel",
];

export const AMMENITIES = [
  "24-hour front desk",
  "Free WiFi",
  "Free Parking",
  "Pool",
  "Gym",
  "Spa",
  "Airport Shuttle",
  "Restaurant",
  "Bar",
  "Pet Friendly",
];
