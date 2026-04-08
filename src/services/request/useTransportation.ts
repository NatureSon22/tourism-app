import { QueryParams } from "@/src/types/filter";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import transportationService from "../api/transportationService";

export const transportKeys = {
  all: ["transportation"] as const,
  lists: () => [...transportKeys.all, "list"] as const,
  list: (params: QueryParams) => [...transportKeys.lists(), params] as const,
  detail: (id: string) => [...transportKeys.all, "detail", id] as const,
};

export const useTransportation = (params: QueryParams) => {
  return useInfiniteQuery({
    queryKey: transportKeys.list(params),
    queryFn: ({ pageParam = 1 }) =>
      transportationService.getTransportation({
        ...params,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, limit, total } = lastPage.data.pagination;
      const itemsFetched = currentPage * limit;
      return itemsFetched < total ? currentPage + 1 : undefined;
    },
  });
};

export const useTransportationDetails = (id: string) => {
  return useQuery({
    queryKey: transportKeys.detail(id),
    queryFn: () => transportationService.getTransportationById(id),
    enabled: !!id,
  });
};
