import { useRef } from "react";
import { Animated } from "react-native";

export function usePressAnimation() {
  const scale = useRef(new Animated.Value(1)).current;

  const trigger = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.82,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        tension: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return { scale, trigger };
}
