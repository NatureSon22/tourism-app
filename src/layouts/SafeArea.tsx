import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type SafeAreaProps = {
  children: React.ReactNode;
  edges?: ("top" | "right" | "bottom" | "left")[];
};

export default function SafeArea({
  children,
  edges = ["left", "right", "bottom"],
}: SafeAreaProps) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={edges}>
      {children}
    </SafeAreaView>
  );
}
