import { OnboardingTab } from "@/src/constants/onboardingTabs";
import { Typography } from "@/src/constants/styles";
import { Image } from "expo-image";
import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PreferenceTabProps = OnboardingTab & {
  selectedPreference: number | null;
  handleSelection: (id: number) => void;
};

const PreferenceTab = ({
  id,
  img,
  description,
  selectedPreference,
  handleSelection,
}: PreferenceTabProps) => {
  const isSelected = selectedPreference === id;
  const isEven = id % 2 === 0;

  return (
    <Pressable onPress={() => handleSelection(id)}>
      <View
        style={[
          styles.container,
          { flexDirection: isEven ? "row" : "row-reverse" },
          isSelected ? styles.selectedBackground : styles.defaultBackground,
        ]}
      >
        <View style={styles.imageWrapper}>
          <Image source={img} style={styles.image} contentFit="contain" />
        </View>
        
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  defaultBackground: {
    backgroundColor: "#F3F2FE",
  },
  selectedBackground: {
    backgroundColor: "#DEF0FF",
    borderColor: "#A3D3FF", 
  },
  imageWrapper: {
    width: 75,
    height: 75,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  description: {
    flex: 1,
    fontFamily: Typography.family.medium,
    fontSize: 14,
    textAlign: "center",
  },
});

export default memo(PreferenceTab);