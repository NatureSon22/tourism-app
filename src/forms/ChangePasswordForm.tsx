import ControllerTextInput from "@/src/components/ui/ControllerTextInput";
import CustomButton from "@/src/components/ui/CustomButton";
import VStack from "@/src/layouts/VStack";
import { useChangePassword } from "@/src/services/request/useChangePassword";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { z } from "zod";
import { Typography } from "../constants/styles";

const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(1, "Password must be at least 1 character"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;

const initialValues: ChangePasswordFormData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const changePasswordMutation = useChangePassword();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
    defaultValues: initialValues,
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    changePasswordMutation.mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          setShowCurrent(false);
          setShowNew(false);
          setShowConfirm(false);
          reset(initialValues);
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <VStack gap={0}>
        <Text style={styles.title}>Password</Text>
        <Text style={styles.description}>
          Enter your current password and choose a new one
        </Text>
      </VStack>

      <View style={styles.fieldContainer}>
        <ControllerTextInput
          control={control}
          name="currentPassword"
          label="Current Password"
          placeholder="Current Password"
          isRequired
          secureTextEntry={!showCurrent}
          editable={true}
          suffixIcon={
            <Ionicons
              name={showCurrent ? "eye-off" : "eye"}
              size={20}
              color="#6B7280"
              onPress={() => setShowCurrent((prev) => !prev)}
            />
          }
          errors={errors}
          containerStyle={styles.inputContainer}
          textInputStyle={styles.textInput}
        />
      </View>

      <View style={styles.fieldContainer}>
        <ControllerTextInput
          control={control}
          name="newPassword"
          label="New Password"
          placeholder="New Password"
          isRequired
          secureTextEntry={!showNew}
          editable={true}
          suffixIcon={
            <Ionicons
              name={showNew ? "eye-off" : "eye"}
              size={20}
              color="#6B7280"
              onPress={() => setShowNew((prev) => !prev)}
            />
          }
          errors={errors}
          containerStyle={styles.inputContainer}
          textInputStyle={styles.textInput}
        />
      </View>

      <View style={styles.fieldContainer}>
        <ControllerTextInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          isRequired
          secureTextEntry={!showConfirm}
          editable={true}
          suffixIcon={
            <Ionicons
              name={showConfirm ? "eye-off" : "eye"}
              size={20}
              color="#6B7280"
              onPress={() => setShowConfirm((prev) => !prev)}
            />
          }
          errors={errors}
          containerStyle={styles.inputContainer}
          textInputStyle={styles.textInput}
        />
      </View>

      <View style={styles.buttonsRow}>
        <CustomButton
          title="Save"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || changePasswordMutation.isPending}
          style={styles.saveButton}
          textStyle={styles.buttonStyle}
        />

        {/* <CustomButton title="Edit" variant="outlined" onPress={handleEdit} />
        {editMode && (
          <CustomButton
            title="Save"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
        )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 15,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: Typography.family.semiBold,
  },
  description: {
    fontSize: 12,
    fontFamily: Typography.family.regular,
  },
  fieldContainer: {
    width: "100%",
    gap: 4,
  },
  inputContainer: {
    height: 52,
  },
  textInput: {
    fontSize: 12,
  },
  buttonsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 15,
  },
  saveButton: {
    width: "100%",
    paddingVertical: 12,
  },
  buttonStyle: {
    fontSize: 13,
  },
});
