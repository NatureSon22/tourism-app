import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAuthStore from "@/src/stores/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { SignUpFormData } from "../../forms/SignUpForm";
import authService from "../api/authService";

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

export const useLogin = (rememberMe: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
      rememberMe,
    }: {
      email: string;
      password: string;
      rememberMe: boolean;
    }) => {
      // 1. Ensure CSRF is ready before login (Dev Tunnel requirement)
      await authService.requestCrsfToken();
      return authService.login(email, password, rememberMe);
    },
    onSuccess: async (response) => {
      const { user, accessToken, refreshToken } = response.data;
      const token = { accessToken, refreshToken };

      useAuthStore.getState().login(
        {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          profilePictureUrl: user.profilePictureUrl,
        },
        token,
        rememberMe,
      );

      // 2. Store tokens (Use Keychain for production, AsyncStorage for dev)
      await AsyncStorage.setItem("@access_token", accessToken);
      await AsyncStorage.setItem("@refresh_token", refreshToken);

      // 3. Update global user state
      queryClient.setQueryData(authKeys.user(), user);

      console.log("Login successful, tokens stored.");
    },
    onError: (error: any) => {
      Alert.alert(
        "Login Failed",
        error?.response?.data?.message || "Invalid credentials",
      );
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: SignUpFormData) => {
      return authService.register(userData);
    },
    onSuccess: (res) => {
      Alert.alert("Success", "Account created! Please login.");
    },
    onError: (error: any) => {
      Alert.alert(
        "Registration Error",
        error?.response?.data?.message || "Something went wrong",
      );
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await AsyncStorage.multiRemove(["@access_token", "@refresh_token"]);
    },
    onSuccess: () => {
      queryClient.clear(); // Clear all cache on logout
    },
  });
};
