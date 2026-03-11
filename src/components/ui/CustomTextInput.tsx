import { Colors, Typography } from "@/src/constants/styles";
import React, { ReactNode, useRef, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export interface CustomTextInputProps extends TextInputProps {
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  error?: boolean;
}

const CustomTextInput = ({
  prefixIcon,
  suffixIcon,
  containerStyle,
  inputStyle,
  error,
  ...rest
}: CustomTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput | null>(null);

  return (
    <Pressable
      onPress={() => {
        inputRef.current?.focus();
      }}
      style={[
        styles.container,
        // Dynamic border color based on Focus or Error state
        isFocused && styles.focusedBorder,
        error && styles.errorBorder,
        containerStyle,
      ]}
    >
      {/* Prefix Icon */}
      {prefixIcon && (
        <View style={[styles.iconWrapper, styles.prefixIcon]}>
          {prefixIcon}
        </View>
      )}

      <TextInput
        ref={inputRef}
        style={[styles.input, inputStyle]}
        placeholderTextColor={Colors.neutral}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />

      {/* Suffix Icon */}
      {suffixIcon && (
        <View style={[styles.iconWrapper, styles.suffixIcon]}>
          {suffixIcon}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
  },
  focusedBorder: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  errorBorder: {
    borderColor: Colors.error,
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: Typography.family.regular,
    fontSize: 16,
    color: Colors.secondary,
    paddingHorizontal: 8,
    borderWidth: 0,
    width: "100%",
    backgroundColor: "transparent",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: 24,
  },
  prefixIcon: {
    marginRight: 8,
  },
  suffixIcon: {
    marginLeft: "auto",
  },
});

export default CustomTextInput;
