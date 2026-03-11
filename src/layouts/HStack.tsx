import React, { ReactNode } from "react";
import { View } from "react-native";

type HStackProps = {
  gap?: number;
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  children: ReactNode;
};

export default function HStack({
  gap = 10,
  children,
  alignItems,
  justifyContent,
}: HStackProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: alignItems || "center",
        justifyContent: justifyContent || "center",
        gap,
      }}
    >
      {children}
    </View>
  );
}
