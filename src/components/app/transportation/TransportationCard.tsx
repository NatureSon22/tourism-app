import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { TRANSPORTATION } from "@/src/types/listingTypes";
import formatCurrency from "@/src/utils/currency";
import { formatListingAddress } from "@/src/utils/formatListingAddress";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = TRANSPORTATION;
export default function TransportationCard({
  id,
  title,
  thumbnail,
  addresses,
  base_price,
  rating,
  reviews,
}: Props) {
  const router = useRouter();
  const location = addresses?.length
    ? formatListingAddress(addresses[0], "short")
    : "Location not available";

  const handlePress = () => {
    router.push({ pathname: "/transportation/[id]", params: { id } });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      {/* 1. Image Container with Bookmark */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: thumbnail }}
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.bookmarkBadge}>
          <Ionicons name="bookmark-outline" size={20} color={Colors.rating} />
        </View>
      </View>

      <VStack style={styles.content} gap={0}>
        {/* 2. Location (Subtle/Muted) */}
        <Text style={styles.location}>{location}</Text>

        {/* 3. Title (Large/Bold) */}
        <Text style={styles.name} numberOfLines={1}>
          {title}
        </Text>

        {/* 4. Rating Row */}
        <HStack gap={4} alignItems="center" justifyContent="flex-start">
          <Ionicons name="star" size={10} color={Colors.rating} />
          <Text style={styles.ratingText}>{rating}</Text>
          <Text style={styles.reviewsText}>({reviews})</Text>
        </HStack>

        {/* 5. Price */}
        <Text style={styles.price}>{formatCurrency(base_price)}</Text>
      </VStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden", // Important for image corners
    width: "100%",
    // Subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  imageContainer: {
    width: "100%",
    height: 120,
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
    padding: 10,
  },
  location: {
    fontSize: 10,
    color: Colors.textMuted,
    fontFamily: Typography.family.regular,
    includeFontPadding: false,
  },
  name: {
    fontSize: 12,
    fontFamily: Typography.family.semiBold,
    marginVertical: 2,
    lineHeight: 22,
    includeFontPadding: false,
  },
  ratingText: {
    fontSize: 10,
    fontFamily: Typography.family.bold,
    color: "#E67E22",
    includeFontPadding: false,
  },
  reviewsText: {
    fontSize: 10,
    color: "#AAA",
    fontFamily: Typography.family.regular,
    includeFontPadding: false,
  },
  price: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: Typography.family.medium,
    color: "#2C3E50",
  },
});
