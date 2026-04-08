import { QueryParams } from "@/src/types/filter";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { diningService } from "../api/diningService";

// 1. Dining Key Factory
export const diningKeys = {
  all: ["dining"] as const,
  lists: () => [...diningKeys.all, "list"] as const,
  // Use a stable, primitive tuple for the list key to avoid cache churn
  list: (params: QueryParams) => [...diningKeys.lists(), params] as const,
  details: () => [...diningKeys.all, "detail"] as const,
  detail: (id: string) => [...diningKeys.details(), id] as const,
};

export const useDining = (params: QueryParams) => {
  return useInfiniteQuery({
    queryKey: diningKeys.list(params),
    queryFn: ({ pageParam = 1 }) =>
      diningService.getDiningData({
        ...params,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, limit, total } = lastPage.data.pagination;
      const itemsFetched = currentPage * limit;
      return itemsFetched < total ? currentPage + 1 : undefined;
    },
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        data: {
          ...page.data,
          listings: page.data.listings.map((diningItem: any) => ({
            ...diningItem,
            id: String(diningItem.id),
          })),
        },
      })),
    }),
  });
};

export const useDiningDetails = (id: string) => {
  return useQuery({
    queryKey: diningKeys.detail(id),
    queryFn: () => diningService.getDiningById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Keep fresh for 5 minutes
  });
};
