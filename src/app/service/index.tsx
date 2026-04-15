import FilterBar from "@/src/components/app/FilterBar";
import SearchableHeader from "@/src/components/app/SearchableHeader";
import ServiceList from "@/src/components/app/service/ServiceList";
import { SERVICE_SORT } from "@/src/config/sort";
import { SERVICE_FILTERS } from "@/src/constants/filterOptions";
import { Colors } from "@/src/constants/styles";
import useDebounce from "@/src/hooks/useDebounce";
import { useSingleSheet } from "@/src/hooks/useSingleSheet";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useFilterStore } from "@/src/stores/filterStore";
import type { QueryParams } from "@/src/types/filter";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function ServicePage() {
  const { openSheet } = useSingleSheet();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const { currentSort, currentOptions, updateOptions, resetCategory } =
    useFilterStore(
      useShallow((state) => ({
        updateOptions: state.updateOptions,
        currentSort: state.categories.services.options.sort,
        currentOptions: state.categories.services.options,
        resetCategory: state.resetCategory,
      })),
    );

  useEffect(() => {
    return () => {
      resetCategory("services");
    };
  }, []);

  const handleAreaPress = (area: string) => {
    openSheet(area, {
      options: SERVICE_SORT,
      selectedValue: currentSort,
      onSelect: (val: string) => updateOptions("services", { sort: val }),
    });
  };

  const params = useMemo<QueryParams>(
    () => ({
      search: debouncedSearch,
      area: currentOptions.area,
      sort: currentOptions.sort,
      type: currentOptions.type.type || undefined,
      subtypes: currentOptions.type.subtypes,
      // amenities: currentOptions.attributes["amenities"] ?? [],
      page: 1,
      limit: 5,
      moduleId: moduleId,
    }),
    [currentOptions, debouncedSearch, moduleId],
  );

  return (
    <SafeArea edges={["bottom", "top"]}>
      <SearchableHeader
        search={search}
        setSearch={setSearch}
        title={"Local Services"}
      />

      <Screen style={styles.screen}>
        <FilterBar
          filters={SERVICE_FILTERS}
          onPress={handleAreaPress}
          containerStyle={styles.filterBarPadding}
        />

        <ServiceList params={params} />
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
