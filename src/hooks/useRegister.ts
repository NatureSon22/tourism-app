import { useMutation } from "@tanstack/react-query";
import { SignUpFormData } from "../forms/SignUpForm";
import authService from "../services/api/authService";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: SignUpFormData) => {
      const response = await authService.register(userData);
      return response;
    },
  });
};
