import FilterBar from "@/src/components/app/FilterBar";
import SearchableHeader from "@/src/components/app/SearchableHeader";
import TransportationList from "@/src/components/app/transportation/TransportationList";
import { DINING_FILTERS } from "@/src/constants/filterOptions";
import { Colors } from "@/src/constants/styles";
import useDebounce from "@/src/hooks/useDebounce";
import { useSingleSheet } from "@/src/hooks/useSingleSheet";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

export default function TransportationLayout() {
  const { openSheet } = useSingleSheet();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const handleAreaPress = (area: string) => {
    openSheet(area);
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
              title="Transporation Information"
            />
          ),
        }}
      />

      <Screen style={styles.screen}>
        <FilterBar
          filters={DINING_FILTERS}
          onPress={handleAreaPress}
          containerStyle={styles.filterBarPadding}
        />

        <TransportationList search={debouncedSearch} filter={""} />
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
