export type QueryParams = {
  search?: string;
  area?: string[]; // Becomes ?area=Cebu&area=Bohol
  sort?: string; // popularity | review | distance
  rating?: number;
  type?: string; // e.g., "Hotels"
  subtypes?: string[]; // Becomes ?subtypes=Beach&subtypes=Luxury
  amenities?: string[]; // Becomes ?amenities=WiFi&amenities=Pool
  radius?: number; // For distance-based sorting, in meters
  lat?: number;
  lng?: number;
  // Pagination
  page?: number;
  limit?: number;
};

export interface FilterState {
  search: string;
  options: {
    area: string[];
    sort: "popularity" | "review" | "distance";
    filter: {
      rating: number;
      type: {
        type: string;
        subtypes: string[];
      };
      amenities: string[];
    };
  };
}
