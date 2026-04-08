import EventListing from "@/src/components/app/event/EventListing";
import FilterBar from "@/src/components/app/FilterBar";
import SearchableHeader from "@/src/components/app/SearchableHeader";
import { EVENT_SORT } from "@/src/config/sort";
import { EVENT_FILTERS } from "@/src/constants/filterOptions";
import { Colors } from "@/src/constants/styles";
import useDebounce from "@/src/hooks/useDebounce";
import { useSingleSheet } from "@/src/hooks/useSingleSheet";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useFilterStore } from "@/src/stores/filterStore";
import type { QueryParams } from "@/src/types/filter";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function EventPage() {
  const { openSheet } = useSingleSheet();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { currentSort, currentOptions, updateOptions, resetCategory } =
    useFilterStore(
      useShallow((state) => ({
        updateOptions: state.updateOptions,
        currentSort: state.categories.event.options.sort,
        currentOptions: state.categories.event.options,
        resetCategory: state.resetCategory,
      })),
    );

  useEffect(() => {
    return () => {
      resetCategory("event");
    };
  }, []);

  const handleAreaPress = (area: string) => {
    openSheet(area, {
      options: EVENT_SORT,
      selectedValue: currentSort,
      onSelect: (val: string) => updateOptions("event", { sort: val }),
    });
  };

  const params = useMemo<QueryParams>(
    () => ({
      search: debouncedSearch,
      area: currentOptions.area,
      sort: currentSort,
      type: currentOptions.type.type,
      subtypes: currentOptions.type.subtypes,
      amenities: currentOptions.amenities,
    }),
    [debouncedSearch, currentOptions, currentSort],
  );

  return (
    <SafeArea edges={["bottom", "top"]}>
      <SearchableHeader
        search={search}
        setSearch={setSearch}
        title={"Events and Festivals"}
      />

      <Screen style={styles.screen}>
        <FilterBar
          filters={EVENT_FILTERS}
          onPress={handleAreaPress}
          containerStyle={styles.filterBarPadding}
        />

        <EventListing params={params} />
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: 20,
    paddingBottom: 10,
    paddingTop: 0,
    paddingHorizontal: 10,
    backgroundColor: Colors.surface,
  },

  filterBarPadding: {
    paddingVertical: 10,
  },
});
