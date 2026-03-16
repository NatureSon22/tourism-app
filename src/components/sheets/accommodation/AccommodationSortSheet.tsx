import SORT_OPTIONS from "@/src/config/sort";
import { Typography } from "@/src/constants/styles";
import VStack from "@/src/layouts/VStack";
import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";

export default function AccommodationSortSheet(props: SheetProps) {
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0].value);

  const handleCloseSheet = () => {
    // hide the current sheet
    SheetManager.hide(props.sheetId);
  };

  const handleSelectSort = (value: string) => {
    setSelectedSort(value);
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
          gap: 12,
          height: 180,
        }}
      >
        <View style={{ gap: 5 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 10,
              paddingHorizontal: 35,
              borderBottomWidth: 1,
              borderColor: "#D9D9D9",
            }}
          >
            <Pressable onPress={handleCloseSheet}>
              <Feather name="x" size={24} color="black" />
            </Pressable>

            <Text
              style={{
                fontFamily: Typography.family.medium,
                fontSize: 15,
                marginHorizontal: "auto",
              }}
            >
              Sort
            </Text>
          </View>

          <VStack
            style={{
              width: "100%",
              paddingVertical: 20,
              paddingHorizontal: 35,
              gap: 5,
            }}
          >
            {SORT_OPTIONS.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => handleSelectSort(option.value)}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily:
                        selectedSort === option.value
                          ? Typography.family.medium
                          : Typography.family.regular,
                    }}
                  >
                    {option.label}
                  </Text>

                  {selectedSort === option.value && (
                    <AntDesign name="check" size={14} color="#2E9CF4" />
                  )}
                </View>
              </Pressable>
            ))}
          </VStack>
        </View>
      </View>
    </ActionSheet>
  );
}
