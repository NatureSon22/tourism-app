import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../ui/CustomButton";

type FooterProps = {
  handleClear: () => void;
  handleApply: () => void;
};

export default function FooterSheet({ handleClear, handleApply }: FooterProps) {
  return (
    <View style={styles.shadowWrapper}>
      <View style={styles.container}>
        <HStack gap={12} justifyContent="space-between">
          <Pressable onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>

          <CustomButton
            title="Show Results"
            style={styles.submitButton}
            textStyle={styles.submitButtonText}
            onPress={handleApply}
          />
        </HStack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    overflow: "hidden",
    paddingTop: 10,
    marginTop: -10,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 20,
  },
  clearButton: {
    paddingVertical: 17,
    paddingHorizontal: 20,
  },
  clearText: {
    color: Colors.textMuted,
    fontFamily: Typography.family.medium,
    textDecorationLine: "underline",
  },
  submitButton: {
    paddingVertical: 9,
    paddingHorizontal: 20,
  },
  submitButtonText: {
    fontSize: 13,
  },
});
