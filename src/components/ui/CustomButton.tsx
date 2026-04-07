import { Colors, Typography } from "@/src/constants/styles";
import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: "solid" | "outlined";
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  gap?: number;
  rounded?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  removeLabel?: boolean;
}

const CustomButton = ({
  title,
  onPress,
  variant = "solid",
  style,
  textStyle,
  iconStyle,
  prefixIcon,
  suffixIcon,
  gap = 8,
  rounded = false,
  disabled = false,
  isLoading = false,
  removeLabel = false,
}: ButtonProps) => {
  const isSolid = variant === "solid";
  const isIconOnly = !title && (prefixIcon || suffixIcon);

  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      accessibilityState={{
        disabled: !!(disabled || isLoading),
        busy: !!isLoading,
      }}
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.baseContainer,
        isSolid ? styles.solidContainer : styles.outlinedContainer,
        isIconOnly ? styles.iconOnlyPadding : styles.standardPadding,
        rounded && styles.rounded,
        { gap: title ? gap : 0 },
        disabled && styles.disabledContainer,
        style,
      ]}
    >
      {isLoading ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ActivityIndicator
            size="small"
            color={isSolid ? Colors.surface : Colors.primary}
            style={{ marginRight: title && !removeLabel ? 8 : 0 }}
          />
        </View>
      ) : (
        <>
          {prefixIcon && (
            <View style={[styles.iconWrapper, iconStyle]}>{prefixIcon}</View>
          )}

          {title && (
            <Text
              style={[
                styles.baseText,
                isSolid ? styles.solidText : styles.outlinedText,
                textStyle,
              ]}
            >
              {title}
            </Text>
          )}

          {suffixIcon && (
            <View style={[styles.iconWrapper, iconStyle]}>{suffixIcon}</View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 2,
  },
  standardPadding: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  iconOnlyPadding: {
    padding: 5,
  },
  rounded: {
    borderRadius: 999,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  baseText: {
    fontFamily: Typography.family.bold,
    fontSize: 16,
    fontWeight: Typography.weight.bold,
    includeFontPadding: false,
  },
  solidContainer: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  solidText: {
    color: Colors.surface,
  },
  outlinedContainer: {
    backgroundColor: "transparent",
    borderColor: Colors.primary,
  },
  outlinedText: {
    color: Colors.primary,
  },
  disabledContainer: {
    backgroundColor: Colors.disabled,
    borderColor: Colors.disabled,
  },
  disabledText: {
    color: Colors.disabledText,
  },
});

export default CustomButton;
