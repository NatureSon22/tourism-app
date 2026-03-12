import FilterBar from "@/src/components/app/FilterBar";
import { DINING_FILTERS } from "@/src/constants/filterOptions";
import { Colors, Typography } from "@/src/constants/styles";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export default function DiningPage() {
  const sheetShownRef = useRef(false);

  const handleAreaPress = (sheet: string) => {
    if (!sheetShownRef.current) {
      SheetManager.show(sheet, {
        onClose(data) {
          sheetShownRef.current = false;
        },
      });
      sheetShownRef.current = true;
    }
  };

  return (
    <SafeArea edges={["bottom"]}>
      <Stack.Screen
        options={{
          headerLeft: () => null,
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
            >
              <MaterialIcons name="arrow-back-ios" size={20} color="black" />

              <Text
                style={{ fontFamily: Typography.family.medium, fontSize: 14 }}
              >
                Food and Dining
              </Text>

              <Pressable onPress={() => {}}>
                <MaterialIcons
                  name="search"
                  size={20}
                  color={Colors.textMuted}
                />
              </Pressable>
            </View>
          ),
        }}
      />

      <Screen
        style={{
          gap: 20,
          paddingBottom: 10,
          paddingTop: 0,
          paddingHorizontal: 0,
        }}
      >
        {/* filter */}
        <FilterBar
          filters={DINING_FILTERS}
          onPress={handleAreaPress}
          containerStyle={{ borderWidth: 1, paddingVertical: 10 }}
        />

        {/* list of dining places */}
      </Screen>
    </SafeArea>
  );
}
