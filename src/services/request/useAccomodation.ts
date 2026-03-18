import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import {
  accommodationService,
  GetAvailableAccommodationsParams,
} from "../api/accommodationService";

export const accommodationKeys = {
  all: ["accommodations"] as const,
  lists: () => [...accommodationKeys.all, "list"] as const,
  list: (params: GetAvailableAccommodationsParams) =>
    [...accommodationKeys.lists(), params] as const,
  details: () => [...accommodationKeys.all, "detail"] as const,
  detail: (id: string) => [...accommodationKeys.details(), id] as const,
};

export const useAccommodations = (params: GetAvailableAccommodationsParams) => {
  return useQuery({
    queryKey: accommodationKeys.list(params),
    queryFn: () => accommodationService.getAvailableAccommodations(params),
    placeholderData: (prev) => prev,
    select: (data) => {
      return {
        ...data,
        data: data.data.map((acc) => ({
          ...acc,
          id: String(acc.id),
        })),
      };
    },
  });
};

export const useAccommodationDetails = (id: string) => {
  return useQuery({
    queryKey: accommodationKeys.detail(id),
    queryFn: () => accommodationService.getAccommodationById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
};

export const useBookAccommodation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingData: {
      id: string;
      userId: string;
      dates: string[];
    }) =>
      // You can add 'postBooking' to your service later
      new Promise((resolve) =>
        setTimeout(() => resolve({ success: true }), 1500),
      ),

    onSuccess: (_, variables) => {
      // Refresh the specific accommodation to update availability/status
      queryClient.invalidateQueries({
        queryKey: accommodationKeys.detail(variables.id),
      });

      Alert.alert(
        "Booking Confirmed",
        "Your stay has been reserved successfully.",
      );
    },

    onError: () => {
      Alert.alert(
        "Booking Failed",
        "We couldn't process your request. Please try again.",
      );
    },
  });
};
