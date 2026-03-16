import CustomTextInput from "@/src/components/ui/CustomTextInput";
import { Colors, Typography } from "@/src/constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type DiningHeaderProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function DiningHeader({ search, setSearch }: DiningHeaderProps) {
  const router = useRouter();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchIconPress = () => {
    setIsSearchActive((prev) => !prev);
    if (isSearchActive) {
      setSearch("");
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => router.back()} hitSlop={10}>
        <MaterialIcons name="arrow-back-ios" size={20} color="black" />
      </Pressable>

      <View style={styles.middleSection}>
        {isSearchActive ? (
          <CustomTextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search dining..."
            inputStyle={styles.searchInput}
            containerStyle={styles.searchContainer}
            autoFocus
          />
        ) : (
          <Text style={styles.headerTitleText}>Food and Dining</Text>
        )}
      </View>

      <Pressable onPress={handleSearchIconPress} hitSlop={10}>
        <MaterialIcons
          name={isSearchActive ? "close" : "search"}
          size={20}
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
    paddingHorizontal: 5,
  },
  middleSection: {
    flex: 1,
    marginHorizontal: 12,
    justifyContent: "center",
  },
  headerTitleText: {
    fontFamily: Typography.family.medium,
    fontSize: 16,
    textAlign: "center",
  },
  searchContainer: {
    height: 42,
    width: "100%",
  },
  searchInput: {
    fontSize: 12,
  },
});
