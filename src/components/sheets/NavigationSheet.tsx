import ALLTABNAVIGATION from "@/src/constants/options";
import { Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";

export default function OptionSheet(props: SheetProps) {
  const router = useRouter();

  const handleTabPress = (path: string) => {
    // close the sheet first
    SheetManager.hide(props.sheetId);

    // then navigate if a path was provided
    if (path) {
      setTimeout(() => {
        router.push(path as Parameters<typeof router.push>[0]);
      }, 200);
    }
  };

  return (
    <ActionSheet
      id={props.sheetId}
      gestureEnabled={true}
      defaultOverlayOpacity={0.5}
      containerStyle={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
    >
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 40,
          gap: 12,
          minHeight: 200,
          height: "55%",
        }}
      >
        <Text style={{ fontFamily: Typography.family.bold, fontSize: 20 }}>
          All
        </Text>

        <VStack gap={20}>
          {ALLTABNAVIGATION.map((item) => (
            <Pressable
              key={item.name}
              onPress={() => handleTabPress(item.path)}
            >
              <HStack justifyContent="flex-start" gap={15}>
                <View style={{ width: 30, height: 30 }}>
                  <Image
                    source={item.icon}
                    contentFit="contain"
                    style={{ width: 30, height: 30 }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    textAlign: "center",
                    fontFamily: Typography.family.medium,
                  }}
                >
                  {item.name}
                </Text>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </View>
    </ActionSheet>
  );
}
