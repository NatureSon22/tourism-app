import { QueryParams } from "@/src/types/filter";
import { useQuery } from "@tanstack/react-query";
import { accommodationService } from "../api/accommodationService";

export const accommodationKeys = {
  all: ["accommodations"] as const,
  lists: () => [...accommodationKeys.all, "list"] as const,
  list: (params: QueryParams) =>
    [...accommodationKeys.lists(), params] as const,
  details: () => [...accommodationKeys.all, "detail"] as const,
  detail: (id: string) => [...accommodationKeys.details(), id] as const,
};

export const useAccommodations = (params: QueryParams) => {
  return useQuery({
    queryKey: accommodationKeys.list(params),
    queryFn: () => accommodationService.getAvailableAccommodations(params),
  });
};

// export const useAccommodationDetails = (id: string) => {
//   return useQuery({
//     queryKey: accommodationKeys.detail(id),
//     queryFn: () => accommodationService.getAccommodationById(id),
//     enabled: !!id,
//   });
// };
