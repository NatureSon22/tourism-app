import api from "@/src/config/axios";
import { Accommodation } from "@/src/types/accommodation";
import { QueryParams } from "@/src/types/filter";
import { buildQueryString } from "@/src/utils/buildQueryString";

// "pagination": {"count": 10, "currentPage": 1, "limit": 10}},

export type AccommodationResponse = {
  data: {
    listings: Accommodation[];
    pagination: {
      count: number;
      currentPage: number;
      limit: number;
      total: number;
    };
  };
};

export const accommodationService = {
  getAvailableAccommodations: async (
    params: QueryParams,
  ): Promise<AccommodationResponse> => {
    // return new Promise((resolve) => {

    //   setTimeout(() => {
    //     const mockResponse: AccommodationResponse = {
    //       data: { listings: SAMPLE_ACCOMMODATIONS },
    //     };

    //     resolve(mockResponse);
    //   }, 1000);
    // });

    const qs = buildQueryString(params);

    console.log("Fetching accommodations with query string:", qs); // Debug log

    const response = await api.get(`/consumer/listings?${qs.toString()}`);
    console.log("API Response:", response.data); // Debug log
    return response.data;
  },
};
