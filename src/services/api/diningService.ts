import { QueryParams } from "@/src/types/filter";
import { Dining, PHILIPPINE_DINING_DATA } from "../../constants/dining";
import { AccommodationResponse } from "./accommodationService";

export const diningService = {
  getDiningData: async (
    params: QueryParams,
  ): Promise<AccommodationResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockResponse: AccommodationResponse = {
      data: { listings: PHILIPPINE_DINING_DATA as unknown as any },
      total: PHILIPPINE_DINING_DATA.length,
    };

    // const qs = buildQueryString(params);
    // const response = await api.get(`/consumer/listings?${qs.toString()}`);
    // console.log("API Response:", response.data);
    // return response.data;

    return mockResponse;
  },

  getDiningById: async (id: string): Promise<Dining | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return PHILIPPINE_DINING_DATA.find((item) => item.id === id);
  },
};

export default diningService;
