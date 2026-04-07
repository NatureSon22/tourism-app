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
import useAuthStore from "../stores/authStore";
import { tokenStorage } from "../utils/tokenStorage";

SplashScreen.preventAutoHideAsync();

function Routes() {
  const { onBoardingCompleted, user, logout, clear } = useAuthStore(
    useShallow((state) => ({
      onBoardingCompleted: state.onBoardingCompleted,
      user: state.user,
      logout: state.logout,
      clear: state.clearApp,
    })),
  );

  // clear()

  const isAuthChecking = useInitializeAuth(logout);

  const [loaded, error] = useFonts({
    "Poppins-Light": Poppins_300Light,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-Semibold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-MediumItalic": Poppins_500Medium_Italic,
  });

  const fontsReady = loaded || error;
  const appReady = fontsReady && !isAuthChecking;

  // Hide splash screen only when BOTH fonts and auth check are done
  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  // Prevent rendering anything until we are ready
  if (!appReady) {
    return null;
  }

  return (
    <>
      <SheetProvider>
        <Sheets />

        <KeyboardProvider>
          <AppNavigator user={user} onBoardingCompleted={onBoardingCompleted} />
        </KeyboardProvider>
      </SheetProvider>
      <Toast config={toastConfig} />
    </>
  );
}

function useInitializeAuth(logout: () => Promise<void>) {
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const initializeAuth = useCallback(async () => {
    try {
      // await authService.requestCrsfToken();

      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        setIsAuthChecking(false);
        return;
      }

      const tokens = await tokenStorage.getTokens();

      if (tokens) {
        // Hydrate tokens into the store so interceptors can attach access token
        useAuthStore.getState().hydrateTokens(tokens);
      } else {
        console.log("No tokens found during initialization");
        await logout();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuthChecking(false);
    }
  }, [logout]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return isAuthChecking;
}

function AppNavigator({
  user,
  onBoardingCompleted,
}: {
  user: unknown;
  onBoardingCompleted: boolean;
}) {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Tabs are available to everyone */}
      <Stack.Screen name="(tabs)" />

      {/* Auth flow is available for unauthenticated users only */}
      <Stack.Protected guard={!user}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      {/* User exists but hasn't finished onboarding */}
      <Stack.Protected guard={!!user && !onBoardingCompleted}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>

      {/* Protected app sections for completed signed-in users */}
      <Stack.Protected guard={!!user && onBoardingCompleted}>
        <Stack.Screen name="accommodation" />
        <Stack.Screen name="dining" />
        <Stack.Screen name="activity" />
        <Stack.Screen name="event" />
        <Stack.Screen name="transportation" />
        <Stack.Screen name="service" />
        <Stack.Screen name="account" />
        <Stack.Screen name="forum" />
      </Stack.Protected>
    </Stack>
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
