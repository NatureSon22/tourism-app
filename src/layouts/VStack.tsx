import React, { ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

type VStackProps = {
  gap?: number;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function VStack({ gap = 10, children, style }: VStackProps) {
  const items = React.Children.toArray(children);
  const lastIndex = items.length - 1;

  return (
    <View
      style={[
        {
          flexDirection: "column",
          alignSelf: "flex-start",
          justifyContent: "flex-start",
          
        },
        style,
      ]}
    >
      {items.map((child, i) => (
        <View key={i} style={{ marginBottom: i === lastIndex ? 0 : gap }}>
          {child}
        </View>
      ))}
    </View>
  );
}
