import { Typography } from "@/src/constants/styles";
import TABNAVIGATION from "@/src/constants/tabNavigation";
import HStack from "@/src/layouts/HStack";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export default function TabNavigation() {
  const router = useRouter();
  const isBusy = useRef(false);

  const handleTabPress = (path: string, moduleId?: string) => {
    if (isBusy.current) return;

    isBusy.current = true;

    if (path !== "/more") {
      const route = moduleId
        ? { pathname: path as any, params: { moduleId } }
        : (path as Parameters<typeof router.push>[0]);

      router.push(route);
      // Reset lock after a short delay to prevent double-pushing the same route
      setTimeout(() => {
        isBusy.current = false;
      }, 500);
    } else {
      SheetManager.show("options-sheet", {
        onClose() {
          isBusy.current = false;
        },
      });
    }
  };

  return (
    <View style={styles.wrapper}>
      <HStack gap={0} alignItems="flex-start">
        {TABNAVIGATION.map((item) => (
          <Pressable
            key={item.name}
            onPress={() => handleTabPress(item.path, item.moduleId)}
            style={styles.tabPressable}
          >
            <View style={styles.tabContent}>
              <View style={styles.iconWrapper}>
                <Image
                  source={item.icon}
                  contentFit="contain"
                  style={styles.icon}
                />
              </View>

              {/* <Text style={styles.tabLabel} numberOfLines={1}>
                {item.name}
              </Text> */}
            </View>
          </Pressable>
        ))}
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignSelf: "flex-start",
  },
  tabPressable: {
    flex: 1,
  },
  tabContent: {
    alignItems: "center",
    gap: 4,
  },
  iconWrapper: {
    width: 30,
    height: 30,
  },
  icon: {
    width: 30,
    height: 30,
  },
  tabLabel: {
    fontSize: 8,
    textAlign: "center",
    width: 50,
    fontFamily: Typography.family.medium,
  },
});
