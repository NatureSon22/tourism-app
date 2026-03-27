import { Review } from "@/src/constants/accommodationdetail";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ReviewPreviewCardProps = {
  review: Review;
};

export default function ReviewPreviewCard({ review }: ReviewPreviewCardProps) {
  return (
    <View style={styles.card}>
      <HStack gap={10} alignItems="center">
        {review.author?.avatarUrl ? (
          <Image
            source={{ uri: review.author.avatarUrl }}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]} />
        )}

        <VStack style={styles.headerInfo} gap={1}>
          <Text style={styles.author} numberOfLines={1}>
            {review.author?.name || "Anonymous"}
          </Text>
          <HStack gap={2} alignItems="flex-start" justifyContent="flex-start">
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
    borderRadius: 17.5,
    backgroundColor: "#D1D5DB",
  },
  avatarPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    flex: 1,
  },
  author: {
    fontSize: 12,
    fontFamily: Typography.family.medium,
    color: Colors.text,
    marginBottom: 2,
  },
  content: {
    fontSize: 11,
    fontFamily: Typography.family.regular,
    color: Colors.text,
    lineHeight: 18,
    marginTop: 4,
  },
});
