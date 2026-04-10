import communityService, {
    CommunityResponse,
} from "@/src/services/api/communityService";
import { QueryParams } from "@/src/types/filter";
import { useQuery } from "@tanstack/react-query";

export const communityKeys = {
  all: ["community"] as const,
  list: (params: QueryParams) =>
    [...communityKeys.all, "list", params] as const,
};

export const useCommunities = (params: QueryParams) => {
  return useQuery<CommunityResponse>({
    queryKey: communityKeys.list(params),
    queryFn: () => communityService.getCommunities(params),
  });
};
