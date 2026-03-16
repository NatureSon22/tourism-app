import { Review } from "@/src/constants/accomodationListing";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../ui/CustomButton";
import AccomodationReviewCard from "./AccomodationReviewCard";

type AccomodationReviewsProps = {
  reviews: Review[];
};

export default function AccomodationReviews({
  reviews,
}: AccomodationReviewsProps) {
  // useQuery
  return (
    <VStack style={styles.sectionContainer}>
      <HStack gap={8} style={styles.sectionHeader}>
        <View style={styles.sectionIndicator} />
        <Text style={styles.sectionTitle}>Reviews</Text>
      </HStack>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AccomodationReviewCard review={item} />}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        horizontal
      />

      <CustomButton
        title="See all reviews"
        variant="outlined"
        style={{
          paddingVertical: 12,
          borderRadius: 8,
          borderWidth: 0.8,
          borderColor: Colors.secondary,
        }}
        textStyle={{
          fontSize: 11,
          fontFamily: Typography.family.light,
          color: Colors.text,
        }}
        onPress={() => {}}
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
