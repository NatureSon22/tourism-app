import { useQuery } from "@tanstack/react-query";
import diningService, { GetDiningParams } from "../api/diningService";

// 1. Dining Key Factory
export const diningKeys = {
  all: ["dining"] as const,
  lists: () => [...diningKeys.all, "list"] as const,
  // Use a stable, primitive tuple for the list key to avoid cache churn
  list: (params: GetDiningParams) => [...diningKeys.lists(), params] as const,
  details: () => [...diningKeys.all, "detail"] as const,
  detail: (id: string) => [...diningKeys.details(), id] as const,
};

export const useDining = (params: GetDiningParams) => {
  return useQuery({
    queryKey: diningKeys.list(params),
    queryFn: () => diningService.getDiningData(params),
    select: (data) => {
      return {
        ...data,
        data: data.data.map((dining) => ({
          ...dining,
          id: String(dining.id),
        })),
      };
    },
  });
};

export const useDiningDetails = (id: string) => {
  return useQuery({
    queryKey: diningKeys.detail(id),
    queryFn: () => diningService.getDiningById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Keep fresh for 5 minutes
  });
};
