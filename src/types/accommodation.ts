import { BaseListing } from "./baseListing";

export type AccommodationBase = Omit<BaseListing, "id"> & {
  id: string;
};

export type Accommodation = AccommodationBase & {
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
  pricePerNight?: number;
  rating?: number;
  reviews: number;
  distanceFromCityCenter?: number;
  locationLabel?: string;
};

export type AccomodationResponse = {
  success: boolean;
  message: string;
  data: {
    listings: Accommodation[];
  };
};
