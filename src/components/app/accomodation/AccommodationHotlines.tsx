import { HotlineEntry } from "@/src/constants/fooddetail";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DetailSection from "../../ui/DetailsSection";

type AccommodationHotlinesProps = {
  hotlines: HotlineEntry[];
};

export default function AccommodationHotlines({ hotlines }: AccommodationHotlinesProps) {
  return (
    <DetailSection title="Nearby Local Hotlines">
      <View style={styles.hotlinesContainer}>
        {hotlines.map((hotline, index) => (
          <HStack
            key={index}
            gap={8}
            justifyContent="flex-start"
            style={styles.hotlineEntry}
          >
            <Text style={styles.hotlineText}>
              <Text style={styles.hotlineLabel}>{hotline.label}: </Text>
              <Text style={styles.hotlinePhone}>{hotline.phone}</Text>
            </Text>
          </HStack>
        ))}
      </View>
    </DetailSection>
  );
}

const styles = StyleSheet.create({
  hotlinesContainer: {
    flexDirection: "column",
    gap: 8,
  },
  hotlineEntry: {
    alignItems: "center",
  },
  hotlineText: {
    fontSize: 11.5,
    fontFamily: Typography.family.regular,
    color: Colors.text,
  },
  hotlineLabel: {
    fontFamily: Typography.family.medium,
  },
  hotlinePhone: {
    fontFamily: Typography.family.regular,
    textDecorationLine: "underline",
  },
});
