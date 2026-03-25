import { SAMPLE_ACCOMMODATIONS } from "@/src/constants/accomodations";
import { Accommodation } from "@/src/types/accommodation";
import { QueryParams } from "@/src/types/filter";

export type AccommodationResponse = {
  data: { listings: Accommodation[] };
  total?: number;
  page?: number;
  limit?: number;
};

export const accommodationService = {
  getAvailableAccommodations: async (
    params: QueryParams,
  ): Promise<AccommodationResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse: AccommodationResponse = {
          data: { listings: SAMPLE_ACCOMMODATIONS },
        };

        resolve(mockResponse);
      }, 1000);
    });

    // const qs = buildQueryString(params);
    // const response = await api.get(`/consumer/listings?${qs.toString()}`);
    // console.log("API Response:", response.data); // Debug log
    // return response.data;
  },
};
