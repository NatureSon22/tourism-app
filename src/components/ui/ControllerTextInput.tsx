import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import CustomTextInput, { CustomTextInputProps } from "./CustomTextInput";

interface StrengthResult {
  label: string;
  color: string;
  score: number;
}

interface Props<T extends FieldValues> extends Omit<
  CustomTextInputProps,
  "onChangeText" | "value" | "onBlur" | "style" | "containerStyle"
> {
  control: Control<T>;
  name: Path<T>;
  label?: string | null;
  labelStyle?: StyleProp<TextStyle>;
  isRequired?: boolean;
  errors: any;
  style?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  showStrength?: boolean;
  editable?: boolean;
  strengthEvaluator?: (value: string) => StrengthResult | null;
}

export default function ControllerTextInput<T extends FieldValues>({
  control,
  label = null,
  labelStyle = {},
  isRequired = false,
  name,
  style = {},
  textInputStyle = {},
  containerStyle = {},
  showStrength = false,
  editable = true,
  strengthEvaluator,
  ...rest
}: Props<T>) {
  return (
    <View style={[{ gap: 7 }, style]}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error, isTouched, isDirty },
        }) => {
          // Determine whether to show success border: only when the field was interacted with
          const interacted = isTouched || isDirty;
          const showSuccess = !error && interacted;

          // compute strength if requested
          const strength =
            showStrength && strengthEvaluator
              ? strengthEvaluator(value ?? "")
              : null;

          // Priority: show validation error color when there's an error & interaction.
          // Otherwise, if strength exists and interacted, use its color. Otherwise show success color when appropriate.
          const dynamicBorderStyle: StyleProp<ViewStyle> =
            error && interacted
              ? { borderColor: Colors.error }
              : strength && interacted
                ? { borderColor: strength.color }
                : showSuccess
                  ? { borderColor: Colors.success }
                  : {};

          return (
            <>
              <HStack gap={4} justifyContent="space-between">
                {label && (
                  <HStack justifyContent="flex-start" gap={4}>
                    <Text
                      style={[
                        { fontSize: 12, fontFamily: Typography.family.medium },
                        labelStyle,
                      ]}
                    >
                      {label}
                    </Text>
                    {isRequired && (
                      <Text style={{ color: Colors.error, fontSize: 12 }}>
                        *
                      </Text>
                    )}
                  </HStack>
                )}

                {/* show error (priority) or strength in header after interaction */}
                {interacted ? (
                  error ? (
                    <Text style={{ color: Colors.error, fontSize: 10 }}>
                      {error.message}
                    </Text>
                  ) : strength ? (
                    <Text style={{ color: strength.color, fontSize: 12 }}>
                      {strength.label}
                    </Text>
                  ) : null
                ) : null}
              </HStack>

              <CustomTextInput
                {...rest}
                value={value ?? ""}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!(error && interacted)}
                inputStyle={[
                  {
                    fontSize: 12,
                    padding: 0,
                    fontFamily: Typography.family.medium,
                  },
                  textInputStyle,
                ]}
                // merge user containerStyle with dynamic border style so strength/error overrides when present
                containerStyle={[containerStyle, dynamicBorderStyle]}
              />
            </>
          );
        }}
      />
    </View>
  );
}
