import {
  PHILIPPINE_TRANSPORTATION_DATA,
  Transportation,
} from "@/src/constants/transportationList";
import { QueryParams } from "@/src/types/filter";

export type TransportationResponse = {
  data: {
    listings: Transportation[];
    pagination: {
      count: number;
      currentPage: number;
      limit: number;
      total: number;
    };
  };
};

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
    const listings = list.slice(start, end);

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
  ): Promise<Transportation | undefined> => {
    await new Promise((r) => setTimeout(r, 500));
    return PHILIPPINE_TRANSPORTATION_DATA.find((item) => item.id === id);
  },
};

export default transportationService;
