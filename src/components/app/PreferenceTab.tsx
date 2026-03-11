import { OnboardingTab } from "@/src/constants/onboardingTabs";
import { Typography } from "@/src/constants/styles";
import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View } from "react-native";

type PreferenceTabProps = OnboardingTab & {
  selectedPreference: number | null;
  handleSelection: (id: number) => void;
};

export default function PreferenceTab({
  id,
  img,
  description,
  selectedPreference,
  handleSelection,
}: PreferenceTabProps) {
  return (
    <Pressable onPress={() => handleSelection(id)}>
      <View
        style={{
          flexDirection: id % 2 !== 0 ? "row-reverse" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: "#D9D9D9",
          borderRadius: 5,
          backgroundColor: selectedPreference === id ? "#DEF0FF" : "#F3F2FE",
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            width: 75,
            height: 75,
          }}
        >
          <Image
            source={img}
            style={{ width: "100%", height: "100%" }}
            contentFit="contain"
          />
        </View>
        <Text
          style={{
            flex: 1,
            fontFamily: Typography.family.medium,
            fontSize: 14,
            textAlign: "center",
          }}
        >
          {description}
        </Text>
      </View>
    </Pressable>
  );
}
