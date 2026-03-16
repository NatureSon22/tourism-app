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
});

// 1. Request Interceptor
api.interceptors.request.use(async (config) => {
  try {
    const tokens = await tokenStorage.getTokens();

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
      if (isRefreshing) {
        // Queue the request while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const tokens = await tokenStorage.getTokens();

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

        await tokenStorage.saveTokens({
          accessToken,
          refreshToken: newRefreshToken,
        });

        processQueue(null, accessToken);

        // Update the original request with the NEW token and retry
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout user
        processQueue(refreshError, null);
        console.error("Refresh token expired or invalid");
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
