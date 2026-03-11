import { Typography } from "@/src/constants/styles";
import VStack from "@/src/layouts/VStack";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { CustomRadioGroup } from "../ui/CustomRadioGroup";

const AREAS = [
  {
    label: "Baguio",
    value: "baguio",
  },
  {
    label: "Tagaytay",
    value: "tagaytay",
  },
  {
    label: "Manila",
    value: "manila",
  },
  {
    label: "Cebu",
    value: "cebu",
  },
];

export default function AreaSheet(props: SheetProps) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const handleSelectArea = (value: string) => {
    setSelectedArea((prev) => (prev === value ? null : value));
  };

  const handleCloseSheet = () => {
    // hide the current sheet
    SheetManager.hide(props.sheetId);
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
          gap: 5,
          height: 350,
        }}
      >
        {/* header */}
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
            Area
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 35,
          }}
        >
          <VStack gap={20}>
            <Text
              style={{ fontFamily: Typography.family.semiBold, fontSize: 19 }}
            >
              Location
            </Text>

            <View style={{ paddingLeft: 10 }}>
              <CustomRadioGroup
                selectedValue={selectedArea}
                onSelect={handleSelectArea}
                options={AREAS}
              />
            </View>
          </VStack>
        </View>
      </View>
    </ActionSheet>
  );
}
