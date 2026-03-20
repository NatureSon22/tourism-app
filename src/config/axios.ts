import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import useAuthStore from "../stores/authStore";
import { tokenStorage } from "../utils/tokenStorage";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3333",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for CSRF cookies
});

// 1. Request Interceptor
// src/config/axios.ts (request interceptor)
api.interceptors.request.use(async (config) => {
  try {
    const tokens = await tokenStorage.getTokens();

    config.headers = config.headers || {};
    if (tokens?.accessToken) {
      config.headers["Authorization"] = `Bearer ${tokens.accessToken}`;
    }

    const csrf = await AsyncStorage.getItem("@temp_dev_csrf_token");

    console.log("CSRF HEADER : " + csrf);

    if (csrf) {
      config.headers["X-CSRF-TOKEN"] = csrf;
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
    // Guard: if this is not an Axios request error with a config, just reject
    if (!error || !error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    const isAuthRequest =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register");

    // If 401 and we haven't tried refreshing yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {
      console.log("401 detected. Attempting token refresh...");

      if (isRefreshing) {
        // Queue the request while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const tokens = await tokenStorage.getTokens();

        // console.log("Attempting token refresh with tokens: ", tokens);

        if (!tokens?.refreshToken)
          throw new Error("No refresh token available");

        // Call refresh endpoint
        // Use a separate axios instance or the full URL to avoid interceptor interference
        const res = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {
            refreshToken: tokens.refreshToken,
          },
          {
            withCredentials: true,
            headers: {
              "X-CSRF-TOKEN": await AsyncStorage.getItem(
                "@temp_dev_csrf_token",
              ),
            },
          },
        );

        const { accessToken, refreshToken: newRefreshToken } = res.data.data;

        await tokenStorage.saveTokens({
          accessToken,
          refreshToken: newRefreshToken,
        });

        processQueue(null, accessToken);

        // Update the original request with the NEW token and retry
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout user
        processQueue(refreshError, null);
        console.error(error.response?.data?.message);
        await useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
