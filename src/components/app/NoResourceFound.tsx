import { SAD_FACE_IMAGE } from "@/src/constants/assetsPath";
import { Colors, Typography } from "@/src/constants/styles";
import Center from "@/src/layouts/Center";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

type NoResourceFoundProps = {
  message?: string;
};

export default function NoResourceFound({ message }: NoResourceFoundProps) {
  return (
    <Center>
      <View style={{ alignItems: "center", gap: 25, paddingBottom: 40 }}>
        <Image source={SAD_FACE_IMAGE} style={{ width: 100, height: 100 }} />

        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontFamily: Typography.family.regular,
              fontSize: 13,
              color: Colors.textMuted,
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            {message || "No Resource Found"}
          </Text>
        </View>
      </View>
    </Center>
  );
}
