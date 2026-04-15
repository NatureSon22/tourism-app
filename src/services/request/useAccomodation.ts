import { QueryByIdParams, QueryParams } from "@/src/types/filter";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { accommodationService } from "../api/accommodationService";

export const accommodationKeys = {
  all: ["accommodations"] as const,
  lists: () => [...accommodationKeys.all, "list"] as const,
  list: (params: QueryParams) =>
    [...accommodationKeys.lists(), params] as const,
  details: () => [...accommodationKeys.all, "detail"] as const,
  detail: (id: string) => [...accommodationKeys.details(), id] as const,
};

export const useAccommodations = (params: QueryParams) => {
  return useInfiniteQuery({
    queryKey: accommodationKeys.list(params),

    queryFn: ({ pageParam = 1 }) =>
      accommodationService.getAvailableAccommodations({
        ...params,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, limit, total } = lastPage.data.pagination;

      // Calculate how many items we have fetched so far
      const itemsFetched = currentPage * limit;

      // If we haven't reached the total yet, go to the next page
      return itemsFetched < total ? currentPage + 1 : undefined;
    },
  });
};

export const useAccommodationDetails = (id: QueryByIdParams) => {
  return useQuery({
    queryKey: accommodationKeys.detail(id.id),
    queryFn: () => accommodationService.getAccommodationDetails(id),
    enabled: !!id.id,
    staleTime: 1000 * 60 * 5,
  });
};
