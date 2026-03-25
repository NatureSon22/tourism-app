import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "expo-checkbox";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";
import ControllerTextInput from "../components/ui/ControllerTextInput";
import CustomButton from "../components/ui/CustomButton";
import { Colors, Typography } from "../constants/styles";
import { useLogin } from "../hooks/useLogin";
import HStack from "../layouts/HStack";
import VStack from "../layouts/VStack";
import useAuthStore from "../stores/authStore";

const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z.string().min(1, { message: "Password is required" }),
});

export type SignInFormData = z.infer<typeof SignInSchema>;

export default function SignInForm() {
  const router = useRouter();
  const { onBoardingCompleted, login } = useAuthStore(
    useShallow((state) => ({
      onBoardingCompleted: state.onBoardingCompleted,
      login: state.login,
    })),
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "consumer1@gmail.com", password: "cons1" },
    mode: "onTouched",
  });

  const [isChecked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useLogin(isChecked);

  const togglePasswordVisibility = () => setShowPassword((p) => !p);

  const onSubmit = async (data: SignInFormData) => {
    await login(
      { id: "1", email: "bantajio22@gmail.com" },
      { accessToken: "sampletoken", refreshToken: "samplerefreshtoken" },
      isChecked,
    );
    // mutate(
    //   { email: data.email, password: data.password },
    //   {
    //     onSuccess: async (res) => {
    //       const { user, accessToken, refreshToken } = res.data;
    //       console.log("Login successful:", res.data);
    //       const token = { accessToken, refreshToken };

    //       await login({ id: user.id, email: user.email }, token, isChecked);

    //       if (!onBoardingCompleted) {
    //         router.replace("/onboarding");
    //       }
    //     },
    //     onError: (error: any) => {
    //       const errorMessage = error.response?.data?.message || error.message;
    //       Toast.show({
    //         type: "error",
    //         text1: errorMessage,
    //         text2: error.message,
    //       });
    //     },
    //   },
    // );
  };

  return (
    <View style={styles.container}>
      <ControllerTextInput
        control={control}
        name="email"
        isRequired={true}
        placeholder="Email"
        label="Email"
        errors={errors}
        prefixIcon={
          <MaterialIcons name="mail" size={18} color={Colors.iconSecondary} />
        }
      />

      <VStack style={styles.passwordSection}>
        <ControllerTextInput
          control={control}
          name="password"
          isRequired={true}
          placeholder="Password"
          label="Password"
          errors={errors}
          prefixIcon={
            <Entypo name="lock" size={18} color={Colors.iconSecondary} />
          }
          secureTextEntry={!showPassword}
          suffixIcon={
            <Pressable onPress={togglePasswordVisibility}>
              <MaterialCommunityIcons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={18}
                color={Colors.iconSecondary}
              />
            </Pressable>
          }
        />

        <HStack justifyContent="space-between">
          <HStack gap={8}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? Colors.primary : undefined}
            />
            <Text style={styles.secondaryText}>Remember Me</Text>
          </HStack>

          <Link
            style={styles.forgotPassword}
            href={{ pathname: "/(auth)/signup" }}
          >
            Forgot Password?
          </Link>
        </HStack>
      </VStack>

      <VStack style={styles.footer} gap={12}>
        <CustomButton
          title="Login"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitBtn}
          textStyle={styles.submitBtnText}
          disabled={!isValid || isPending}
          isLoading={isPending}
        />

        <HStack justifyContent="center" gap={4}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <Link style={styles.signUpLink} href={{ pathname: "/(auth)/signup" }}>
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 14,
  },
  passwordSection: {
    alignSelf: "auto",
  },
  checkbox: {
    height: 16,
    width: 16,
    borderColor: Colors.border,
  },
  secondaryText: {
    fontFamily: Typography.family.medium,
    fontSize: 12,
    color: "#8A8A91",
  },
  forgotPassword: {
    fontFamily: Typography.family.medium,
    fontSize: 12,
    color: Colors.primary,
  },
  footer: {
    width: "100%",
    marginTop: 20,
  },
  submitBtn: {
    paddingVertical: 12,
    borderRadius: 10,
  },
  submitBtnText: {
    fontSize: 12,
  },
  footerText: {
    fontSize: 11,
    color: Colors.textMuted,
    fontFamily: Typography.family.regular,
  },
  signUpLink: {
    fontSize: 11,
    fontFamily: Typography.family.medium,
    color: Colors.primary,
  },
});
