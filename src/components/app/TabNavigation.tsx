import { Typography } from "@/src/constants/styles";
import TABNAVIGATION from "@/src/constants/tabNavigation";
import HStack from "@/src/layouts/HStack";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export default function TabNavigation() {
  const router = useRouter();
  const sheetShownRef = useRef(false);

  const handleTabPress = (path: string) => {
    if (path !== "/more") {
      router.push(path as Parameters<typeof router.push>[0]);
    } else {
      // show the sheet only once per session
      if (!sheetShownRef.current) {
        SheetManager.show("options-sheet", {
          onClose(data) {
            sheetShownRef.current = false;
          },
        });
        sheetShownRef.current = true;
      }
    }
  };

  return (
    <View
      style={{
        width: "100%",
        alignSelf: "flex-start",
      }}
    >
      <HStack gap={0} alignItems="flex-start">
        {TABNAVIGATION.map((item) => (
          <Pressable
            key={item.name}
            onPress={() => handleTabPress(item.path)}
            style={{ flex: 1 }}
          >
            <View
              style={{
                alignItems: "center",
                gap: 4,
              }}
            >
              <View style={{ width: 30, height: 30 }}>
                <Image
                  source={item.icon}
                  contentFit="contain"
                  style={{ width: 30, height: 30 }}
                />
              </View>

              <Text
                style={{
                  fontSize: 8,
                  textAlign: "center",
                  width: 50,
                  fontFamily: Typography.family.medium,
                }}
              >
                {item.name}
              </Text>
            </View>
          </Pressable>
        ))}
      </HStack>
    </View>
  );
}
