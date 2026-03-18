import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { ApiResponse } from "../../config/axios";
import { SignUpFormData } from "../../forms/SignUpForm";
import { tokenStorage } from "../../utils/tokenStorage";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
};

export type SignUpResponse = ApiResponse<AuthResponse>;
export type LoginResponse = ApiResponse<AuthResponse>;

const authService = {
  requestCrsfToken: async (): Promise<string> => {
    try {
      const response = await fetch(
        "https://t28c8v35-3000.asse.devtunnels.ms/api/csrf-token",
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response.ok) throw new Error("Failed to fetch CSRF token");

      const result = await response.json();
      const csrfToken = result.data.csrfToken;

      await AsyncStorage.setItem("@temp_dev_csrf_token", csrfToken);

      return csrfToken;
    } catch (error) {
      console.error("CSRF Fetch Error:", error);
      throw error;
    }
  },

  login: async (
    email: string,
    password: string,
    rememberMe: boolean,
  ): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
      rememberMe,
    });
    return data;
  },

  register: async (userData: SignUpFormData): Promise<SignUpResponse> => {
    const { data } = await api.post<SignUpResponse>("/auth/register", userData);
    return data;
  },

  refreshToken: async (token: string): Promise<AuthResponse> => {
    const { data } = await api.post<ApiResponse<AuthResponse>>(
      "/auth/refresh",
      {
        refreshToken: token,
      },
    );

    console.log("REFRESH TOKEN RESPONSE: ", data);

    return data.data;
  },

  testReq: async () => {
    const { data } = await api.get("/consumer/listings");
    return data.data;
  },

  logout: async () => {
    // Clear secure token storage and remove temporary CSRF token
    await tokenStorage.clearTokens();
    await AsyncStorage.removeItem("@temp_dev_csrf_token");
  },
};

export default authService;
