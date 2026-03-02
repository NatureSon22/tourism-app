import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type SafeAreaProps = {
  children: React.ReactNode;
};

export default function SafeArea({ children }: SafeAreaProps) {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["top", "left", "right", "bottom"]}
    >
      {children}
    </SafeAreaView>
  );
}
