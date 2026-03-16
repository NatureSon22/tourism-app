import { Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

export type FilterOption = {
  label: string;
  sheet: string;
};

type FilterBarProps = {
  filters: FilterOption[];
  onPress: (type: string) => void;
  containerStyle?: ViewStyle;
};

export default function FilterBar({
  filters,
  onPress,
  containerStyle,
}: FilterBarProps) {
  return (
    <HStack
      justifyContent="space-around"
      style={[styles.container, containerStyle]}
    >
      {filters.map((filter) => (
        <FilterButton
          key={filter.sheet}
          label={filter.label}
          onPress={() => onPress(filter.sheet)}
        />
      ))}
    </HStack>
  );
}

function FilterButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
  selected?: boolean;
}) {
  return (
    <Pressable onPress={onPress} hitSlop={10}>
      <HStack gap={5} alignItems="center">
        <Text style={[styles.labelText]}>{label}</Text>
        <MaterialIcons name="arrow-drop-down" size={17} color="black" />
      </HStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  labelText: {
    fontFamily: Typography.family.semiBold,
    fontSize: 12.5,
  },
});
