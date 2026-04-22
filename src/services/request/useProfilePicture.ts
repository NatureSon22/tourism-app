import { accountService } from "@/src/services/api/accountService";
import useAuthStore from "@/src/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useProfilePicture = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return accountService.updateProfilePicture(formData);
    },
    onSuccess: (response) => {
      const updatedPath = response.data?.path;

      if (updatedPath) {
        useAuthStore.getState().updateUser({
          profilePictureUrl: updatedPath,
        });
      }

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Profile picture updated",
        text2: "Your profile image has been updated successfully.",
        bottomOffset: 80,
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Unable to upload profile picture";
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Upload Failed",
        text2: message,
        bottomOffset: 80,
      });
    },
  });
};
