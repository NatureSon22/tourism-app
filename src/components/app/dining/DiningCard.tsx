import { Colors, Typography } from "@/src/constants/styles";
import { DINING } from "@/src/types/listingTypes";
import formatCurrency from "@/src/utils/currency";
import { formatListingAddress } from "@/src/utils/formatListingAddress";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ImageGrid from "../ImageGrid";

type Props = DINING;

function DiningCard({
  id,
  title,
  addresses,
  distanceFromCityCenter,
  categories,
  images,
  base_price,
  rating = 0,
  reviews = 0,
  thumbnail,
  books = 0,
}: Props) {
  const router = useRouter();
  const types =
    categories && categories.length > 0
      ? categories.map((c) => c.name)
      : ["Category not specified"];
  const media =
    images && images.length > 0
      ? images.map((m) => m.src)
      : thumbnail
        ? [thumbnail]
        : [];

  const handlePress = () => {
    router.push({ pathname: `/dining/[id]`, params: { id } });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.nameRow}>
        <Text style={styles.name} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.distanceBadge}>
          <Text style={styles.distanceText}>
            {distanceFromCityCenter}km away
          </Text>
        </View>
      </View>

      <View style={styles.badgeRow}>
        {types.map((t) => (
          <View key={t} style={styles.typeBadge}>
            <Text style={styles.typeText}>{t}</Text>
          </View>
        ))}
      </View>

      <View style={styles.metaRow}>
        <Ionicons name="star" size={12} color={Colors.rating} />
        <Text style={styles.rating}>{rating}</Text>
        <Text style={styles.metaSep}> | </Text>
        <Text style={styles.metaText}>({reviews})</Text>
        {books > 0 && (
          <>
            <Text style={styles.metaSep}> | </Text>
            <Text style={styles.metaText}>{books}+ booked</Text>
          </>
        )}
      </View>

      {/* Row 4: Thumbnails */}
      <ImageGrid images={media} />

      {/* Row 5: Location + price */}
      <View style={styles.footer}>
        <Text style={styles.location} numberOfLines={1}>
          {addresses
            ? formatListingAddress(addresses, "short")
            : "Location not available"}
        </Text>
        <Text style={styles.price}>{formatCurrency(base_price)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    gap: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
  distanceBadge: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  distanceText: {
    fontSize: 10,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  typeBadge: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  typeText: {
    fontSize: 9,
    fontFamily: Typography.family.regular,
    color: Colors.primary,
  },
  // Row 3
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 13,
    fontFamily: Typography.family.semiBold,
    color: Colors.rating,
    marginLeft: 4,
    includeFontPadding: false,
  },
  metaSep: {
    color: Colors.border,
    fontSize: 12,
    includeFontPadding: false,
  },
  metaText: {
    fontSize: 12,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
    includeFontPadding: false,
  },
  // Row 4
  thumbRow: {
    flexDirection: "row",
    gap: 4,
    aspectRatio: 16 / 9,
  },
  thumbWrapper: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  thumbImage: {
    width: "100%",
    height: "100%",
  },
  extraOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  extraPlus: {
    color: "white",
    fontSize: 15,
    fontFamily: Typography.family.bold,
  },
  extraLabel: {
    color: "white",
    fontSize: 11,
    fontFamily: Typography.family.regular,
  },
  // Row 5
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  location: {
    fontSize: 12,
    fontFamily: Typography.family.medium,
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 13,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
});

export default memo(DiningCard);
