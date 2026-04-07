import { Colors, Typography } from "@/src/constants/styles";
import React, { forwardRef, ReactNode, useRef, useState } from "react";
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
  editable?: boolean;
}

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      prefixIcon,
      suffixIcon,
      containerStyle,
      inputStyle,
      error,
      editable = true,
      multiline, // Added this to the destructuring
      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput | null>(null);

    const handleRef = (instance: TextInput | null) => {
      inputRef.current = instance;
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref) {
        (ref as React.MutableRefObject<TextInput | null>).current = instance;
      }
    };

    return (
      <Pressable
        onPress={() => editable && inputRef.current?.focus()}
        style={[
          styles.container,
          !editable && styles.disabledContainer, // Grey out if not editable
          isFocused && styles.focusedBorder,
          error && styles.errorBorder,
          multiline && { height: undefined, minHeight: 52, paddingVertical: 8 },
          containerStyle,
        ]}
      >
        {prefixIcon && <View style={styles.prefixIcon}>{prefixIcon}</View>}

        <TextInput
          ref={handleRef}
          editable={editable}
          multiline={multiline}
          style={[
            styles.input,
            !editable && { color: Colors.neutral }, // Dim text if disabled
            inputStyle,
          ]}
          placeholderTextColor={Colors.neutral}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          {...rest}
        />

        {suffixIcon && <View style={styles.suffixIcon}>{suffixIcon}</View>}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1.5, // Changed to match your focusedBorder for smoother transition
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    overflow: "hidden",
  },
  disabledContainer: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E0E0E0",
  },
  focusedBorder: {
    borderColor: Colors.primary,
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
    paddingHorizontal: 4, // Reduced slightly to avoid excessive gap
    textAlignVertical: "center", // Critical for Android alignment
  },
  prefixIcon: {
    marginRight: 4,
  },
  suffixIcon: {
    marginLeft: 4,
  },
});

CustomTextInput.displayName = "CustomTextInput";

export default CustomTextInput;
