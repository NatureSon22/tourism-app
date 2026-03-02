import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_BACKEND_URL || "http://localhost:3333",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = "auth-token"; // token from secure storage or context

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    // Any status code in the range of 2xx will trigger this function
    return response;
  },
  (error) => {
    // If ther server returns 401, the token is invalid or expired,
    if (error.response?.status === 401) {
      // Handle token refresh logic here, e.g., call a refresh endpoint, update token in storage, etc.
      // clearTokenFromStorage();
      // redirect to login page or show login modal
      console.warn("Unauthorized! Token may be invalid or expired.");
    }

    return Promise.reject(error);
  },
);

export default api;
