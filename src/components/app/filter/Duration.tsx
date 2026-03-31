import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Unit = "hrs" | "mins" | string;

export type Duration = {
  id: number;
  min: { value: number; unit: Unit };
  max: { value: number; unit: Unit };
};

interface DurationFilterProps {
  durations: Duration[];
  values: { min: number; max: number };
  onChange: (min: number, max: number) => void;
}

export default function DurationFilter({
  durations,
  values,
  onChange,
}: DurationFilterProps) {
  /**
   * Helper: Formats the chip label based on unit parity.
   * If units match: "2 - 5 hrs"
   * If units differ: "45 mins - 2 hrs"
   */
  const formatLabel = (item: Duration) => {
    const { min, max } = item;
    if (min.unit === max.unit) {
      return `${min.value} - ${max.value} ${min.unit}`;
    }
    return `${min.value} ${min.unit} - ${max.value} ${max.unit}`;
  };

  /**
   * Helper: Converts a specific value/unit pair to base minutes.
   * This is used to check if the current manual input matches a preset chip.
   */
  const toTotalMinutes = (val: number, unit: Unit) => {
    return unit === "hrs" ? val * 60 : val;
  };

  const handleQuickSelect = (item: Duration) => {
    const minVal = toTotalMinutes(item.min.value, item.min.unit);
    const maxVal = toTotalMinutes(item.max.value, item.max.unit);
    onChange(minVal, maxVal);
  };

  return (
    <VStack gap={16} style={{ width: "100%" }}>
      <Text style={{ fontFamily: Typography.family.semiBold, fontSize: 16 }}>
        Duration (Minutes)
      </Text>

      {/* Manual Input Fields */}
      <HStack gap={12} alignItems="center">
        <View style={styles.inputWrapperStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Min"
            keyboardType="numeric"
            value={values.min > 0 ? values.min.toString() : ""}
            onChangeText={(text) => {
              const parsed = Number(text);
              onChange(isNaN(parsed) ? 0 : parsed, values.max);
            }}
          />
        </View>

        <Text style={{ color: Colors.textMuted }}>—</Text>

        <View style={styles.inputWrapperStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Max"
            keyboardType="numeric"
            value={values.max > 0 ? values.max.toString() : ""}
            onChangeText={(text) => {
              const parsed = Number(text);
              onChange(values.min, isNaN(parsed) ? 0 : parsed);
            }}
          />
        </View>
      </HStack>

      {/* Quick Select Mapping */}
      <HStack gap={8} style={{ flexWrap: "wrap" }} >
        {durations.map((item) => {
          // Calculate the "Minutes" version of the chip to compare with manual input
          const chipMinMins = toTotalMinutes(item.min.value, item.min.unit);
          const chipMaxMins = toTotalMinutes(item.max.value, item.max.unit);

          const isActive =
            values.min === chipMinMins && values.max === chipMaxMins;

          return (
            <Pressable
              key={item.id}
              onPress={() => handleQuickSelect(item)}
              style={[
                styles.chipStyle,
                {
                  backgroundColor: isActive ? Colors.primary : Colors.surface,
                  borderColor: isActive ? Colors.primary : Colors.border,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: Typography.family.medium,
                  color: isActive ? "#fff" : Colors.text,
                }}
              >
                {formatLabel(item)}
              </Text>
            </Pressable>
          );
        })}
      </HStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  inputWrapperStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputStyle: {
    fontFamily: Typography.family.regular,
    fontSize: 12,
    color: Colors.text,
    textAlign: "center" as const,
    includeFontPadding: false,
  },
  chipStyle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
});
