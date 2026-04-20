import { QueryByIdParams, QueryParams } from "@/src/types/filter";
import { showMutationError } from "@/src/utils/showMutationError";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { bookmarkService } from "../api/bookmarkService";
import transportationService from "../api/transportationService";
import { bookmarkKeys } from "./useBookmark";

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

export const useTransportationDetails = (id: QueryByIdParams) => {
  return useQuery({
    queryKey: transportKeys.detail(id.id),
    queryFn: () => transportationService.getTransportationDetails(id.id),
    enabled: !!id,
  });
};

type TransportationBookmarkAction = {
  shouldBookmark: boolean;
};

export const useBookmarkTransportation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; bookmarked?: boolean; message: string },
    unknown,
    TransportationBookmarkAction
  >({
    mutationFn: ({ shouldBookmark }) =>
      shouldBookmark
        ? bookmarkService.addBookmark({
            bookmarkableId: id ?? "",
            bookmarkableType: "Listing",
          })
        : bookmarkService.removeBookmark(id),
    onError: (error) => {
      showMutationError(error, "Failed to update bookmark");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transportKeys.all,
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
        exact: false,
      });
    },
  });
};
