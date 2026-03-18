import { Colors, Typography } from "@/src/constants/styles";
import { Transportation } from "@/src/constants/transportationList";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import formatCurrency from "@/src/utils/currency";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = Transportation;

export default function TransportationCard({
  name,
  location,
  price,
  rating,
  reviews,
  imageUrl,
}: Props) {
  return (
    <Pressable style={styles.card}>
      {/* Image Section - Square/Fixed Aspect for Grid Consistency */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.bookmarkBadge}>
          <Ionicons name="bookmark" size={18} color={Colors.rating} />
        </View>
      </View>

      {/* Content Section */}
      <VStack style={styles.content} gap={2}>
        <Text style={styles.location} numberOfLines={1}>
          {location}
        </Text>

        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>

        <HStack gap={4} alignItems="center">
          <Ionicons name="star" size={14} color={Colors.rating} />
          <Text style={styles.ratingText}>{rating}</Text>
          <Text style={styles.reviewsText}>({reviews})</Text>
        </HStack>

        <Text style={styles.price}>{formatCurrency(price)}</Text>
      </VStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: "hidden",
    flex: 1, // Allows card to grow in a grid
    margin: 4, // Space between columns
    // Shadow/Elevation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: "yellow",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1.1, // Slightly taller than a square, looks better in 2-col
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bookmarkBadge: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  content: {
    padding: 10,
  },
  location: {
    fontSize: 12,
    color: Colors.textMuted,
    fontFamily: Typography.family.regular,
  },
  name: {
    fontSize: 14,
    fontFamily: Typography.family.semiBold,
    color: Colors.textHeading,
    minHeight: 38, // Ensures alignment even if one title is 1 line and another is 2
    lineHeight: 18,
  },
  ratingText: {
    fontSize: 13,
    fontFamily: Typography.family.bold,
    color: Colors.rating,
  },
  reviewsText: {
    fontSize: 13,
    color: Colors.textCaption,
    fontFamily: Typography.family.regular,
  },
  price: {
    fontSize: 18,
    fontFamily: Typography.family.bold,
    color: Colors.textHeading,
    marginTop: 4,
  },
});
