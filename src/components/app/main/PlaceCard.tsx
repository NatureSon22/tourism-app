import type { PlaceList } from "@/src/constants/placeList";
import { Colors, Typography } from "@/src/constants/styles";
import formatCurrency from "@/src/utils/currency";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PlaceCard({
  id,
  imageUrl,
  location,
  name,
  price,
  rating,
  reviews,
}: PlaceList) {
  const router = useRouter();

  const handlePress = () => {
    router.push({ pathname: "/accommodation/[id]", params: { id } });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={imageUrl}
          contentFit="cover"
          style={styles.fullSize}
          transition={0}
          cachePolicy="memory-disk"
        />

        <View style={styles.overlay}>
          <FontAwesome6 name="location-dot" size={10} color="white" />
          <Text numberOfLines={1} style={styles.overlayText}>
            {name}
          </Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text numberOfLines={1} style={styles.locationName}>
          {location}
        </Text>

        <View style={styles.ratingRow}>
          <FontAwesome6 name="star" size={10} color="#E28F0B" solid />
          <Text style={styles.ratingText}>{rating}</Text>
          <Text style={styles.reviewCount}>({reviews})</Text>
        </View>

        <Text style={styles.priceText}>From {formatCurrency(price)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
    overflow: "hidden",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  imageContainer: {
    width: "100%",
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  fullSize: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 3,
    left: 3,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    maxWidth: "90%",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  overlayText: {
    color: "white",
    fontSize: 11,
    fontFamily: Typography.family.regular,
  },
  detailsContainer: {
    gap: 5,
    padding: 8,
  },
  locationName: {
    fontSize: 11,
    fontFamily: Typography.family.medium,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 10,
    fontFamily: Typography.family.medium,
    color: Colors.rating,
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 10,
    fontFamily: Typography.family.medium,
    color: Colors.textDimmed,
  },
  priceText: {
    fontSize: 12,
    fontFamily: Typography.family.medium,
    color: Colors.textMuted,
  },
});
