import { useQuery } from "@tanstack/react-query";

import transportationService, {
  GetTransportationParams,
} from "../api/transportationService";

export const transportKeys = {
  all: ["transportation"] as const,
  lists: () => [...transportKeys.all, "list"] as const,
  list: (params: GetTransportationParams) =>
    [...transportKeys.lists(), params] as const,
  detail: (id: string) => [...transportKeys.all, "detail", id] as const,
};

export const useTransportation = (params: GetTransportationParams) => {
  return useQuery({
    queryKey: transportKeys.list(params),
    queryFn: () => transportationService.getTransportation(params),
    placeholderData: (prev) => prev,
  });
};

export const useTransportationDetails = (id: string) => {
  return useQuery({
    queryKey: transportKeys.detail(id),
    queryFn: () => transportationService.getTransportationById(id),
    enabled: !!id,
  });
};
