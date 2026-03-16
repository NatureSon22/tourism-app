import type { Activity } from "@/src/constants/activity";
import { PHILIPPINE_ACTIVITY_DATA } from "@/src/constants/activity";

export type GetAvailableActivitiesParams = {
  search?: string;
  filter?: string | null;
  area?: string | null;
  sort?: string | null;
};

export const activityService = {
  getAvailableActivities: async (
    params: GetAvailableActivitiesParams,
  ): Promise<Activity[]> => {
    const search = (params.search ?? "").trim().toLowerCase();

    // Dummy async boundary (swap with API call later)
    await new Promise((r) => setTimeout(r, 150));

    let list = (PHILIPPINE_ACTIVITY_DATA ?? []) as Activity[];

    if (search) {
      list = list.filter((a) => {
        const name = (a.name ?? "").toLowerCase();
        const location = (a.location ?? "").toLowerCase();
        return name.includes(search) || location.includes(search);
      });
    }

    // Placeholder: apply sort/filter when you wire sheets
    if (params.sort === "rating") {
      list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return list;
  },
};
