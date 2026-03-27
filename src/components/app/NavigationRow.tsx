import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

interface NavigationRowProps {
  label: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  showChevron?: boolean;
}

export default function NavigationRow({
  label,
  onPress,
  containerStyle,
  labelStyle,
  showChevron = true,
}: NavigationRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        containerStyle,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Text style={[styles.label, labelStyle]}>{label}</Text>

        {showChevron && (
          <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
        )}
      </HStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    width: "100%",
  },
  label: {
    fontFamily: Typography.family.semiBold,
    fontSize: 13,
    color: Colors.text,
  },
});
