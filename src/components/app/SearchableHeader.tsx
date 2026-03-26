import CustomTextInput from "@/src/components/ui/CustomTextInput";
import { Colors, Typography } from "@/src/constants/styles";
import { useSafeNavigation } from "@/src/hooks/useSafeNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type SearchableHeaderProps = {
  title: string;
  placeholder?: string;
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchableHeader({
  title,
  placeholder = "Search...",
  search,
  setSearch,
}: SearchableHeaderProps) {
  const router = useSafeNavigation();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchIconPress = () => {
    setIsSearchActive((prev) => !prev);
    // Clear search when closing the search bar
    if (isSearchActive) {
      setSearch("");
    }
  };

  return (
    <View style={styles.headerContainer}>
      {/* Back Button - Using Safe Navigation */}
      <Pressable onPress={() => router.back()} hitSlop={15}>
        <MaterialIcons name="arrow-back-ios" size={20} color={Colors.text} />
      </Pressable>

      <View style={styles.middleSection}>
        {isSearchActive ? (
          <CustomTextInput
            value={search}
            onChangeText={setSearch}
            placeholder={placeholder}
            inputStyle={styles.searchInput}
            containerStyle={styles.searchContainer}
            autoFocus
          />
        ) : (
          <Text style={styles.headerTitleText}>{title}</Text>
        )}
      </View>

      {/* Toggle Search/Close Button */}
      <Pressable onPress={handleSearchIconPress} hitSlop={15}>
        <MaterialIcons
          name={isSearchActive ? "close" : "search"}
          size={22}
          color={Colors.textMuted}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: "#d0dbcb80",
    borderBottomWidth: 1,
  },
  middleSection: {
    flex: 1,
    marginHorizontal: 12,
    justifyContent: "center",
  },
  headerTitleText: {
    fontFamily: Typography.family.medium,
    fontSize: 16,
    color: Colors.text,
    textAlign: "center",
  },
  searchContainer: {
    height: 42,
    width: "100%",
  },
  searchInput: {
    fontSize: 13,
    fontFamily: Typography.family.regular,
  },
});
