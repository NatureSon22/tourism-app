import { User } from "@/src/stores/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { ApiResponse } from "../../config/axios";
import { SignUpFormData } from "../../forms/SignUpForm";
import { tokenStorage } from "../../utils/tokenStorage";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type SignUpResponse = ApiResponse<AuthResponse>;
export type LoginResponse = ApiResponse<AuthResponse>;

const authService = {
  requestCrsfToken: async (): Promise<string> => {
    try {
      const response = await fetch(
        "https://5mftvr7z-3000.asse.devtunnels.ms/api/csrf-token",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Failed to fetch CSRF token: ${response.status} - ${errorBody}`,
        );
      }

      const result = await response.json();

      // --- GUARD START ---
      // Check if result.data exists AND result.data.csrfToken is a valid string
      const csrfToken = result?.data?.csrfToken;

      if (!csrfToken || typeof csrfToken !== "string") {
        console.error("Malformed API Response. Received:", result);
        throw new Error("CSRF Token was not found in the server response.");
      }
      // --- GUARD END ---

      // AsyncStorage only accepts strings. The guard above ensures this is a string.
      await AsyncStorage.setItem("@temp_dev_csrf_token", csrfToken);
      console.log("CSRF token stored in AsyncStorage:", csrfToken);

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
    const res = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
      rememberMe,
    });

    console.log("Login API Response:", res.data);

    return res.data;
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

    const { accessToken, refreshToken } = data.data;

    await tokenStorage.saveTokens({ accessToken, refreshToken });

    return data.data;
  },

  testReq: async () => {
    const { data } = await api.get("/consumer/listings");
    return data.data;
  },

  logout: async () => {
    // Clear secure token storage and remove temporary CSRF token
    await tokenStorage.clearTokens();
    //await AsyncStorage.removeItem("@temp_dev_csrf_token");
  },
};

export default authService;
