import api from "@/src/config/axios";
import { Activity, PHILIPPINE_ACTIVITY_DATA } from "@/src/constants/activity";
import { QueryParams } from "@/src/types/filter";
import { ACTIVITY } from "@/src/types/listingTypes";
import { buildQueryString } from "@/src/utils/buildQueryString";

export type ActivityResponse = {
  data: {
    listings: ACTIVITY[];
    pagination: {
      count: number;
      currentPage: number;
      limit: number;
      total: number;
    };
  };
};

export const activityService = {
  /**
   * FETCH ALL ACTIVITIES
   * Handles Search and Sorting (Rating, etc.)
   */
  getAvailableActivities: async (
    params: QueryParams,
  ): Promise<ActivityResponse> => {
    const qs = buildQueryString(params);

    const response = await api.get(`/consumer/listings?${qs.toString()}`);
    return response.data;
  },

  /**
   * FETCH SINGLE ACTIVITY DETAIL
   */
  getActivityById: async (id: string): Promise<Activity | undefined> => {
    await new Promise((r) => setTimeout(r, 400));
    return PHILIPPINE_ACTIVITY_DATA.find((a) => a.id === id);
  },
};
