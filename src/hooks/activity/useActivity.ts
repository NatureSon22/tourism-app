import {
  activityService,
  type GetAvailableActivitiesParams,
} from "@/src/services/activityService";
import { useQuery } from "@tanstack/react-query";

export const useActivity = (params: GetAvailableActivitiesParams) => {
  return useQuery({
    queryKey: ["activities", params],
    queryFn: () => activityService.getAvailableActivities(params),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });
};
