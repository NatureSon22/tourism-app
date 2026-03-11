import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from "react-native-keychain";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { EXPO_SERVICE_NAME, IS_EXPO_GO, TEMP_TOKEN_KEY } from "../config/constants";

export type User = {
  id: string;
  email: string;
};

export type AuthStore = {
  user: User | null;
  accessToken?: string;
  refreshToken?: string;
  rememberMe: boolean;
  onBoardingCompleted: boolean;
  login: (
    user: User,
    token: { accessToken: string; refreshToken: string },
    rememberMe: boolean,
  ) => Promise<void>;
  logout: () => Promise<void>;
  completeOnBoarding: () => void;
  resetOnBoarding: () => void;
  clearApp: () => void;
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      rememberMe: false,
      onBoardingCompleted: false,

      login: async (user, token, rememberMe) => {
        // Persist tokens first to avoid init race where a user exists without stored tokens
        const tokensObj = {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        };

        try {
          if (rememberMe) {
            if (IS_EXPO_GO) {
              console.log("Storing tokens in AsyncStorage for development");
              await AsyncStorage.setItem(
                TEMP_TOKEN_KEY,
                JSON.stringify(tokensObj),
              );
            } else {
              // store the tokens JSON string in the hardware-encrypted vault
              await Keychain.setGenericPassword(
                "user-session",
                JSON.stringify(tokensObj),
                {
                  service: EXPO_SERVICE_NAME,
                },
              );
            }
          }
        } catch (err) {
          console.error("Failed to persist auth tokens:", err);
          // continue: still set user in-memory even if persistence failed
        }

        set({
          user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          rememberMe,
        });
      },

      logout: async () => {
        try {
          if (IS_EXPO_GO) {
            await AsyncStorage.removeItem(TEMP_TOKEN_KEY);
          } else {
            await Keychain.resetGenericPassword({ service: EXPO_SERVICE_NAME });
          }
        } catch (err) {
          console.error("Failed to clear persisted tokens:", err);
        }

        set({
          user: null,
          accessToken: undefined,
          refreshToken: undefined,
          rememberMe: false,
        });
      },

      completeOnBoarding: () => set({ onBoardingCompleted: true }),

      resetOnBoarding: () => set({ onBoardingCompleted: false }),

      clearApp: () =>
        set({
          user: null,
          accessToken: undefined,
          refreshToken: undefined,
          onBoardingCompleted: false,
          rememberMe: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        onBoardingCompleted: state.onBoardingCompleted,
      }),
    },
  ),
);

export default useAuthStore;
