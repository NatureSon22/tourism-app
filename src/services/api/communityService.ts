import { COMMUNITY_DATA } from "@/src/constants/communities";
import { QueryParams } from "@/src/types/filter";
import { Community } from "@/src/types/forum";

export type CommunityResponse = {
  data: Community[];
};

const communityService = {
  getCommunities: async (
    params: QueryParams = {},
  ): Promise<CommunityResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const normalizedSearch = params.search?.trim().toLowerCase();

    const listings = COMMUNITY_DATA.filter((community) => {
      if (!normalizedSearch) {
        return true;
      }
      return community.name.toLowerCase().includes(normalizedSearch);
    });

    return { data: listings };
  },
};

export default communityService;
