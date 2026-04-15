import api from "@/src/config/axios";
import {
  AccommodationListing,
  LISTING_INFO,
} from "@/src/constants/accommodationdetail";
import { QueryByIdParams, QueryParams } from "@/src/types/filter";
import { ACCOMMODATION } from "@/src/types/listingTypes";
import { buildQueryString } from "@/src/utils/buildQueryString";

export type AccommodationResponse = {
  data: {
    listings: ACCOMMODATION[];
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
    console.log("Fetching accommodations with params:", params);
    // const currentPage = Math.max(1, params.page ?? 1);
    // const limit = params.limit ?? 5;
    // const total = mockAccommodation.length;
    // const start = (currentPage - 1) * limit;
    // const end = start + limit;
    // const listings = mockAccommodation.slice(start, end);
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const mockResponse: AccommodationResponse = {
    //       data: {
    //         listings,
    //         pagination: {
    //           count: listings.length,
    //           currentPage,
    //           limit,
    //           total,
    //         },
    //       },
    //     };

    //     resolve(mockResponse);
    //   }, 3000);
    // });

    const qs = buildQueryString(params);

    const response = await api.get(`/consumer/listings?${qs.toString()}`);
    console.log("API Response:", response.data); // Debug log
    return response.data;
  },

  getAccommodationDetails: async (
    id: QueryByIdParams,
  ): Promise<AccommodationListing | undefined> => {
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    // return {} as ACCOMMODATION; // Replace with actual API call when endpoint is readys
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "listing-en-001" === LISTING_INFO.id ? LISTING_INFO : undefined;
  },
};
