import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"), // Fixed: z.string().email()
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate, isPending } = useRegister();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      username: "",
    },
    mode: "onTouched",
  });

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
      if (current?.type === "manual") clearErrors("password");
    }
    // only run when password text changes
  }, [passwordValue, setError, clearErrors]);

  const onSubmit = (data: SignUpFormData) => {
    mutate(data, {
      onSuccess: async (res) => {
        const { user, accessToken, refreshToken } = res.data;
        console.log("Registration successful:", res.data);
        // await login(
        //   { id: user.id, email: user.email },
        //   { accessToken, refreshToken },
        //   false,
        // );
        // router.replace("/onboarding");
      },
      onError: (error: any) => {
        console.log(
          "Registration error:",
          error.response.data.message || error.message,
        );

        Toast.show({
          type: "error",
          text1: "Registration failed",
          text2: error.message,
        });
      },
    });
  };

  return (
    <View style={styles.container}>
      <ControllerTextInput
        control={control}
        name="email"
        placeholder="Email"
        isRequired
        label="Email"
        errors={errors}
        textInputStyle={styles.smallInputText}
        containerStyle={styles.inputHeight}
        prefixIcon={
          <MaterialIcons name="mail" size={15} color={Colors.iconSecondary} />
        }
      />

      <ControllerTextInput
        control={control}
        name="username"
        placeholder="Username"
        isRequired
        label="Username"
        errors={errors}
        textInputStyle={styles.smallInputText}
        containerStyle={styles.inputHeight}
        prefixIcon={
          <MaterialIcons name="person" size={15} color={Colors.iconSecondary} />
        }
      />

      <ControllerTextInput
        control={control}
        name="password"
        label="Password"
        isRequired
        placeholder="Password"
        errors={errors}
        prefixIcon={
          <Entypo name="lock" size={15} color={Colors.iconSecondary} />
        }
        textInputStyle={styles.smallInputText}
        containerStyle={styles.inputHeight}
        secureTextEntry={!showPassword}
        showStrength
        strengthEvaluator={evaluatePasswordStrength}
        suffixIcon={
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={18}
              color={Colors.iconSecondary}
            />
          </Pressable>
        }
      />

      <ControllerTextInput
        control={control}
        name="firstName"
        isRequired
        placeholder="First Name"
        label="First Name"
        errors={errors}
        textInputStyle={styles.smallInputText}
        containerStyle={styles.inputHeight}
        style={styles.flex1}
      />

      <ControllerTextInput
        control={control}
        name="lastName"
        isRequired
        placeholder="Last Name"
        label="Last Name"
        errors={errors}
        textInputStyle={styles.smallInputText}
        containerStyle={styles.inputHeight}
        style={styles.flex1}
      />

      <ControllerTextInput
        control={control}
        name="confirmPassword"
        placeholder="Confirm Password"
        isRequired
        label="Confirm Password"
        errors={errors}
        textInputStyle={styles.smallInputText}
        containerStyle={styles.inputHeight}
        prefixIcon={
          <Entypo name="lock" size={15} color={Colors.iconSecondary} />
        }
        secureTextEntry={!showConfirmPassword}
        suffixIcon={
          <Pressable
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <MaterialCommunityIcons
              name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
              size={18}
              color={Colors.iconSecondary}
            />
          </Pressable>
        }
      />

      <VStack style={styles.footer} gap={12}>
        <CustomButton
          title="Sign Up"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitBtn}
          textStyle={styles.submitBtnText}
          disabled={!isValid || isPending}
          isLoading={isPending}
        />
        <HStack justifyContent="center" gap={4}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link style={styles.signInLink} href={{ pathname: "/(auth)" }}>
            Sign In
          </Link>
        </HStack>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  inputHeight: {
    height: 40,
  },
  smallInputText: {
    fontSize: 12,
  },
  flex1: {
    flex: 1,
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
  signInLink: {
    fontFamily: Typography.family.medium,
    fontSize: 11,
    color: Colors.primary,
  },
});
