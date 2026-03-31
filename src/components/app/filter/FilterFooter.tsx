import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../ui/CustomButton";

type FilterFooterProps = {
  handleClear: () => void;
  handleApply: () => void;
};

export default function FilterFooter({
  handleApply,
  handleClear,
}: FilterFooterProps) {
  return (
    <View style={styles.container}>
      <HStack gap={12} justifyContent="space-between">
        <Pressable onPress={handleClear} style={styles.button}>
          <Text style={styles.buttonText}>Clear</Text>
        </Pressable>

        <CustomButton
          title="Show Results"
          style={styles.buttonPadding}
          textStyle={styles.buttonTextStyle}
          onPress={handleApply}
        />
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  button: { paddingVertical: 17, paddingHorizontal: 20 },
  buttonText: {
    color: Colors.textMuted,
    fontFamily: Typography.family.medium,
    textDecorationLine: "underline",
  },
  buttonPadding: { paddingVertical: 9, paddingHorizontal: 20 },
  buttonTextStyle: {
    fontSize: 13,
  },
});
