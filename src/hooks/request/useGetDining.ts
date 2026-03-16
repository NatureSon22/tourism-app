import diningService from "@/src/services/dining";
import { useQuery } from "@tanstack/react-query";

export const useGetDining = (filter: string, search: string) => {
  return useQuery<any[]>({
    queryKey: ["dining", { filter, search }],
    queryFn: () => diningService.getDiningData({ filter, search }),
  });
};
