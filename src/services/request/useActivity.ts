import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  activityService,
  GetAvailableActivitiesParams,
} from "../api/activityService";

export const activityKeys = {
  all: ["activities"] as const,
  lists: () => [...activityKeys.all, "list"] as const,
  list: (params: GetAvailableActivitiesParams) =>
    [...activityKeys.lists(), params] as const,
  details: () => [...activityKeys.all, "detail"] as const,
  detail: (id: string) => [...activityKeys.details(), id] as const,
};

export const useActivities = (params: GetAvailableActivitiesParams) => {
  return useQuery({
    queryKey: activityKeys.list(params),
    queryFn: () => activityService.getAvailableActivities(params),
    placeholderData: (prev) => prev,
    select: (data) => {
      return {
        ...data,
        data: data.data.map((act) => ({
          ...act,
          id: String(act.id),
        })),
      };
    },
  });
};

export const useActivityDetails = (id: string) => {
  return useQuery({
    queryKey: activityKeys.detail(id),
    queryFn: () => activityService.getActivityById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useBookActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityId: string) =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ success: true }), 1000),
      ),

    onSuccess: (_, activityId) => {
      // Refresh the specific activity detail
      queryClient.invalidateQueries({
        queryKey: activityKeys.detail(activityId),
      });
    },
    onError: () => {},
  });
};
