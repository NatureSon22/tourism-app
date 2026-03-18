import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { SheetProvider } from "react-native-actions-sheet";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useShallow } from "zustand/react/shallow";
import queryClient from "../config/queryClient";
import { Sheets } from "../config/sheets";
import toastConfig from "../config/toastConfig";
import authService from "../services/api/authService";
import useAuthStore from "../stores/authStore";
import { tokenStorage } from "../utils/tokenStorage";

SplashScreen.preventAutoHideAsync();

function Routes() {
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const [loaded, error] = useFonts({
    "Poppins-Light": Poppins_300Light,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-Semibold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-MediumItalic": Poppins_500Medium_Italic,
  });

  const {
    onBoardingCompleted,
    user,
    clear,
    logout,
    rememberMe,
    login,
    refreshToken,
  } = useAuthStore(
    useShallow((state) => ({
      onBoardingCompleted: state.onBoardingCompleted,
      user: state.user,
      clear: state.clearApp,
      logout: state.logout,
      rememberMe: state,
      login: state.login,
      refreshToken: state.refreshToken,
    })),
  );

  // useEffect(() => {
  //   clear();
  // }, []);

  // request for crsf token
  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const token = await authService.requestCrsfToken();
        console.log("CSRF token:", token);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    }

    fetchCsrfToken();
  }, []);

  // useEffect(() => {
  //   async function refreshToken() {
  //     try {
  //       const tokens = await tokenStorage.getTokens();
  //       const response = await authService.refreshToken(tokens?.refreshToken || "");
  //       console.log("REFRESH RESPONSE: " + response.data)
  //     } catch (error) {
  //       console.error("Failed to fetch CSRF token:", error);
  //     }
  //   }

  //   // refreshToken();
  // }, []);

  // useEffect(() => {
  //   async function test() {
  //     try {
  //       const response = await authService.testReq();
  //       console.log("Test request successful:", response);
  //     } catch (error) {
  //       console.error(
  //         "Test request failed:",
  //         error.response?.data?.message || error.message,
  //       );
  //     }
  //   }

  //   test();
  // }, []);

  const initializeAuth = useCallback(async () => {
    try {
      if (user) {
        setIsAuthChecking(false);
        return;
      }

      const tokens = await tokenStorage.getTokens();

      if (tokens) {
        // Hydrate tokens into the store so interceptors can attach access token
        useAuthStore.getState().hydrateTokens(tokens);
      } else {
        await logout();
      }
    } catch (e) {
      console.error(e);
    } finally {
      // THIS IS CRITICAL: Always set to false to unblock the UI
      setIsAuthChecking(false);
    }
  }, [logout, user]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Hide splash screen only when BOTH fonts and auth check are done
  useEffect(() => {
    if ((loaded || error) && !isAuthChecking) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, isAuthChecking]);

  // Prevent rendering anything until we are ready
  if ((!loaded && !error) || isAuthChecking) {
    return null;
  }

  return (
    <>
      <SheetProvider>
        <Sheets />
        <KeyboardProvider>
          <Stack screenOptions={{ headerShown: false }}>
            {/* If no user object exists, go to Auth */}
            <Stack.Protected guard={!user}>
              <Stack.Screen name="(auth)" />
            </Stack.Protected>

            {/* User exists but hasn't finished onboarding */}
            <Stack.Protected guard={!!user && !onBoardingCompleted}>
              <Stack.Screen name="onboarding" />
            </Stack.Protected>

            {/* User exists and onboarding is done */}
            {/* TODO: turn back the auth */}

            <Stack.Protected guard={!!user && onBoardingCompleted}>
              <Stack.Screen name="(main)" />
              <Stack.Screen name="accommodation" />
              <Stack.Screen name="dining" />
              <Stack.Screen name="activity" />
              <Stack.Screen name="event" />
              {/* <Stack.Screen name="(bookmark)" /> */}
              {/* <Stack.Screen name="(forum)" /> */}
            </Stack.Protected>
          </Stack>
        </KeyboardProvider>
      </SheetProvider>
      <Toast config={toastConfig} />
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
