import React from "react";
import { View } from "react-native";

type CenterProps = {
  children?: React.ReactNode;
};

export default function Center({ children }: CenterProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {children}
    </View>
  );
}
