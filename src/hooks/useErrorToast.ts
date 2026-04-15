import { useEffect } from "react";
import Toast from "react-native-toast-message";

export const useErrorToast = (
  isError: boolean,
  error: unknown,
  fallbackMessage: string = "Something went wrong. Please try again.",
) => {
  useEffect(() => {
    if (isError) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        (error as Error)?.message ||
        fallbackMessage;

      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      });
    }
  }, [isError, error, fallbackMessage]);
};
