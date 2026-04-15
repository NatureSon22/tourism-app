import {
  PHILIPPINE_TRANSPORTATION_DATA,
  Transportation as RawTransportation,
} from "@/src/constants/transportationList";
import type { Address } from "@/src/types/baseListing";
import { QueryParams } from "@/src/types/filter";
import { TRANSPORTATION } from "@/src/types/listingTypes";

export type TransportationResponse = {
  data: {
    listings: TRANSPORTATION[];
    pagination: {
      count: number;
      currentPage: number;
      limit: number;
      total: number;
    };
  };
};

const mapTransportation = (item: RawTransportation): TRANSPORTATION => ({
  id: item.id,
  title: item.name,
  thumbnail: item.imageUrl,
  base_price: item.price,
  merchant_id: 0,
  module_id: 0,
  main_category_id: 0,
  status: "Active",
  highlights: item.location,
  email: "transportation@tourism.local",
  addresses: [
    {
      id: Number(item.id) || 0,
      listing_id: Number(item.id) || 0,
      lat: 0,
      lng: 0,
      formatted: item.location,
      region: "",
      region_code: "",
      province: "",
      province_code: "",
      city: item.location,
      city_code: "",
      barangay: "",
      street: "",
      postal_code: "",
      is_primary: true,
    } as Address,
  ],
  categories: [
    {
      id: Number(item.id) * 10 + 1,
      name: "Transportation",
      type: "PRIMARY",
    },
  ],
  rating: item.rating,
  reviews: item.reviews,
});

const transportationService = {
  getTransportation: async (
    params: QueryParams,
  ): Promise<TransportationResponse> => {
    await new Promise((r) => setTimeout(r, 1000));

    let list = PHILIPPINE_TRANSPORTATION_DATA;
    const search = params.search?.toLowerCase().trim();

    // 1. Filter by Search
    if (search) {
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.location.toLowerCase().includes(search),
      );
    }

    // 2. Apply Sorting
    if (params.sort === "price_low") {
      list.sort((a, b) => a.price - b.price);
    } else if (params.sort === "rating_high") {
      list.sort((a, b) => b.rating - a.rating);
    }

    const currentPage = Math.max(1, params.page ?? 1);
    const limitPerPage = params.limit ?? 6;
    const total = list.length;
    const start = (currentPage - 1) * limitPerPage;
    const end = start + limitPerPage;
    const listings = list.slice(start, end).map(mapTransportation);

    return {
      data: {
        listings,
        pagination: {
          count: listings.length,
          currentPage,
          limit: limitPerPage,
          total,
        },
      },
    };
  },

  getTransportationById: async (
    id: string,
  ): Promise<TRANSPORTATION | undefined> => {
    await new Promise((r) => setTimeout(r, 500));
    const transportation = PHILIPPINE_TRANSPORTATION_DATA.find(
      (item) => item.id === id,
    );
    return transportation ? mapTransportation(transportation) : undefined;
  },
};

export default transportationService;
