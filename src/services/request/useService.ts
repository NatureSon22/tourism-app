import { QueryParams } from "@/src/types/filter";
import { useInfiniteQuery } from "@tanstack/react-query";
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
      const { currentPage, limit, total } = lastPage.data.pagination;
      const itemsFetched = currentPage * limit;
      return itemsFetched < total ? currentPage + 1 : undefined;
    },
  });
};
