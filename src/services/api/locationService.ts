import LOCATIONS from "@/src/constants/location";
import { Location } from "@/src/types/forum";

export type LocationParams = {
  search: string;
};

export type GetLocationsResponse = {
  data: Location[];
};

const locationService = {
  getLocations: async ({
    search,
  }: LocationParams): Promise<GetLocationsResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const normalizedSearch = search?.trim().toLowerCase();

    const filteredLocations = LOCATIONS.filter((item) => {
      if (!normalizedSearch) return true;

      return (
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.address.toLowerCase().includes(normalizedSearch)
      );
    });

    return {
      data: filteredLocations,
    };
  },
};

export default locationService;
