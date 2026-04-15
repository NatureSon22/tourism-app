import DiningList from "@/src/components/app/dining/DiningList";
import FilterBar from "@/src/components/app/FilterBar";
import SearchableHeader from "@/src/components/app/SearchableHeader";
import { DINING_SORT } from "@/src/config/sort";
import { DINING_FILTERS } from "@/src/constants/filterOptions";
import { Colors } from "@/src/constants/styles";
import useDebounce from "@/src/hooks/useDebounce";
import { useSingleSheet } from "@/src/hooks/useSingleSheet";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useFilterStore } from "@/src/stores/filterStore";
import { QueryParams } from "@/src/types/filter";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function DiningPage() {
  const { openSheet } = useSingleSheet();
  const [searchLocal, setSearchLocal] = useState("");
  const debouncedSearch = useDebounce(searchLocal);
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();

  const { diningState, updateOptions, resetCategory, setSearch } =
    useFilterStore(
      useShallow((state) => ({
        diningState: state.categories.dining,
        updateOptions: state.updateOptions,
        resetCategory: state.resetCategory,
        setSearch: state.setSearch,
      })),
    );

  useEffect(() => {
    return () => {
      resetCategory("dining");
    };
  }, [resetCategory]);

  useEffect(() => {
    setSearch("dining", debouncedSearch);
  }, [debouncedSearch, setSearch]);

  const handleAreaPress = (area: string) => {
    openSheet(area, {
      options: DINING_SORT,
      selectedValue: diningState.options.sort,
      onSelect: (val: string) => updateOptions("dining", { sort: val }),
    });
  };

  const params = useMemo<QueryParams>(
    () => ({
      search: diningState.search,
      area: diningState.options.area,
      sort: diningState.options.sort,
      rating: diningState.options.rating || undefined,
      type: diningState.options.type.type || undefined,
      subtypes: diningState.options.type.subtypes,
      amenities: diningState.options.amenities,
      page: 1,
      moduleId: moduleId,
    }),
    [diningState, moduleId],
  );

  return (
    <SafeArea edges={["bottom", "top"]}>
      <SearchableHeader
        search={searchLocal}
        setSearch={setSearchLocal}
        title={"Food and Dining"}
      />

      <Screen style={styles.screen}>
        <FilterBar
          filters={DINING_FILTERS}
          onPress={handleAreaPress}
          containerStyle={styles.filterBarPadding}
        />

        <DiningList params={params} />
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: 20,
    paddingBottom: 10,
    paddingTop: 0,
    paddingHorizontal: 0,
    backgroundColor: Colors.overlay,
  },

  filterBarPadding: {
    paddingVertical: 10,
  },
});
