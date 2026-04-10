import { useQuery } from "@tanstack/react-query";
import locationService, { LocationParams } from "../api/locationService";

export const locationKeys = {
  all: ["locations"] as const,
  lists: () => [...locationKeys.all, "list"] as const,
  list: (params: LocationParams) => [...locationKeys.lists(), params] as const,
};

export const useLocations = (params: LocationParams) => {
  return useQuery({
    queryKey: locationKeys.list(params),
    queryFn: () => locationService.getLocations(params),
    placeholderData: (previousData) => previousData,
  });
};
