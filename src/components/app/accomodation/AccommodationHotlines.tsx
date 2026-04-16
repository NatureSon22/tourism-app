import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import { Contact } from "@/src/types/baseListing";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DetailSection from "../../ui/DetailsSection";

type AccommodationHotlinesProps = {
  hotlines: Contact[];
};

export default function AccommodationHotlines({
  hotlines,
}: AccommodationHotlinesProps) {
  // mapped by type
  const groupedByLabel = hotlines.reduce<
    Record<string, { label: string; numbers: string[] }>
  >((acc, hotline) => {
    const label =
      hotline.label ?? (hotline.type === "phone" ? "Phone" : "Landline");

    if (!acc[label]) {
      acc[label] = {
        label,
        numbers: [],
      };
    }

    acc[label].numbers.push(hotline.number);
    return acc;
  }, {});

  const mappedHotlines = Object.values(groupedByLabel);

  return (
    <DetailSection title="Nearby Local Hotlines">
      <View style={styles.hotlinesContainer}>
        {mappedHotlines.map((hotline, index) => (
          <HStack key={index} gap={8} justifyContent="flex-start">
            <Text style={[styles.hotlineText, styles.hotlineEntry]}>
              {hotline.label}:{" "}
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {hotline.numbers.map((number, numIndex) => (
                <Text
                  key={numIndex}
                  style={[styles.hotlineText, styles.hotlinePhone]}
                >
                  {number}
                  {numIndex < hotline.numbers.length - 1 ? " | " : ""}
                </Text>
              ))}
            </ScrollView>
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
    fontFamily: Typography.family.medium,
    width: "18%",
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
  },
});
