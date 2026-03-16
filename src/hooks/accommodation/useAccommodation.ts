import {
  accommodationService,
  type GetAvailableAccommodationsParams,
} from "@/src/services/accommodationService";
import { useQuery } from "@tanstack/react-query";

export const useAccommodation = (params: GetAvailableAccommodationsParams) => {
  const search = params.search ?? "";

  return useQuery({
    queryKey: ["accommodations", { ...params, search }],
    queryFn: () => accommodationService.getAvailableAccommodations(params),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });
};
