import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type DetailSectionProps = {
  title: string;
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
};

export default function DetailSection({
  title,
  children,
  containerStyle,
}: DetailSectionProps) {
  return (
    <VStack style={[styles.sectionContainer, containerStyle]}>
      <HStack
        gap={10}
        alignItems="center"
        justifyContent="flex-start"
        style={styles.sectionHeader}
      >
        <View style={styles.sectionIndicator} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </HStack>

      <View>{children}</View>
    </VStack>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    paddingVertical: 5,
    // borderWidth: 1,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
  sectionIndicator: {
    width: 4,
    height: "100%",
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
});
