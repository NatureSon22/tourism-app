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
      {/* 1. Image Container with Bookmark */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" />
        <View style={styles.bookmarkBadge}>
          <Ionicons name="bookmark" size={20} color="#FFB800" />
        </View>
      </View>

      <VStack style={styles.content} gap={4}>
        {/* 2. Location (Subtle/Muted) */}
        <Text style={styles.location}>{location}</Text>

        {/* 3. Name (Large/Bold) */}
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>

        {/* 4. Rating Row */}
        <HStack gap={4} alignItems="center">
          <Ionicons name="star" size={16} color="#E67E22" />
          <Text style={styles.ratingText}>{rating}</Text>
          <Text style={styles.reviewsText}>({reviews})</Text>
        </HStack>

        {/* 5. Price */}
        <Text style={styles.price}>{formatCurrency(price)}</Text>
      </VStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden", // Important for image corners
    width: '100%',
    // Subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bookmarkBadge: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  content: {
    padding: 16,
  },
  location: {
    fontSize: 14,
    color: "#888",
    fontFamily: Typography.family.regular,
  },
  name: {
    fontSize: 18,
    fontFamily: Typography.family.semiBold,
    color: "#1A1A1A",
    marginVertical: 2,
    lineHeight: 22,
  },
  ratingText: {
    fontSize: 15,
    fontFamily: Typography.family.bold,
    color: "#E67E22",
  },
  reviewsText: {
    fontSize: 15,
    color: "#AAA",
    fontFamily: Typography.family.regular,
  },
  price: {
    fontSize: 22,
    fontFamily: Typography.family.bold,
    color: "#2C3E50",
    marginTop: 8,
  },
});