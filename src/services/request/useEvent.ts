import { QueryByIdParams, QueryParams } from "@/src/types/filter";
import { showMutationError } from "@/src/utils/showMutationError";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Alert } from "react-native";
import { bookmarkService } from "../api/bookmarkService";
import eventService from "../api/eventService";
import { bookmarkKeys } from "./useBookmark";

const eventKeys = {
  all: ["events"] as const,
  lists: () => [...eventKeys.all, "list"] as const,
  list: (params: QueryParams) => [...eventKeys.lists(), params] as const,
  details: () => [...eventKeys.all, "detail"] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
};

export const useEvents = (params: QueryParams) => {
  return useInfiniteQuery({
    queryKey: eventKeys.list(params),
    queryFn: ({ pageParam = 1 }) =>
      eventService.getEventData({
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
    placeholderData: (prev) => prev,
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        data: {
          ...page.data,
          listings: page.data.listings.map((event) => ({
            ...event,
            formattedDate: (event as { formattedDate?: string }).formattedDate,
          })),
        },
      })),
    }),
  });
};

export const useEventDetails = (id: QueryByIdParams) => {
  return useQuery({
    queryKey: eventKeys.detail(id.id),
    queryFn: () => eventService.getEventById(id.id),
    enabled: !!id, // Prevent running if ID is missing
    staleTime: 1000 * 60 * 5, // Keep detail fresh for 5 mins
  });
};

export const useRegisterEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, userId }: { eventId: number; userId: number }) =>
      eventService.registerForEvent(eventId, userId),

    // Logic after successful registration
    onSuccess: (data, variables) => {
      // 1. Refresh this specific event's details (e.g., to update attendee count)
      queryClient.invalidateQueries({
        queryKey: eventKeys.detail(variables.eventId.toString()),
      });

      // 2. Optionally refresh the lists if status labels (e.g., "Joined") change
      // queryClient.invalidateQueries({ queryKey: eventKeys.lists() });

      Alert.alert("Success", "You are now registered for this event!");
    },

    onError: (error) => {
      Alert.alert("Registration Failed", "Please try again later.");
      console.error("Mutation Error:", error);
    },
  });
};

type EventBookmarkAction = {
  shouldBookmark: boolean;
};

export const useBookmarkEvent = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; bookmarked?: boolean; message: string },
    unknown,
    EventBookmarkAction
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
        queryKey: eventKeys.all,
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
        exact: false,
      });
    },
  });
};
