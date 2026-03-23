// transform the the filter option, make the

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
  {
    type: "Hotels",
    subtypes: [
      "Business Hotel",
      "Beach Hotel",
      "Budget Hotel",
      "Boutique Hotel",
      "Luxury Hotel",
    ],
  },
  {
    type: "Resorts",
    subtypes: [
      "Beach Resort",
      "Mountain Resort",
      "Spa Resort",
      "Family Resort",
    ],
  },
  {
    type: "Lodges",
    subtypes: ["Mountain Lodge", "Safari Lodge", "Eco Lodge"],
  },
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
