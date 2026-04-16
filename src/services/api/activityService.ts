import api from "@/src/config/axios";
import { QueryParams } from "@/src/types/filter";
import { ACTIVITY } from "@/src/types/listingTypes";
import { buildQueryString } from "@/src/utils/buildQueryString";

export type ActivityResponse = {
  data: {
    listings: ACTIVITY[];
    pagination?: {
      count: number;
      currentPage: number;
      limit: number;
      total: number;
    };
  };
};

export const activityService = {
  getAvailableActivities: async (
    params: QueryParams,
  ): Promise<ActivityResponse> => {
    const qs = buildQueryString(params);

    const response = await api.get(`/consumer/listings?${qs.toString()}`);
    return response.data;
  },

  getActivityById: async (id: string): Promise<ACTIVITY> => {
    await new Promise((r) => setTimeout(r, 1000));
    return [] as unknown as ACTIVITY;
  },
};
