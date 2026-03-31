import FilterBar from "@/src/components/app/FilterBar";
import SearchableHeader from "@/src/components/app/SearchableHeader";
import TransportationList from "@/src/components/app/transportation/TransportationList";
import { TRANSPORTATION_SORT } from "@/src/config/sort";
import { TRANSPORTATION_FILTERS } from "@/src/constants/filterOptions";
import { Colors } from "@/src/constants/styles";
import useDebounce from "@/src/hooks/useDebounce";
import { useSingleSheet } from "@/src/hooks/useSingleSheet";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useFilterStore } from "@/src/stores/filterStore";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function TransportationLayout() {
  const { openSheet } = useSingleSheet();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { currentSort, updateOptions, resetCategory } = useFilterStore(
    useShallow((state) => ({
      updateOptions: state.updateOptions,
      currentSort: state.categories.transportation.options.sort,
      resetCategory: state.resetCategory,
    })),
  );

  useEffect(() => {
    return () => {
      resetCategory("transportation");
    };
  }, []);

  const handleAreaPress = (sheet: string) => {
    openSheet(sheet, {
      options: TRANSPORTATION_SORT,
      selectedValue: currentSort,
      onSelect: (val: string) => updateOptions("transportation", { sort: val }),
    });
  };

  return (
    <SafeArea edges={["bottom", "top"]}>
      <SearchableHeader
        search={search}
        setSearch={setSearch}
        title="Transporation Information"
      />

      <Screen style={styles.screen}>
        <FilterBar
          filters={TRANSPORTATION_FILTERS}
          onPress={handleAreaPress}
          containerStyle={styles.filterBarPadding}
        />

        <TransportationList search={debouncedSearch} filter={""} />
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
