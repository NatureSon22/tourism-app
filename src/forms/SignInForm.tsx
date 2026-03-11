import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "expo-checkbox";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
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
  email: z.email("Invalid email address"),
  password: z.string().min(1, { message: "Password is required" }),
});

type SignInFormData = z.infer<typeof SignInSchema>;

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
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const [isChecked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useLogin(isChecked);

  const togglePasswordVisibility = () => setShowPassword((p) => !p);

  const onSubmit = (data: SignInFormData) => {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: async (data) => {
          const { user, accessToken, refreshToken } = data.data;
          const token = { accessToken, refreshToken };
          console.log("User data:", user);

          await login({ id: user.id, email: user.email }, token, isChecked);

          if (!onBoardingCompleted) {
            router.replace("/(onboarding)/welcome");
          }
        },
        onError: (error: any) => {
          console.error("Login failed:", error);
          Toast.show({
            type: "error",
            text1: "Login failed",
            text2: error.message,
          });
        },
      },
    );
  };

  return (
    <View style={{ width: "100%", gap: 14 }}>
      <ControllerTextInput
        control={control}
        name="email"
        isRequired={true}
        placeholder="Email"
        label={"Email"}
        errors={errors}
        prefixIcon={
          <MaterialIcons name="mail" size={18} color={Colors.iconSecondary} />
        }
      />

      <VStack style={{ alignSelf: "auto" }}>
        <ControllerTextInput
          control={control}
          name="password"
          isRequired={true}
          placeholder="Password"
          label={"Password"}
          errors={errors}
          prefixIcon={
            <Entypo name="lock" size={18} color={Colors.iconSecondary} />
          }
          secureTextEntry={!showPassword}
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

        <HStack justifyContent="space-between">
          <HStack>
            <Checkbox
              style={{ height: 16, width: 16, borderColor: Colors.border }}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? Colors.primary : undefined}
            />
            <Text
              style={{
                fontFamily: Typography.family.medium,
                fontSize: 12,
                color: "#8A8A91",
              }}
            >
              Remember Me
            </Text>
          </HStack>

          <Link
            style={{
              fontFamily: Typography.family.medium,
              fontSize: 12,
              color: Colors.primary,
            }}
            href={{ pathname: "/(auth)/signup" }}
          >
            Forgot Password?
          </Link>
        </HStack>
      </VStack>

      <VStack style={{ width: "100%", marginTop: 20 }} gap={12}>
        <CustomButton
          title="Login"
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
          Don&apos;t have an account?
          <View style={{ width: 4 }} />
          <Link
            style={{
              fontFamily: Typography.family.medium,
              color: Colors.primary,
            }}
            href={{ pathname: "/(auth)/signup" }}
          >
            Sign Up
          </Link>
        </Text>
      </VStack>
    </View>
  );
}
