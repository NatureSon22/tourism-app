import { QueryByIdParams, QueryParams } from "@/src/types/filter";
import { showMutationError } from "@/src/utils/showMutationError";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { bookmarkService } from "../api/bookmarkService";
import { diningService } from "../api/diningService";
import { bookmarkKeys } from "./useBookmark";

// 1. Dining Key Factory
export const diningKeys = {
  all: ["dining"] as const,
  lists: () => [...diningKeys.all, "list"] as const,
  // Use a stable, primitive tuple for the list key to avoid cache churns
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
      const pagination = lastPage.data.pagination;
      if (!pagination) {
        return undefined;
      }

      const { currentPage, limit, total } = pagination;
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

export const useDiningDetails = (id: QueryByIdParams) => {
  return useQuery({
    queryKey: diningKeys.detail(id.id),
    queryFn: () => diningService.getDiningById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Keep fresh for 5 minutes
  });
};

type DiningBookmarkAction = {
  shouldBookmark: boolean;
};

export const useBookmarkDining = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; bookmarked?: boolean; message: string },
    unknown,
    DiningBookmarkAction
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
        queryKey: diningKeys.all,
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
        exact: false,
      });
    },
  });
};
