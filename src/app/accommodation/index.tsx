import AccommodationList from "@/src/components/app/accomodation/AccommodationList";
import FilterBar from "@/src/components/app/FilterBar";
import SearchableHeader from "@/src/components/app/SearchableHeader";
import { ACCOMMODATION_SORT } from "@/src/config/sort";
import { ACCOMMODATION_FILTERS } from "@/src/constants/filterOptions";
import { RADIUS } from "@/src/constants/radius";
import { Typography } from "@/src/constants/styles";
import useDebounce from "@/src/hooks/useDebounce";
import { useSingleSheet } from "@/src/hooks/useSingleSheet";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useFilterStore } from "@/src/stores/filterStore";
import { QueryParams } from "@/src/types/filter";
import getLocation from "@/src/utils/getLocation";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function AccommodationPage() {
  const { openSheet } = useSingleSheet();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();

  const { accommodationState, currentSort, updateOptions, resetCategory } =
    useFilterStore(
      useShallow((state) => ({
        accommodationState: state.categories.accommodation,
        currentSort: state.categories.accommodation.options.sort,
        updateOptions: state.updateOptions,
        resetCategory: state.resetCategory,
      })),
    );

  useEffect(() => {
    return () => {
      resetCategory("accommodation");
    };
  }, [resetCategory]);

  const params: QueryParams = useMemo(() => {
    return {
      search: debouncedSearch,
      area: accommodationState.options.area,
      sort: accommodationState.options.sort,
      rating: accommodationState.options.rating || undefined,
      type: accommodationState.options.type.type || undefined,
      subtypes: accommodationState.options.type.subtypes,
      amenities: accommodationState.options.amenities,
      lat: accommodationState.options.lat,
      lng: accommodationState.options.lng,
      radius: accommodationState.options.radius,
      page: 1,
      limit: 20,
      moduleId: moduleId,
    };
  }, [debouncedSearch, accommodationState, moduleId]);

  const handleAreaPress = (sheet: string) => {
    const payload =
      sheet === "sort-sheet"
        ? {
            options: ACCOMMODATION_SORT,
            selectedValue: currentSort,
            onSelect: async (val: string) => {
              let userCoords = null;

              // Trigger ONLY for distance sorting
              if (val === "distance_asc") {
                const coords = await getLocation();

                if (!coords) {
                  // Optional: Alert the user that location is required
                  alert("Location access is required to sort by distance.");
                  return;
                }
                userCoords = coords;
              }

              // Update store with both the sort method and the coordinates
              updateOptions("accommodation", {
                sort: val,
                lat: userCoords?.latitude,
                lng: userCoords?.longitude,
                radius: RADIUS.accommodation,
              });
            },
          }
        : undefined;

    openSheet(sheet, payload);
  };

  return (
    <SafeArea edges={["top", "bottom"]}>
      <SearchableHeader
        search={search}
        setSearch={setSearch}
        title="Accommodation"
      />

      <Screen style={styles.screen}>
        <FilterBar
          filters={ACCOMMODATION_FILTERS}
          onPress={handleAreaPress}
          containerStyle={styles.filterBar}
        />

        <AccommodationList params={params} />
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: 20,
    paddingBottom: 10,
    paddingTop: 0,
  },
  headerRow: {
    paddingHorizontal: 0,
  },
  searchContainer: {
    height: 40,
    flex: 1,
  },
  searchInput: {
    fontSize: 14,
    padding: 0,
    height: 25,
  },
  filterContainer: {
    paddingHorizontal: 10,
  },
  filterLabel: {
    fontFamily: Typography.family.semiBold,
    fontSize: 12.5,
  },
  filterBar: {
    paddingVertical: 10,
  },
});
