import PLACE_LIST, { PlaceList } from "@/src/constants/placeList";
import { useQuery } from "@tanstack/react-query";

export type PlaceFilter = "Recommended" | "Nearby";

export const getPlaces = async ({
  filter,
  search,
}: {
  filter: PlaceFilter;
  search: string;
}): Promise<PlaceList[]> => {
  const normalized = search?.trim().toLowerCase();
  const filtered = PLACE_LIST.filter((place) => {
    if (!normalized) return true;
    return (
      place.name.toLowerCase().includes(normalized) ||
      place.location.toLowerCase().includes(normalized)
    );
  });

  if (filter === "Recommended") {
    return filtered.slice().sort((a, b) => b.rating - a.rating);
  }

  // Nearby (not enough data for real distance yet)
  return filtered;
};

export const useGetPlaces = (filter: PlaceFilter, search: string) => {
  return useQuery<PlaceList[], Error>({
    queryKey: ["places", { filter, search }],
    queryFn: () => getPlaces({ filter, search }),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    placeholderData: (previousData: PlaceList[] | undefined) => previousData,
  } as any);
};
