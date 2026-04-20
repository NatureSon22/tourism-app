import { QueryByIdParams, QueryParams } from "@/src/types/filter";
import { showMutationError } from "@/src/utils/showMutationError";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { accommodationService } from "../api/accommodationService";
import { bookmarkService } from "../api/bookmarkService";
import { bookmarkKeys } from "./useBookmark";
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
      const pagination = lastPage.data.pagination;
      if (!pagination) {
        return undefined;
      }

      const { currentPage, limit, total } = pagination;

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

type BookmarkAction = {
  shouldBookmark: boolean;
};

export const useBookmarkAccommodation = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; bookmarked?: boolean; message: string },
    unknown,
    BookmarkAction
  >({
    mutationFn: ({ shouldBookmark }) =>
      shouldBookmark
        ? bookmarkService.addBookmark({
            bookmarkableId: id ?? "",
            bookmarkableType: "Listing",
          })
        : bookmarkService.removeBookmark(id ?? ""),
    onError: (error) => {
      showMutationError(error, "Failed to update bookmark");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: accommodationKeys.all,
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
        exact: false,
      });
    },
  });
};
