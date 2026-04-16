import { QueryByIdParams, QueryParams } from "@/src/types/filter";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { localserviceService } from "../api/localserviceService";

export const serviceKeys = {
  all: ["services"] as const,
  lists: () => [...serviceKeys.all, "list"] as const,
  list: (params: QueryParams) => [...serviceKeys.lists(), params] as const,
  details: () => [...serviceKeys.all, "detail"] as const,
  detail: (id: string) => [...serviceKeys.details(), id] as const,
};

export const useGetServices = (params: QueryParams) => {
  return useInfiniteQuery({
    queryKey: serviceKeys.list(params),
    queryFn: ({ pageParam = 1 }) =>
      localserviceService.getAvailableServices({
        ...params,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.data.pagination;
      if (!pagination) {
        return undefined;
      }
      const { currentPage, limit, total } = pagination;
      const itemsFetched = currentPage * limit;
      return itemsFetched < total ? currentPage + 1 : undefined;
    },
  });
};

export const useLocalServiceDetails = (id: QueryByIdParams) => {
  return useQuery({
    queryKey: serviceKeys.detail(id.id),
    queryFn: () => localserviceService.getLocalServiceDetails(id.id),
    enabled: !!id.id,
    staleTime: 1000 * 60 * 5,
  });
};
