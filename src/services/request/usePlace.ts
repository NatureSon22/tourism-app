import { useQuery } from "@tanstack/react-query";
import placeService, { PlaceParams } from "../api/placesService";

export const placeKeys = {
  all: ["places"] as const,
  lists: () => [...placeKeys.all, "list"] as const,
  list: (params: PlaceParams) => [...placeKeys.lists(), params] as const,
  detail: (id: string) => [...placeKeys.all, "detail", id] as const,
};

export const useGetPlaces = (params: PlaceParams) => {
  return useQuery({
    queryKey: placeKeys.list(params),
    queryFn: () => placeService.getPlaces(params),
    placeholderData: (previousData) => previousData,
    select: (data) => {
      return {
        ...data,
        data: data.data.map((place) => ({
          ...place,
          id: String(place.id),
        })),
      };
    },
  });
};

export const usePlaceDetails = (id: string) => {
  return useQuery({
    queryKey: placeKeys.detail(id),
    queryFn: () => placeService.getPlaceById(id),
    enabled: !!id,
  });
};
