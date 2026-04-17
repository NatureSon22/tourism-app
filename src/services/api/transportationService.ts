import api from "@/src/config/axios";
import { SAMPLE_TRANSPORTATION_DETAIL } from "@/src/constants/data";
import { ListingDetailed } from "@/src/types/baseListing";
import { QueryParams } from "@/src/types/filter";
import { TRANSPORTATION } from "@/src/types/listingTypes";
import { buildQueryString } from "@/src/utils/buildQueryString";

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

const transportationService = {
  getTransportation: async (
    params: QueryParams,
  ): Promise<TransportationResponse> => {
    const qs = buildQueryString(params);

    const response = await api.get(`/consumer/listings?${qs.toString()}`);
    console.log("API Response:", response.data);
    return response.data;
  },

  getTransportationDetails: async (id: string): Promise<ListingDetailed> => {
    await new Promise((r) => setTimeout(r, 1000));
    return SAMPLE_TRANSPORTATION_DETAIL;
  },
};

export default transportationService;
