import { LOADING_IMAGE } from "@/src/constants/assetsPath";
import { Colors, Typography } from "@/src/constants/styles";
import Center from "@/src/layouts/Center";
import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View } from "react-native";

type ReloadPageProps = {
  message?: string;
  refetch: () => void;
  isRefetching?: boolean;
};

export default function ReloadPage({
  message,
  refetch,
  isRefetching,
}: ReloadPageProps) {
  return (
    <Center>
      <Pressable
        onPress={() => refetch()}
        disabled={isRefetching}
        style={{ width: "100%", opacity: isRefetching ? 0.6 : 1 }}
      >
        <View style={{ alignItems: "center", gap: 25, paddingBottom: 40 }}>
          <Image source={LOADING_IMAGE} style={{ width: 80, height: 80 }} />

          <View style={{ width: "75%" }}>
            <Text
              style={{
                fontFamily: Typography.family.regular,
                fontSize: 13,
                color: Colors.textMuted,
                textAlign: "center",
                lineHeight: 22,
              }}
            >
              {isRefetching
                ? "Reloading..."
                : message ||
                  "Something went wrong. Please try reloading the page."}
            </Text>
          </View>
        </View>
      </Pressable>
    </Center>
  );
}
