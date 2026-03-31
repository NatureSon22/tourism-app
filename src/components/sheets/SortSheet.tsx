import { Colors, Typography } from "@/src/constants/styles";
import VStack from "@/src/layouts/VStack";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import HeaderSheet from "../app/HeaderSheet";

export default function SortSheet(props: SheetProps<"sort-sheet">) {
  const { options, selectedValue, onSelect } = props.payload;

  const handleClose = () => SheetManager.hide(props.sheetId);

  return (
    <ActionSheet
      id={props.sheetId}
      gestureEnabled={true}
      containerStyle={styles.container}
    >
      <View style={styles.root}>
        {/* Header Section */}
        <HeaderSheet title="Sort" handleCloseSheet={handleClose} />

        {/* Options List */}
        <VStack style={styles.content}>
          {options.map((option) => {
            const isSelected = selectedValue === option.value;

            return (
              <Pressable
                key={option.value}
                onPress={() => {
                  onSelect(option.value);
                  handleClose();
                }}
                style={styles.optionRow}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>

                {isSelected && (
                  <AntDesign name="check" size={16} color="#2E9CF4" />
                )}
              </Pressable>
            );
          })}
        </VStack>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.surface || "#fff",
  },
  content: {
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 20,
    gap: 12,
  },
  // Individual Sort Row
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 14,
    fontFamily: Typography.family.regular,
    color: Colors.text || "#333",
  },
  optionTextSelected: {
    fontFamily: Typography.family.medium,
    color: "#2E9CF4", // Primary Action Color
  },
  // ActionSheet Container Overrides
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
