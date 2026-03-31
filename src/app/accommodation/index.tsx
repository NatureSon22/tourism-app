import AccommodationList from "@/src/components/app/accomodation/AccommodationList";
import FilterBar from "@/src/components/app/FilterBar";
import SearchableHeader from "@/src/components/app/SearchableHeader";
import { ACCOMMODATION_SORT } from "@/src/config/sort";
import { ACCOMMODATION_FILTERS } from "@/src/constants/filterOptions";
import { Typography } from "@/src/constants/styles";
import useDebounce from "@/src/hooks/useDebounce";
import { useSingleSheet } from "@/src/hooks/useSingleSheet";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useFilterStore } from "@/src/stores/filterStore";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function AccommodationPage() {
  const { openSheet } = useSingleSheet();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { currentSort, updateOptions, resetCategory } = useFilterStore(
    useShallow((state) => ({
      updateOptions: state.updateOptions,
      currentSort: state.categories.accommodation.options.sort,
      resetCategory: state.resetCategory,
    })),
  );

  useEffect(() => {
    return () => {
      resetCategory("accommodation");
    };
  }, []);

  const handleAreaPress = (sheet: string) => {
    openSheet(sheet, {
      options: ACCOMMODATION_SORT,
      selectedValue: currentSort,
      onSelect: (val: string) => updateOptions("accommodation", { sort: val }),
    });
  };

  return (
    <SafeArea edges={["top", "bottom"]}>
      <SearchableHeader
        search={debouncedSearch}
        setSearch={setSearch}
        title="Accommodation"
      />

      <Screen style={styles.screen}>
        <FilterBar
          filters={ACCOMMODATION_FILTERS}
          onPress={handleAreaPress}
          containerStyle={styles.filterBar}
        />

        <AccommodationList search={debouncedSearch} />
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
