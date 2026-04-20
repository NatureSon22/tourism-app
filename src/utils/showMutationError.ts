import Toast from "react-native-toast-message";

export function showMutationError(
  error: unknown,
  fallbackMessage = "Something went wrong.",
) {
  const errorMessage =
    (error as any)?.response?.data?.message ||
    (error as Error)?.message ||
    fallbackMessage;

  Toast.show({
    type: "error",
    position: "bottom",
    text1: errorMessage,
    text2: errorMessage,
    bottomOffset: 80,
  });
}
