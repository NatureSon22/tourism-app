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
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function ServicePage() {
  const { openSheet } = useSingleSheet();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { currentSort, updateOptions, resetCategory } = useFilterStore(
    useShallow((state) => ({
      updateOptions: state.updateOptions,
      currentSort: state.categories.services.options.sort,
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

        <ServiceList search={debouncedSearch} />
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
