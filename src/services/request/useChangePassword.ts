import { accountService } from "@/src/services/api/accountService";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => {
      return accountService.updatePassword(currentPassword, newPassword);
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Password updated",
        text2: "Your password has been changed successfully.",
        bottomOffset: 80,
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Failed to change password";
      Toast.show({
        type: "error",
        position: "bottom",
        text1: errorMessage,
        bottomOffset: 80,
      });
    },
  });
};
