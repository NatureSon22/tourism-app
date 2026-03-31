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
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function EventPage() {
  const { openSheet } = useSingleSheet();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { currentSort, updateOptions, resetCategory } = useFilterStore(
    useShallow((state) => ({
      updateOptions: state.updateOptions,
      currentSort: state.categories.event.options.sort,
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

        <EventListing search={debouncedSearch} />
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
