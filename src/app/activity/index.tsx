import ActivityList from "@/src/components/app/activity/ActivityList";
import FilterBar from "@/src/components/app/FilterBar";
import SearchableHeader from "@/src/components/app/SearchableHeader";
import { ACTIVITY_SORT } from "@/src/config/sort";
import { ACTIVITY_FILTERS } from "@/src/constants/filterOptions";
import { Colors, Typography } from "@/src/constants/styles";
import useDebounce from "@/src/hooks/useDebounce";
import { useSingleSheet } from "@/src/hooks/useSingleSheet";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useFilterStore } from "@/src/stores/filterStore";
import { QueryParams } from "@/src/types/filter";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function ActivityPage() {
  const { openSheet } = useSingleSheet();
  const [searchLocal, setSearchLocal] = useState("");
  const debouncedSearch = useDebounce(searchLocal, 350);

  const { activityState, updateOptions, resetCategory, setSearch } =
    useFilterStore(
      useShallow((state) => ({
        activityState: state.categories.activity,
        updateOptions: state.updateOptions,
        resetCategory: state.resetCategory,
        setSearch: state.setSearch,
      })),
    );

  useEffect(() => {
    return () => resetCategory("activity");
  }, [resetCategory]);

  useEffect(() => {
    setSearch("activity", debouncedSearch);
  }, [debouncedSearch, setSearch]);

  const handleAreaPress = (sheet: string) => {
    openSheet(sheet, {
      options: ACTIVITY_SORT,
      selectedValue: activityState.options.sort,
      onSelect: (val: string) => updateOptions("activity", { sort: val }),
    });
  };

  const params: QueryParams = {
    search: activityState.search,
    area: activityState.options.area,
    sort: activityState.options.sort,
    type: activityState.options.type.type || undefined,
    subtypes: activityState.options.type.subtypes,
    amenities: activityState.options.amenities,
    page: 1,
    limit: 20,
  };

  return (
    <SafeArea edges={["bottom", "top"]}>
      <SearchableHeader
        search={searchLocal}
        setSearch={setSearchLocal}
        title={"General Activities"}
      />

      <Screen style={styles.screen}>
        <FilterBar
          filters={ACTIVITY_FILTERS}
          onPress={handleAreaPress}
          containerStyle={styles.filterBar}
        />

        <ActivityList params={params} />
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
  },
  headerText: {
    fontFamily: Typography.family.medium,
    fontSize: 14,
    color: Colors.text,
  },
  searchContainer: {
    height: 36,
    flex: 1,
    marginHorizontal: 12,
  },
  searchInput: {
    fontSize: 14,
    padding: 0,
    height: 22,
  },
  screen: {
    gap: 20,
    paddingBottom: 10,
    paddingTop: 0,
    paddingHorizontal: 0,
    backgroundColor: Colors.overlay,
  },
  filterBar: {
    paddingVertical: 10,
  },
});
