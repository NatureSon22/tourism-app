import {
  BookmarkResponse,
  bookmarkService,
} from "@/src/services/api/bookmarkService";
import { QueryParams } from "@/src/types/filter";
import { showMutationError } from "@/src/utils/showMutationError";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type InfiniteData,
  type UseInfiniteQueryResult,
} from "@tanstack/react-query";

export const bookmarkKeys = {
  all: ["bookmarks"] as const,
  lists: () => [...bookmarkKeys.all, "list"] as const,
  list: (params?: QueryParams) =>
    [...bookmarkKeys.lists(), "all", params] as const,
  details: () => [...bookmarkKeys.all, "detail"] as const,
  detail: (id: string) => [...bookmarkKeys.details(), id] as const,
};

export type BookmarkPage = BookmarkResponse;

export const useBookmarks = (
  params?: QueryParams,
): UseInfiniteQueryResult<InfiniteData<BookmarkResponse>, Error> => {
  return useInfiniteQuery<
    BookmarkResponse,
    Error,
    InfiniteData<BookmarkResponse>,
    ReturnType<typeof bookmarkKeys.list>,
    number
  >({
    queryKey: bookmarkKeys.list(params),
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      bookmarkService.fetchBookmarksPage({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.pagination;
      if (!pagination) return undefined;

      const { currentPage, limit, total } = pagination;
      const itemsFetched = currentPage * limit;
      return itemsFetched < total ? currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60,
  });
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookmarkId: string) =>
      bookmarkService.removeBookmark(bookmarkId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
        exact: false,
      });
    },
    onError: (error) => {
      showMutationError(error, "Failed to delete bookmark");
    },
  });
};
