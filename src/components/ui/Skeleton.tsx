import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  DimensionValue,
  Easing,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type BaseSkeletonProps = {
  style?: ViewStyle;
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
};

const ShimmerOverlay = React.memo(() => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.bezier(0.4, 0, 0.6, 1),
        useNativeDriver: true,
      }),
    ).start();
  }, [animatedValue]);

  // Interpolate to move from -100% to 100% of the container width
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-350, 350], // Increased range to cover wider components
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          transform: [{ translateX }],
          width: "200%", // Makes the gradient wider than the container for a better sweep
        },
      ]}
    >
      <LinearGradient
        colors={["#ebebeb", "#f2f2f2", "#ebebeb"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
});

ShimmerOverlay.displayName = "ShimmerOverlay";

const Rect: React.FC<BaseSkeletonProps> = ({
  style,
  width = "100%",
  height = 20,
  borderRadius = 4,
}) => {
  return (
    <View style={[styles.base, { width, height, borderRadius }, style]}>
      <ShimmerOverlay />
    </View>
  );
};

const Circle: React.FC<Omit<BaseSkeletonProps, "borderRadius">> = ({
  style,
  width = 50,
  height = 50,
}) => {
  return (
    <View style={[styles.base, styles.circle, { width, height }, style]}>
      <ShimmerOverlay />
    </View>
  );
};

export const Skeleton = {
  Rect,
  Circle,
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: "#ebebeb",
    overflow: "hidden",
    position: "relative",
  },
  circle: {
    borderRadius: 9999,
  },
});
