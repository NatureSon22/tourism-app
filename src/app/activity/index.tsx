import ActivityList from "@/src/components/app/activity/ActivityList";
import FilterBar from "@/src/components/app/FilterBar";
import SearchableHeader from "@/src/components/app/SearchableHeader";
import { ACTIVITY_FILTERS } from "@/src/constants/filterOptions";
import { Colors, Typography } from "@/src/constants/styles";
import useDebounce from "@/src/hooks/useDebounce";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { Stack } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export default function ActivityPage() {
  const sheetShownRef = useRef(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 350);

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

  return (
    <SafeArea edges={["bottom"]}>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerLeft: () => null,
          headerTitle: () => (
            <SearchableHeader
              search={search}
              setSearch={setSearch}
              title={"General Activities"}
            />
          ),
        }}
      />

      <Screen style={styles.screen}>
        <FilterBar
          filters={ACTIVITY_FILTERS}
          onPress={handleAreaPress}
          containerStyle={styles.filterBar}
        />

        <ActivityList search={debouncedSearch} />
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
