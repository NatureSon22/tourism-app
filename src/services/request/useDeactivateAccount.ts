import { accountService } from "@/src/services/api/accountService";
import useAuthStore from "@/src/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

type DeactivatePayload = {
  username: string;
  email: string;
  reason: string;
};

export function useDeactivateAccount() {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: async (payload: DeactivatePayload) => {
      return accountService.deactivateAccount(
        payload.username,
        payload.email,
        payload.reason,
      );
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Account deactivated",
        text2: "Your account has been deactivated successfully.",
        bottomOffset: 80,
      });
      logout();
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        position: "bottom",
        text1:
          error?.response?.data?.message ||
          "Unable to deactivate your account.",
        text2:
          error?.response?.data?.message ||
          "Unable to deactivate your account. Please try again.",
        bottomOffset: 80,
      });
    },
  });
}
