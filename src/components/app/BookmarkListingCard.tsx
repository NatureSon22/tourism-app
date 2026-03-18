import { BOOKMARK_ICON } from "@/src/constants/assetsPath";
import { Listing } from "@/src/constants/listings";

import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import formatCurrency from "@/src/utils/currency";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image } from "expo-image";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = Listing;
 
function BookmarkListingCard({
  imageUrl,
  name,
  location,
  pricePerNight,
  rating,
  reviews,
}: Props) {
  return (
    <View style={styles.card}>
      <HStack gap={17} alignItems="flex-start">
        <View style={styles.imageWrapper}>
          <Image source={imageUrl} contentFit="cover" style={styles.image} />
          <Image
            source={BOOKMARK_ICON}
            contentFit="contain"
            style={styles.bookmarkIcon}
          />
        </View>
 
        <VStack style={styles.content} gap={5}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
 
          <Text style={styles.location} numberOfLines={1}>
            {location}
          </Text>
 
          <VStack gap={0} style={{ alignItems: "flex-start" }}>
            <HStack alignItems="center" gap={5}>
              <FontAwesome6 name="star" size={10} color="#E28F0B" solid />
              <Text style={styles.ratingText}>{rating}</Text>
              <Text style={styles.reviewText}>({reviews})</Text>
            </HStack>
          </VStack>
 
          <Text style={styles.price}>{formatCurrency(pricePerNight)}</Text>
        </VStack>
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
  },
  imageWrapper: {
    width: 95,
    height: 105,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: 95,
    height: "100%",
    borderRadius: 10,
    backgroundColor: Colors.background,
  },
  bookmarkIcon: {
    position: "absolute",
    top: 5,
    right: 6,
    width: 20,
    height: 20,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
  location: {
    fontSize: 11,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
  },
  distanceText: {
    fontSize: 11,
    fontFamily: Typography.family.regular,
    color: "#2E9CF4",
  },
  ratingText: {
    fontSize: 10,
    fontFamily: Typography.family.medium,
    color: "#E28F0B",
  },
  reviewText: {
    fontSize: 10,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
  },
  price: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: Typography.family.semiBold,
    color: "#334155",
    alignSelf: "flex-start",
  },
});

export default memo(BookmarkListingCard);
