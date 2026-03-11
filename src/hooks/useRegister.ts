import { useMutation } from "@tanstack/react-query";
import authService from "../services/auth";
import { SignUpFormData } from "../forms/SignUpForm";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: SignUpFormData) => {
      const response = await authService.register(userData);
      return response;
    },
  });
};
