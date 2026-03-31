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
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function DiningPage() {
  const { openSheet } = useSingleSheet();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { currentSort, updateOptions, resetCategory } = useFilterStore(
    useShallow((state) => ({
      updateOptions: state.updateOptions,
      currentSort: state.categories.dining.options.sort,
      resetCategory: state.resetCategory,
    })),
  );

  useEffect(() => {
    return () => {
      resetCategory("dining");
    };
  }, []);

  const handleAreaPress = (area: string) => {
    openSheet(area, {
      options: DINING_SORT,
      selectedValue: currentSort,
      onSelect: (val: string) => updateOptions("dining", { sort: val }),
    });
  };

  return (
    <SafeArea edges={["bottom", "top"]}>
      <SearchableHeader
        search={search}
        setSearch={setSearch}
        title={"Food and Dining"}
      />

      <Screen style={styles.screen}>
        <FilterBar
          filters={DINING_FILTERS}
          onPress={handleAreaPress}
          containerStyle={styles.filterBarPadding}
        />

        <DiningList filter={debouncedSearch} search={debouncedSearch} />
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
