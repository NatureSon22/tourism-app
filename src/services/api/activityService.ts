import { Activity, PHILIPPINE_ACTIVITY_DATA } from "@/src/constants/activity";
import { QueryParams } from "@/src/types/filter";

export type ActivityResponse = {
  data: {
    listings: Activity[];
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
    const search = (params.search ?? "").trim().toLowerCase();

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    let list = [...(PHILIPPINE_ACTIVITY_DATA ?? [])];

    // 1. Filter by Search
    if (search) {
      list = list.filter((a) => {
        const name = (a.name ?? "").toLowerCase();
        const location = (a.location ?? "").toLowerCase();
        return name.includes(search) || location.includes(search);
      });
    }

    // 2. Filter by Area
    if (params.area && params.area.length > 0) {
      list = list.filter((a) =>
        params.area!.some((area) =>
          a.location.toLowerCase().includes(area.toLowerCase()),
        ),
      );
    }

    // 3. Apply Sorting
    if (params.sort === "rating") {
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    // const qs = buildQueryString(params);
    // const response = await api.get(`/consumer/listings?${qs.toString()}`);
    // console.log("API Response:", response.data);
    // return response.data;

    const currentPage = Math.max(1, params.page ?? 1);
    const limit = params.limit ?? 5;
    const total = list.length;
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    const listings = list.slice(start, end);

    return {
      data: {
        listings,
        pagination: {
          count: listings.length,
          currentPage,
          limit,
          total,
        },
      },
    };
  },

  /**
   * FETCH SINGLE ACTIVITY DETAIL
   */
  getActivityById: async (id: string): Promise<Activity | undefined> => {
    await new Promise((r) => setTimeout(r, 400));
    return PHILIPPINE_ACTIVITY_DATA.find((a) => a.id === id);
  },
};
