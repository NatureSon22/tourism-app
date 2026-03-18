import PLACE_LIST, { PlaceList } from "@/src/constants/placeList";

export type PlaceFilter = "Recommended" | "Nearby";

export type PlaceParams = {
  filter: PlaceFilter;
  search: string;
};

export type GetPlaceResponse = {
  data: PlaceList[];
  total: number;
};

const placeService = {
  getPlaces: async ({
    filter,
    search,
  }: PlaceParams): Promise<GetPlaceResponse> => {
    await new Promise((r) => setTimeout(r, 1000));

    const normalized = search?.trim().toLowerCase();

    let result = PLACE_LIST.filter((place) => {
      if (!normalized) return true;
      return (
        place.name.toLowerCase().includes(normalized) ||
        place.location.toLowerCase().includes(normalized)
      );
    });

    return {
      data: result,
      total: result.length,
    };
  },

  getPlaceById: async (id: string): Promise<PlaceList | undefined> => {
    await new Promise((r) => setTimeout(r, 500));
    return PLACE_LIST.find((place) => place.id === id);
  },
};

export default placeService;
