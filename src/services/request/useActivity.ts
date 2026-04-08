import { QueryParams } from "@/src/types/filter";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { activityService } from "../api/activityService";

export const activityKeys = {
  all: ["activities"] as const,
  lists: () => [...activityKeys.all, "list"] as const,
  list: (params: QueryParams) => [...activityKeys.lists(), params] as const,
  details: () => [...activityKeys.all, "detail"] as const,
  detail: (id: string) => [...activityKeys.details(), id] as const,
};

export const useActivities = (params: QueryParams) => {
  return useInfiniteQuery({
    queryKey: activityKeys.list(params),
    queryFn: ({ pageParam = 1 }) =>
      activityService.getAvailableActivities({
        ...params,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, limit, total } = lastPage.data.pagination;
      const itemsFetched = currentPage * limit;
      return itemsFetched < total ? currentPage + 1 : undefined;
    },
    placeholderData: (prev) => prev,
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        data: {
          ...page.data,
          listings: page.data.listings.map((act) => ({
            ...act,
            id: String(act.id),
          })),
        },
      })),
    }),
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
      queryClient.invalidateQueries({
        queryKey: activityKeys.detail(activityId),
      });
    },
    onError: () => {},
  });
};
