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
import useAuthStore from "@/src/stores/authStore";
import { useFilterStore } from "@/src/stores/filterStore";
import type { QueryParams } from "@/src/types/filter";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function TransportationLayout() {
  const { openSheet } = useSingleSheet();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const auth = useAuthStore((state) => state.user);

  const { currentSort, currentOptions, updateOptions, resetCategory } =
    useFilterStore(
      useShallow((state) => ({
        updateOptions: state.updateOptions,
        currentSort: state.categories.transportation.options.sort,
        currentOptions: state.categories.transportation.options,
        resetCategory: state.resetCategory,
      })),
    );

  useEffect(() => {
    return () => {
      resetCategory("transportation");
    };
  }, [resetCategory]);

  const handleAreaPress = (sheet: string) => {
    openSheet(sheet, {
      options: TRANSPORTATION_SORT,
      selectedValue: currentSort,
      onSelect: (val: string) => updateOptions("transportation", { sort: val }),
    });
  };

  const params = useMemo<QueryParams>(
    () => ({
      search: debouncedSearch,
      area: currentOptions.area,
      sort: currentSort,
      type: currentOptions.type.type || undefined,
      subtypes: currentOptions.type.subtypes,
      page: 1,
      limit: 6,
      moduleId: moduleId,
      userId: auth?.id,
    }),
    [
      auth?.id,
      currentOptions.area,
      currentOptions.type.subtypes,
      currentOptions.type.type,
      currentSort,
      debouncedSearch,
      moduleId,
    ],
  );

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

        <TransportationList params={params} />
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
