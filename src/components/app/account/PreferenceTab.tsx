import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type PreferenceTabProps = {
  label: string;
  value: string;
  isSelected: boolean;
  onClick: (value: string) => void;
};

export default function PreferenceTab({
  label,
  value,
  isSelected,
  onClick,
}: PreferenceTabProps) {
  return (
    <Pressable
      onPress={() => onClick(value)}
      style={[styles.container, isSelected && styles.selectedContainer]}
    >
      <Text style={[styles.label, isSelected && styles.selectedLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 28,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  selectedContainer: {
    borderColor: "#0EA5E9",
    backgroundColor: "#DBEAFE",
  },
  label: {
    fontSize: 14,
    color: "#1F2937",
    textAlign: "center",
  },
  selectedLabel: {
    fontWeight: "700",
    color: "#0369A1",
  },
});
