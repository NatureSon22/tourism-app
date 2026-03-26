import AccommodationList from "@/src/components/app/accomodation/AccommodationList";
import FilterBar from "@/src/components/app/FilterBar";
import SearchableHeader from "@/src/components/app/SearchableHeader";
import { ACCOMMODATION_FILTERS } from "@/src/constants/filterOptions";
import { Typography } from "@/src/constants/styles";
import useDebounce from "@/src/hooks/useDebounce";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useFilterStore } from "@/src/stores/filterStore";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export default function AccommodationPage() {
  const sheetShownRef = useRef(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const router = useRouter();
  const resetCategory = useFilterStore((state) => state.resetCategory);

  useEffect(() => {
    return () => {
      resetCategory("accommodation");
    };
  }, []);

  const handleAreaPress = (sheet: string) => {
    if (!sheetShownRef.current) {
      SheetManager.show(sheet, {
        onClose(data) {
          sheetShownRef.current = false;
        },
      });
      sheetShownRef.current = true;
    }
  };

  const handleBackButton = () => {
    router.back();
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
