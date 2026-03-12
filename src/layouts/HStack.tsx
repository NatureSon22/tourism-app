import React, { ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

type HStackProps = {
  gap?: number;
  alignItems?: "flex-start" | "center" | "flex-end";
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function HStack({
  gap = 10,
  children,
  alignItems,
  justifyContent,
  style,
}: HStackProps) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: alignItems || "center",
          justifyContent: justifyContent || "center",
          gap,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
