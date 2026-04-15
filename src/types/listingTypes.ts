import { Listing } from "./baseListing";

export type ACCOMMODATION = Listing & {
  distanceFromCityCenter?: number;
  rating?: number;
  reviews?: number;
};

export type DINING = Listing & {
  distanceFromCityCenter?: number;
  rating?: number;
  reviews?: number;
  books?: number;
};

export type ACTIVITY = Listing & {
  distanceFromCityCenter?: number;
  rating?: number;
  reviews?: number;
  books?: number;
  prevPrice?: number;
};

export type EVENT = Listing & {
  distanceFromCityCenter?: number;
  rating?: number;
  reviews?: number;
  books?: number;
  prevPrice?: number;
};

export type TRANSPORTATION = Listing & {
  distanceFromCityCenter?: number;
  rating?: number;
  reviews?: number;
  books?: number;
  prevPrice?: number;
};

export type SERVICE = Listing & {
  distanceFromCityCenter?: number;
  rating?: number;
  reviews?: number;
  books?: number;
};
