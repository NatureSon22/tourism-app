import { useRouter } from "expo-router";
import { useRef } from "react";

export const useSafeNavigation = (delay = 500) => {
  const router = useRouter();
  const isNavigating = useRef(false);

  const safePush = (path: any, params?: any) => {
    if (isNavigating.current) return;

    isNavigating.current = true;

    router.push(path, params);

    setTimeout(() => {
      isNavigating.current = false;
    }, delay);
  };

  const safeBack = () => {
    if (isNavigating.current) return;

    isNavigating.current = true;

    router.back();

    setTimeout(() => {
      isNavigating.current = false;
    }, delay);
  };

  return { push: safePush, back: safeBack };
};
