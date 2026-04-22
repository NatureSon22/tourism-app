import {
  accountService,
  AccountUpdatePayload,
} from "@/src/services/api/accountService";
import useAuthStore from "@/src/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useAccount = () => {
  return useMutation({
    mutationFn: async (payload: AccountUpdatePayload) => {
      return accountService.updateAccountInformation(payload);
    },
    onSuccess: (response) => {
      const updatedUser = response.data;

      console.log("Updated user data:", updatedUser); // Debug log

      if (updatedUser) {
        useAuthStore.getState().updateUser(updatedUser);
      }
      //   queryClient.invalidateQueries([""]);
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Account updated",
        text2: "Your changes were saved successfully.",
        bottomOffset: 80,
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Unable to update account";
      console.log("Account update error:", message); // Debug log
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Update Failed",
        text2: message,
        bottomOffset: 80,
      });
    },
  });
};
