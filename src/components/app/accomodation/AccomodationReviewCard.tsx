import { Review } from "@/src/constants/accomodationListing";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type AccomodationReviewCardProps = {
  review: Review;
};

export default function AccomodationReviewCard({
  review,
}: AccomodationReviewCardProps) {
  return (
    <View style={styles.card}>
      <HStack gap={10} alignItems="flex-start">
        {review.author?.avatarUrl ? (
          <Image
            source={{ uri: review.author?.avatarUrl }}
            style={styles.avatar}
            contentFit="cover"
          />
        ) : (
          <View style={styles.avatar} />
        )}
        <VStack gap={2} style={{ flex: 1 }}>
          <Text style={styles.author} numberOfLines={1}>
            {review.author?.name}
          </Text>
          <HStack gap={2} alignItems="center" justifyContent="flex-start">
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name={i < review.rating ? "star" : "star-outline"}
                size={12}
                color={Colors.rating}
              />
            ))}
          </HStack>
        </VStack>
      </HStack>

      <Text style={styles.content} numberOfLines={3}>
        {review.comment}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    gap: 10,
    width: 250,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#D1D5DB",
  },
  author: {
    fontSize: 11,
    fontFamily: Typography.family.medium,
    color: Colors.text,
  },
  content: {
    fontSize: 11,
    fontFamily: Typography.family.regular,
    lineHeight: 20,
  },
});
