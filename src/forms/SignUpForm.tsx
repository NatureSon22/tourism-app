import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";
import ControllerTextInput from "../components/ui/ControllerTextInput";
import CustomButton from "../components/ui/CustomButton";
import { Colors, Typography } from "../constants/styles";
import { useRegister } from "../hooks/useRegister";
import HStack from "../layouts/HStack";
import VStack from "../layouts/VStack";
import useAuthStore from "../stores/authStore";
import evaluatePasswordStrength from "../utils/evaluatePassword";

const SignUpSchema = z
  .object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    values: {
      email: "user@gmail.com",
      password: "StrongPassword123",
      confirmPassword: "StrongPassword123",
      firstname: "John",
      lastname: "Doe",
      username: "johndoe",
    },
    mode: "onTouched",
  });
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate, isPending } = useRegister();

  const passwordValue = watch("password");

  useEffect(() => {
    const strength = evaluatePasswordStrength(passwordValue || "");

    if (!strength) {
      clearErrors("password");
      return;
    }

    if (strength.label === "Weak") {
      setError("password", { type: "manual", message: "Password is too weak" });
    } else {
      const current = errors.password as any;
      if (current && current.type === "manual") {
        clearErrors("password");
      }
    }
  }, [clearErrors, errors.password, passwordValue, setError]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit = (data: SignUpFormData) => {
    mutate({ email: data.email, password: data.password } as SignUpFormData, {
      onSuccess: async (data) => {
        const { user, accessToken, refreshToken } = data.data;
        const token = { accessToken, refreshToken };

        await login({ id: user.id, email: user.email }, token, false);

        router.replace("/(onboarding)/welcome");
      },
      onError: (error: any) => {
        console.error("Registration failed:", error);
        Toast.show({
          type: "error",
          text1: "Login failed",
          text2: error.message,
        });
      },
    });
  };

  return (
    <View style={{ width: "100%", gap: 10 }}>
      <ControllerTextInput
        control={control}
        name="email"
        placeholder="Email"
        isRequired={true}
        label={"Email"}
        errors={errors}
        textInputStyle={{ fontSize: 12 }}
        containerStyle={{ height: 40 }}
        prefixIcon={
          <MaterialIcons name="mail" size={15} color={Colors.iconSecondary} />
        }
      />

      <ControllerTextInput
        control={control}
        name="username"
        placeholder="Username"
        isRequired={true}
        label={"Username"}
        errors={errors}
        textInputStyle={{ fontSize: 12 }}
        containerStyle={{ height: 40 }}
        prefixIcon={
          <MaterialIcons name="mail" size={15} color={Colors.iconSecondary} />
        }
      />

      <ControllerTextInput
        control={control}
        name="password"
        label={"Password"}
        isRequired={true}
        placeholder="Password"
        errors={errors}
        prefixIcon={
          <Entypo name="lock" size={15} color={Colors.iconSecondary} />
        }
        textInputStyle={{ fontSize: 12 }}
        containerStyle={{ height: 40 }}
        secureTextEntry={!showPassword}
        showStrength={true}
        strengthEvaluator={(val: string) => evaluatePasswordStrength(val)}
        suffixIcon={
          showPassword ? (
            <Pressable onPress={togglePasswordVisibility}>
              <MaterialCommunityIcons
                name="eye-outline"
                size={18}
                color={Colors.iconSecondary}
              />
            </Pressable>
          ) : (
            <Pressable onPress={togglePasswordVisibility}>
              <MaterialCommunityIcons
                name="eye-off-outline"
                size={18}
                color={Colors.iconSecondary}
              />
            </Pressable>
          )
        }
      />

      <ControllerTextInput
        control={control}
        name="confirmPassword"
        placeholder="Confirm Password"
        isRequired={true}
        label={"Confirm Password"}
        errors={errors}
        textInputStyle={{ fontSize: 12 }}
        containerStyle={{ height: 40 }}
        prefixIcon={
          <Entypo name="lock" size={15} color={Colors.iconSecondary} />
        }
        secureTextEntry={!showConfirmPassword}
        suffixIcon={
          showConfirmPassword ? (
            <Pressable onPress={toggleConfirmPasswordVisibility}>
              <MaterialCommunityIcons
                name="eye-outline"
                size={18}
                color={Colors.iconSecondary}
              />
            </Pressable>
          ) : (
            <Pressable onPress={toggleConfirmPasswordVisibility}>
              <MaterialCommunityIcons
                name="eye-off-outline"
                size={18}
                color={Colors.iconSecondary}
              />
            </Pressable>
          )
        }
      />

      <HStack justifyContent="space-around">
        <ControllerTextInput
          control={control}
          name="firstname"
          isRequired={true}
          placeholder="First Name"
          label={"First Name"}
          errors={errors}
          textInputStyle={{ fontSize: 12 }}
          containerStyle={{ height: 40 }}
          style={{ flex: 1 }}
        />
        <ControllerTextInput
          control={control}
          name="lastname"
          isRequired={true}
          placeholder="Last Name"
          label={"Last Name"}
          errors={errors}
          textInputStyle={{ fontSize: 12 }}
          containerStyle={{ height: 40 }}
          style={{ flex: 1 }}
        />
      </HStack>

      <VStack style={{ width: "100%", marginTop: 20 }} gap={12}>
        <CustomButton
          title="Sign Up"
          onPress={handleSubmit(onSubmit)}
          style={{ paddingVertical: 12, borderRadius: 10 }}
          textStyle={{ fontSize: 12 }}
          disabled={!isValid || isPending}
          isLoading={isPending}
        />
        <Text
          style={{
            fontSize: 11,
            textAlign: "center",
            color: Colors.textMuted,
            fontFamily: Typography.family.regular,
          }}
        >
          Already have an account?
          <View style={{ width: 4 }} />
          <Link
            style={{
              fontFamily: Typography.family.medium,

              color: Colors.primary,
            }}
            href={{ pathname: "/(auth)/signin" }}
          >
            Sign In
          </Link>
        </Text>
      </VStack>
    </View>
  );
}
