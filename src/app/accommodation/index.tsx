import AccommodationList from "@/src/components/app/accomodation/AccommodationList";
import FilterBar from "@/src/components/app/FilterBar";
import CustomTextInput from "@/src/components/ui/CustomTextInput";
import { ACCOMMODATION_FILTERS } from "@/src/constants/filterOptions";
import { Colors, Typography } from "@/src/constants/styles";
import useDebounce from "@/src/hooks/useDebounce";
import HStack from "@/src/layouts/HStack";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useFilterStore } from "@/src/stores/filterStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
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
      <Screen style={styles.screen}>
        <HStack
          justifyContent="flex-start"
          alignItems="center"
          gap={20}
          style={styles.headerRow}
        >
          <Pressable onPress={handleBackButton} hitSlop={10}>
            <MaterialIcons name="arrow-back-ios" size={20} color="black" />
          </Pressable>

          <CustomTextInput
            inputStyle={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            containerStyle={styles.searchContainer}
            placeholder="Search"
            suffixIcon={
              <MaterialIcons name="search" size={20} color={Colors.textMuted} />
            }
          />
        </HStack>

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
