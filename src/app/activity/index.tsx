import ActivityList from "@/src/components/app/activity/ActivityList";
import FilterBar from "@/src/components/app/FilterBar";
import CustomTextInput from "@/src/components/ui/CustomTextInput";
import { ACTIVITY_FILTERS } from "@/src/constants/filterOptions";
import { Colors, Typography } from "@/src/constants/styles";
import useDebounce from "@/src/hooks/useDebounce";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export default function ActivityPage() {
  const sheetShownRef = useRef(false);
  const router = useRouter();

  const [isRefetching, setIsRefetching] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
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

  const handleBackButton = () => {
    router.back();
  };

  const onRefresh = () => {
    setIsRefetching(true);

    setTimeout(() => {
      setIsRefetching(false);
    }, 2000);
  };

  return (
    <SafeArea edges={["bottom"]}>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerLeft: () => null,
          headerTitle: () => (
            <View style={styles.headerTitle}>
              <Pressable onPress={handleBackButton} hitSlop={10}>
                <MaterialIcons name="arrow-back-ios" size={20} color="black" />
              </Pressable>

              {isSearchMode ? (
                <CustomTextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search"
                  containerStyle={styles.searchContainer}
                  inputStyle={styles.searchInput}
                  autoFocus
                  suffixIcon={
                    <Pressable
                      onPress={() => {
                        setSearch("");
                        setIsSearchMode(false);
                      }}
                      hitSlop={10}
                    >
                      <MaterialIcons
                        name="close"
                        size={20}
                        color={Colors.textMuted}
                      />
                    </Pressable>
                  }
                />
              ) : (
                <Text style={styles.headerText}>General Activities</Text>
              )}

              <Pressable
                onPress={() => setIsSearchMode((p) => !p)}
                hitSlop={10}
              >
                <MaterialIcons
                  name="search"
                  size={20}
                  color={Colors.textMuted}
                />
              </Pressable>
            </View>
          ),
        }}
      />

      <Screen style={styles.screen}>
        <FilterBar
          filters={ACTIVITY_FILTERS}
          onPress={handleAreaPress}
          containerStyle={styles.filterBar}
        />

        <ActivityList
          search={debouncedSearch}
          isRefetching={isRefetching}
          onRefresh={onRefresh}
        />
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
