import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import { useBookmarkActivity } from "@/src/services/request/useActivity";
import { ACTIVITY } from "@/src/types/listingTypes";
import formatCurrency from "@/src/utils/currency";
import { formatListingAddress } from "@/src/utils/formatListingAddress";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { memo, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = ACTIVITY;

function ActivityCard({
  id,
  title,
  addresses,
  distanceFromCityCenter,
  rating = 0,
  reviews = 0,
  books = 0,
  base_price,
  prevPrice,
  thumbnail,
  categories,
  is_bookmarked,
}: Props) {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(is_bookmarked);
  const bookmarkMutation = useBookmarkActivity(id);
  const types =
    categories && categories.length > 0
      ? categories.map((c) => c.name)
      : ["Category not specified"];

  const handlePress = () => {
    router.push({ pathname: "/activity/[id]", params: { id: String(id) } });
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
    <Pressable onPress={handlePress} style={styles.card}>
      {/* Hero image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: thumbnail }}
          style={styles.image}
          contentFit="cover"
        />
        {/* Bookmark icon overlay */}
        <Pressable style={styles.bookmarkBtn} onPress={handleBookmark}>
          <Ionicons
            name={bookmarked ? "bookmark" : "bookmark-outline"}
            size={18}
            color={Colors.rating}
          />
        </Pressable>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title + distance badge */}
        <HStack justifyContent="space-between" alignItems="center" gap={8}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>
              {distanceFromCityCenter}km away
            </Text>
          </View>
        </HStack>

        {/* Type tag pills */}
        {types.length > 0 && (
          <View style={styles.tagRow}>
            {types.slice(0, 3).map((t) => (
              <View key={t} style={styles.tagPill}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Location */}
        <Text style={styles.location} numberOfLines={2}>
          {addresses
            ? formatListingAddress(addresses, "short")
            : "Location not available"}
        </Text>

        {/* Rating + reviews + booked */}
        <HStack justifyContent="flex-start" alignItems="center" gap={4}>
          <Ionicons name="star" size={14} color={Colors.rating} />
          <Text style={styles.ratingText}>{rating}</Text>
          <Text style={styles.reviewText}>({reviews})</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.booksText}>{books}+ booked</Text>
        </HStack>

        {/* Price row */}
        <HStack justifyContent="flex-start" alignItems="center" gap={6}>
          <Text style={styles.fromLabel}>From </Text>
          {base_price && (
            <Text style={styles.price}>{formatCurrency(base_price)}</Text>
          )}

          {prevPrice != null && (
            <Text style={styles.prevPrice}>{formatCurrency(prevPrice)}</Text>
          )}
        </HStack>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  imageWrapper: {
    width: "100%",
    height: 175,
    backgroundColor: Colors.background,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bookmarkBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 50,
    padding: 5,
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
  },
  title: {
    fontFamily: Typography.family.semiBold,
    fontSize: 16,
    color: Colors.text,
    flexShrink: 1,
  },
  distanceBadge: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  distanceText: {
    fontSize: 11,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tagPill: {
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 10,
    color: Colors.primary,
    fontFamily: Typography.family.regular,
    textTransform: "capitalize",
  },
  location: {
    fontSize: 12,
    fontFamily: Typography.family.regular,
  },
  ratingText: {
    fontFamily: Typography.family.semiBold,
    fontSize: 13,
    color: Colors.text,
    includeFontPadding: false,
  },
  reviewText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontFamily: Typography.family.regular,
  },
  separator: {
    fontSize: 12,
    color: Colors.border,
    marginHorizontal: 2,
  },
  booksText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontFamily: Typography.family.regular,
  },
  fromLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    fontFamily: Typography.family.regular,
  },
  price: {
    fontFamily: Typography.family.semiBold,
    fontSize: 15,
    color: Colors.text,
  },
  prevPrice: {
    fontFamily: Typography.family.regular,
    fontSize: 12,
    color: Colors.textMuted,
    textDecorationLine: "line-through",
  },
});

export default memo(ActivityCard);
