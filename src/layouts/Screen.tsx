import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

type ScreenProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function Screen({ children, style }: ScreenProps) {
  return (
    <View
      style={[
        { flex: 1, padding: 16, borderWidth: 1, borderColor: "#ec4899" },
        style,
      ]}
    >
      {children}
    </View>
  );
}
