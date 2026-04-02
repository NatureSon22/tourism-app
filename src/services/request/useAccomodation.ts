import { QueryParams } from "@/src/types/filter";
import { useInfiniteQuery } from "@tanstack/react-query";
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
      const { currentPage, limit, count, total } = lastPage.data.pagination;
      // console.log("Pagination Info:", { currentPage, limit, count });
      const totalPages = Math.ceil(count / limit);

      // This return value becomes the 'pageParam' for the NEXT call
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};

// export const useAccommodationDetails = (id: string) => {
//   return useQuery({
//     queryKey: accommodationKeys.detail(id),
//     queryFn: () => accommodationService.getAccommodationById(id),
//     enabled: !!id,
//   });
// };
