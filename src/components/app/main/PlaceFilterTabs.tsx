import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export type FilterType = "Recommended" | "Nearby";

type PlaceFilterTabsProps = {
  value: FilterType;
  onChange: (value: FilterType) => void;
};

export default function PlaceFilterTabs({
  value,
  onChange,
}: PlaceFilterTabsProps) {
  const tabs: FilterType[] = ["Recommended", "Nearby"];

  return (
    <HStack gap={20} justifyContent="flex-start" style={styles.container}>
      {tabs.map((tab) => {
        const isActive = value === tab;
        return (
          <TouchableOpacity key={tab} onPress={() => onChange(tab)}>
            <Text
              style={[
                styles.tabText,
                isActive ? styles.active : styles.inactive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 6,
  },
  tabText: {
    fontSize: 16,
    fontFamily: Typography.family.medium,
  },
  active: {
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  inactive: {
    color: Colors.textMuted,
  },
});
