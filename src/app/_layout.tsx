import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SheetProvider } from "react-native-actions-sheet";
import { KeyboardProvider } from "react-native-keyboard-controller";
import * as Keychain from "react-native-keychain";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useShallow } from "zustand/react/shallow";
import { EXPO_SERVICE_NAME, IS_EXPO_GO } from "../config/constants";
import queryClient from "../config/queryClient";
import { Sheets } from "../config/sheets";
import toastConfig from "../config/toastConfig";
import useAuthStore from "../stores/authStore";

SplashScreen.preventAutoHideAsync();

function Routes() {
  // TODO: set to true while we check for an existing auth token on app launch
  // TODO: consider using the image instead
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const [loaded, error] = useFonts({
    "Poppins-Light": Poppins_300Light,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-Semibold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-MediumItalic": Poppins_500Medium_Italic,
    // ...FontAwesome.font,
    // ...Ionicons.font,
    // ...Feather.font,
    // ...MaterialCommunityIcons.font,
    // ...MaterialIcons.font,
    // ...FontAwesome5.font,
    // ...FontAwesome6.font,
  });

  const { onBoardingCompleted, user, clear, logout, rememberMe, login } =
    useAuthStore(
      useShallow((state) => ({
        onBoardingCompleted: state.onBoardingCompleted,
        user: state.user,
        clear: state.clearApp,
        logout: state.logout,
        rememberMe: state,
        login: state.login,
      })),
    );

  // useEffect(() => {
  //   clear();
  // }, []);

  // request for crsf token
  // useEffect(() => {
  //   async function fetchCsrfToken() {
  //     try {
  //       const token = await authService.requestCrsfToken();
  //       console.log("CSRF token:", token);
  //     } catch (error) {
  //       console.error("Failed to fetch CSRF token:", error);
  //     }
  //   }

  //   fetchCsrfToken();
  // }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // If a user is already present in the store (e.g. just logged in),
        // skip the initialization check to avoid race where init logs out the user.
        if (user) {
          console.log("Auth init skipped because user is already set");
          setIsAuthChecking(false);
          return;
        }

        let savedTokens = null; // in here savedTokens is an object { accessToken, refreshToken }

        if (IS_EXPO_GO) {
          // Dev Fallback: Check temporary storage
          const raw = await AsyncStorage.getItem("@temp_dev_tokens");
          savedTokens = raw ? JSON.parse(raw) : null;
        } else {
          // Production/Dev Build: Check secure hardware
          const credentials = await Keychain.getGenericPassword({
            service: EXPO_SERVICE_NAME,
          });
          if (credentials) {
            savedTokens = JSON.parse(credentials.password as string);
          }
        }

        // 2. Logic Check: Do we have a valid session?
        if (savedTokens && user) {
          console.log("Session restored successfully");
        } else {
          console.log("No session found, clearing state");
          logout();
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        logout();
      } finally {
        setIsAuthChecking(false);
      }
    };

    initializeAuth();
    // run once on mount only
  }, [logout, user]);

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
              <Stack.Screen name="(onboarding)" />
            </Stack.Protected>

            {/* User exists and onboarding is done */}
            <Stack.Protected guard={!!user && onBoardingCompleted}>
              <Stack.Screen name="(bookmark)" />
              <Stack.Screen name="(accommodation)" />
              <Stack.Screen name="(main)" />
              <Stack.Screen name="(forum)" />
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
