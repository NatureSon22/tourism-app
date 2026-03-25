import { Expectation } from "@/src/constants/accommodationdetail";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpectationCard from "./ExpectationCard";

type AccomodationExpectationsProps = {
  expectations: Expectation[];
};

export default function AccomodationExpectations({
  expectations,
}: AccomodationExpectationsProps) {
  // useQuery
  return (
    <VStack style={styles.sectionContainer}>
      <HStack gap={8} style={styles.sectionHeader}>
        <View style={styles.sectionIndicator} />
        <Text style={styles.sectionTitle}>What to expect</Text>
      </HStack>

      <FlatList
        data={expectations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ExpectationCard {...item} />}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        horizontal
      />
    </VStack>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    alignSelf: "stretch",
    gap: 5,
    marginVertical: 10, // Gives breathing room between different sections
  },
  sectionHeader: {
    justifyContent: "flex-start",
    gap: 10,
  },
  sectionIndicator: {
    width: 4,
    height: "100%",
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
});
