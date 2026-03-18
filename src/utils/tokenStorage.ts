import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from "react-native-keychain";
import {
  EXPO_SERVICE_NAME,
  IS_EXPO_GO,
  TEMP_TOKEN_KEY,
} from "../config/constants";

export type StoredTokens = {
  accessToken: string;
  refreshToken: string;
};

export const tokenStorage = {
  getTokens: async (): Promise<StoredTokens | null> => {
    try {
      if (IS_EXPO_GO) {
        const raw = await AsyncStorage.getItem(TEMP_TOKEN_KEY);
        return raw ? (JSON.parse(raw) as StoredTokens) : null;
      }
      const credentials = await Keychain.getGenericPassword({
        service: EXPO_SERVICE_NAME,
      });

      if (!credentials) return null;
      return JSON.parse(credentials.password) as StoredTokens;
    } catch (error) {
      console.error("tokenStorage.getTokens failed", error);
      return null;
    }
  },

  saveTokens: async (tokens: StoredTokens) => {
    try {
      if (IS_EXPO_GO) {
        await AsyncStorage.setItem(TEMP_TOKEN_KEY, JSON.stringify(tokens));
        return;
      }

      await Keychain.setGenericPassword("token", JSON.stringify(tokens), {
        service: EXPO_SERVICE_NAME,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
      });
    } catch (error) {
      console.error("tokenStorage.saveTokens failed", error);
    }
  },

  clearTokens: async () => {
    try {
      if (IS_EXPO_GO) {
        await AsyncStorage.removeItem(TEMP_TOKEN_KEY);
        return;
      }

      await Keychain.resetGenericPassword({
        service: EXPO_SERVICE_NAME,
      });
    } catch (error) {
      console.error("tokenStorage.clearTokens failed", error);
    }
  },
};
