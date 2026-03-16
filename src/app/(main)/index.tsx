import PlaceList from "@/src/components/app/main/PlaceList";
import TabNavigation from "@/src/components/app/TabNavigation";
import CustomTextInput from "@/src/components/ui/CustomTextInput";
import { Colors } from "@/src/constants/styles";
import  useDebounce  from "@/src/hooks/useDebounce";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screenOverride}>
        {/* Search Section */}
        <View style={styles.searchWrapper}>
          <CustomTextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search places..."
            suffixIcon={
              <EvilIcons name="search" size={18} color={Colors.textMuted} />
            }
            inputStyle={styles.searchInput}
            containerStyle={styles.searchContainer}
          />
        </View>

        {/* Categories / Tabs */}
        <View style={styles.tabWrapper}>
          <TabNavigation />
        </View>

        {/* Results List */}
        <View style={styles.listWrapper}>
          <PlaceList searchQuery={debouncedSearch} />
        </View>
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screenOverride: {
    gap: 15,
    padding: 0,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    height: 45,
  },
  searchInput: {
    fontSize: 12,
  },
  tabWrapper: {
    paddingHorizontal: 16,
  },
  listWrapper: {
    flex: 1,
    overflow: "hidden",
  },
});
