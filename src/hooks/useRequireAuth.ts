import useAuthStore from "@/src/stores/authStore";
import Toast from "react-native-toast-message";

export function useRequireAuth() {
  const auth = useAuthStore((state) => state.user);

  const requireAuth = (message = "Sign in to do the action") => {
    if (!auth) {
      Toast.show({
        text1: message,
        type: "info",
        position: "bottom",
        bottomOffset: 90,
      });
      return false;
    }

    return true;
  };

  return { auth, requireAuth };
}
