import { Colors, Typography } from "@/src/constants/styles";
import { useBookmarkDining } from "@/src/services/request/useDining";
import { DINING } from "@/src/types/listingTypes";
import formatCurrency from "@/src/utils/currency";
import { formatListingAddress } from "@/src/utils/formatListingAddress";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { memo, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  is_bookmarked,
}: Props) {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(is_bookmarked ?? false);
  const bookmarkMutation = useBookmarkDining(id);
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

  const handleBookmark = (event: GestureResponderEvent) => {
    event.stopPropagation?.();
    if (!id || bookmarkMutation.isPending) return;

    const nextBookmarked = !bookmarked;
    const previousBookmarked = bookmarked;
    setBookmarked(nextBookmarked);

    bookmarkMutation.mutate(
      { shouldBookmark: nextBookmarked },
      {
        onError: () => {
          setBookmarked(previousBookmarked);
        },
        onSuccess: (data) => {
          if (typeof data?.bookmarked === "boolean") {
            setBookmarked(data.bookmarked);
          }
        },
      },
    );
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.nameRow}>
        <Text style={styles.name} numberOfLines={1}>
          {title}
        </Text>

        {distanceFromCityCenter && (
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>
              {distanceFromCityCenter}km away
            </Text>
          </View>
        )}
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
      <View style={styles.imageGridWrapper}>
        <ImageGrid images={media} />
        <Pressable style={styles.gridBookmarkBtn} onPress={handleBookmark}>
          <Ionicons
            name={bookmarked ? "bookmark" : "bookmark-outline"}
            size={18}
            color={Colors.rating}
          />
        </Pressable>
      </View>

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
  imageGridWrapper: {
    position: "relative",
  },
  gridBookmarkBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 50,
    padding: 6,
    zIndex: 2,
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
  bookmarkBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: 6,
    zIndex: 1,
    borderWidth: 1,
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
