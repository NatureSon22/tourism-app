export type Accommodation = {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  category_id: string;
  longitude: number;
  latitude: number;
  created_at: string;
  updated_at: string;
  category_names: string[];
  category_types: ("PRIMARY" | "SECONDARY")[];
  imageUrl?: string;
  location?: string;
  pricePerNight?: number;
  rating?: number;
  reviews: number;
  distanceFromCityCenter?: number;
};

// export type Accommodation = {
//   id: string;
//   name: string;
//   location: string;
//   pricePerNight: number;
//   rating: number;
//   reviews: number;
//   imageUrl: string;
//   distanceFromCityCenter: number; // in kilometers
// };

export type AccomodationResponse = {
  success: boolean;
  message: string;
  data: {
    listings: Accommodation[];
  };
};
