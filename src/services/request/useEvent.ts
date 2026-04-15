import { QueryParams } from "@/src/types/filter";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Alert } from "react-native";
import eventService from "../api/eventService";

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
      const { currentPage, limit, total } = lastPage.data.pagination;
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

export const useEventDetails = (id: string) => {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => eventService.getEventById(id),
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
