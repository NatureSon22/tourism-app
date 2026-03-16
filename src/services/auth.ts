import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { ApiResponse } from "../config/axios";
import { SignUpFormData } from "../forms/SignUpForm";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
};

export type SignUpResponse = ApiResponse<AuthResponse>;
export type LoginResponse = ApiResponse<AuthResponse>;

const authService = {
  requestCrsfToken: async () => {
    const response = await fetch(
      "https://t28c8v35-3000.asse.devtunnels.ms/api/csrf-token",
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch CSRF token");
    }

    const data = await response.json();

    const csrfToken = data.data.csrfToken;

    // Store the token in AsyncStorage
    await AsyncStorage.setItem("@temp_dev_csrf_token", csrfToken);

    return csrfToken;
  },
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });

    return response.data;
  },

  register: async (userData: SignUpFormData) => {
    const response = await api.post<SignUpResponse>("/auth/register", userData);

    console.log("Registration response:", response.data);

    return response.data;
  },
};

export default authService;
