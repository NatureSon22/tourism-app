import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { tokenStorage } from "./../utils/tokenStorage";

export type User = {
  id: string;
  email: string;
};

interface AuthState {
  user: User | null;
  onBoardingCompleted: boolean;
  rememberMe: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthActions {
  login: (
    user: User,
    tokens: { accessToken: string; refreshToken: string },
    rememberMe: boolean,
  ) => Promise<void>;
  logout: () => Promise<void>;
  hydrateTokens: (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => void;
  completeOnBoarding: () => void;
  clearApp: () => void;
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      onBoardingCompleted: false,
      rememberMe: false,
      accessToken: null,
      refreshToken: null,

      login: async (user, tokens, rememberMe) => {
        await tokenStorage.saveTokens(tokens);

        set({
          user,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          rememberMe,
        });
      },

      hydrateTokens: (tokens) =>
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        }),

      logout: async () => {
        await tokenStorage.clearTokens();
        await AsyncStorage.clear();

        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          rememberMe: false,
        });
      },

      completeOnBoarding: async () => set({ onBoardingCompleted: true }),

      clearApp: async () => {
        await tokenStorage.clearTokens();
        await AsyncStorage.clear();

        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          onBoardingCompleted: false,
          rememberMe: false,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        onBoardingCompleted: state.onBoardingCompleted,
        rememberMe: state.rememberMe,
      }),
    },
  ),
);

export default useAuthStore;
