import PreferenceTab from "@/src/components/app/account/PreferenceTab";
import React from "react";
import { StyleSheet, View } from "react-native";

type Option = {
  label: string;
  value: string;
};

type PreferenceListProps = {
  options: Option[];
  selectedValue: string | null;
  onChange: (value: string) => void;
};

export default function PreferenceList({
  options,
  selectedValue,
  onChange,
}: PreferenceListProps) {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <PreferenceTab
          key={option.value}
          label={option.label}
          value={option.value}
          isSelected={selectedValue === option.value}
          onClick={onChange}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
