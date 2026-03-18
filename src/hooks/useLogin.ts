import { useMutation } from "@tanstack/react-query";
import authService from "../services/api/authService";

export const useLogin = (rememberMe: boolean) =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await authService.login(email, password, rememberMe);
      return response;
    },
  });
