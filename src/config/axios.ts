import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Keychain from "react-native-keychain";
import {
  EXPO_SERVICE_NAME,
  IS_EXPO_GO,
  TEMP_TOKEN_KEY,
} from "../config/constants";
import useAuthStore from "../stores/authStore";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3333",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Helper to get tokens based on environment
const getStoredTokens = async () => {
  if (IS_EXPO_GO) {
    const raw = await AsyncStorage.getItem(TEMP_TOKEN_KEY);
    return raw ? JSON.parse(raw) : null;
  }
  const credentials = await Keychain.getGenericPassword({
    service: EXPO_SERVICE_NAME,
  });
  return credentials ? JSON.parse(credentials.password) : null;
};

// 1. Request Interceptor
api.interceptors.request.use(async (config) => {
  try {
    const tokens = await getStoredTokens();
    if (tokens?.accessToken) {
      config.headers.set("Authorization", `Bearer ${tokens.accessToken}`);
    }

    const csrf = await AsyncStorage.getItem("@temp_dev_csrf_token");
    if (csrf) {
      config.headers.set("X-XSRF-TOKEN", csrf);
    }
  } catch (error) {
    console.error("Request interceptor error:", error);
  }
  return config;
});

// 2. Response Interceptor (The Refresh Logic)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = await getStoredTokens();
        if (!tokens?.refreshToken)
          throw new Error("No refresh token available");

        // Call refresh endpoint
        // Use a separate axios instance or the full URL to avoid interceptor interference
        const res = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {
          refreshToken: tokens.refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = res.data.data;

        console.log("Token refreshed successfully: ", {
          accessToken,
          refreshToken: newRefreshToken,
        });

        const newTokens = {
          accessToken,
          refreshToken: newRefreshToken || tokens.refreshToken,
        };

        // Persist new tokens
        if (IS_EXPO_GO) {
          await AsyncStorage.setItem(TEMP_TOKEN_KEY, JSON.stringify(newTokens));
        } else {
          await Keychain.setGenericPassword(
            "user-session",
            JSON.stringify(newTokens),
            {
              service: EXPO_SERVICE_NAME,
            },
          );
        }

        // Update the original request with the NEW token and retry
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout user
        console.error("Refresh token expired or invalid");
        const { logout } = useAuthStore.getState();
        await logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
