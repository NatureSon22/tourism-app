import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { Colors } from "../constants/styles";

type ScreenProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: number;
};

export default function Screen({ children, style, padding = 16 }: ScreenProps) {
  return (
    <View
      style={[
        {
          flex: 1,
          padding,
          borderWidth: 1,
          borderColor: "#ec4899",
          backgroundColor: Colors.surface,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
