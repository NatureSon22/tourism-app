import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PopupItemProps = {
  isSelected?: boolean;
  Icon: React.ReactNode;
  label: string;
  onPress: () => void;
};

const CustomPopupMenuItem = ({
  isSelected,
  Icon,
  label,
  onPress,
}: PopupItemProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      { backgroundColor: pressed ? "#f5f5f5" : "transparent" },
    ]}
  >
    <HStack justifyContent="flex-start">
      <View
        style={{
          width: 22,
          height: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Icon}
      </View>

      <Text style={[styles.itemLabel, isSelected && styles.selectedLabel]}>
        {label}
      </Text>
    </HStack>
  </Pressable>
);

const styles = StyleSheet.create({
  itemLabel: {
    fontFamily: Typography.family.regular,
    color: Colors.text,
    fontSize: 12,
  },

  selectedLabel: {
    textDecorationColor: Colors.primary,
    textDecorationLine: "underline",
  },
});

export default CustomPopupMenuItem;
