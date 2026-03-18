import { useQuery } from "@tanstack/react-query";
import { Listing } from "@/src/constants/listings";
import { bookmarkService } from "@/src/services/api/bookmarkService";

export const bookmarkKeys = {
  all: ["bookmarks"] as const,
  lists: () => [...bookmarkKeys.all, "list"] as const,
  list: () => [...bookmarkKeys.lists(), "all"] as const,
  details: () => [...bookmarkKeys.all, "detail"] as const,
  detail: (id: string) => [...bookmarkKeys.details(), id] as const,
};

export const useBookmarks = () => {
  return useQuery<Listing[], Error>({
    queryKey: bookmarkKeys.list(),
    queryFn: () => bookmarkService.fetchBookmarks(),
    staleTime: 1000 * 60,
  });
};