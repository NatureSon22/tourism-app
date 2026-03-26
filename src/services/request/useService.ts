import { QueryParams } from "@/src/types/filter";
import { useQuery } from "@tanstack/react-query";
import { localserviceService } from "../api/localserviceService";

export const serviceKeys = {
  all: ["services"] as const,
  lists: () => [...serviceKeys.all, "list"] as const,
  list: (params: QueryParams) => [...serviceKeys.lists(), params] as const,
  details: () => [...serviceKeys.all, "detail"] as const,
  detail: (id: string) => [...serviceKeys.details(), id] as const,
};

export const useGetServices = (params: QueryParams) => {
  return useQuery({
    queryKey: serviceKeys.list(params),
    queryFn: () => localserviceService.getAvailableServices(params),
  });
};
