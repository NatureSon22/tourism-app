import { Activity, PHILIPPINE_ACTIVITY_DATA } from "@/src/constants/activity";

export type GetAvailableActivitiesParams = {
  search?: string;
  filter?: string | null;
  area?: string | null;
  sort?: string | null;
};

export type ActivityResponse = {
  data: Activity[];
  total: number;
};

export const activityService = {
  /**
   * FETCH ALL ACTIVITIES
   * Handles Search and Sorting (Rating, etc.)
   */
  getAvailableActivities: async (
    params: GetAvailableActivitiesParams,
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
    if (params.area && params.area !== "all") {
      list = list.filter((a) => 
        a.location.toLowerCase().includes(params.area!.toLowerCase())
      );
    }

    // 3. Apply Sorting
    if (params.sort === "rating") {
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return {
      data: list,
      total: list.length,
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