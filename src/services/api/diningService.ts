import api from "@/src/config/axios";
import { Dining } from "@/src/types/dining";
import { QueryParams } from "@/src/types/filter";
import { DINING } from "@/src/types/listingTypes";
import { buildQueryString } from "@/src/utils/buildQueryString";
import { PHILIPPINE_DINING_DATA } from "../../constants/dining";

export type DiningResponse = {
  data: {
    listings: DINING[];
    pagination: {
      count: number;
      currentPage: number;
      limit: number;
      total: number;
    };
  };
};

export const diningService = {
  getDiningData: async (params: QueryParams): Promise<DiningResponse> => {
    // const currentPage = Math.max(1, params.page ?? 1);
    // const limit = params.limit ?? 5;
    // const total = PHILIPPINE_DINING_DATA.length;
    // const start = (currentPage - 1) * limit;
    // const end = start + limit;
    // const listings = PHILIPPINE_DINING_DATA.slice(start, end).map((item) => ({
    //   ...item,
    //   id: String(item.id),
    // }));

    // await new Promise((resolve) => setTimeout(resolve, 800));

    // const mockResponse: DiningResponse = {
    //   data: {
    //     listings,
    //     pagination: {
    //       count: listings.length,
    //       currentPage,
    //       limit,
    //       total,
    //     },
    //   },
    // };

    const qs = buildQueryString(params);

    const response = await api.get(`/consumer/listings?${qs.toString()}`);
    console.log("API Response:", response.data);
    return response.data;
  },

  getDiningById: async (id: string): Promise<Dining | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return PHILIPPINE_DINING_DATA.find((item) => item.id === id);
  },
};

export default diningService;
