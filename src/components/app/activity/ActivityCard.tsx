import { Activity } from "@/src/constants/activity";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import formatCurrency from "@/src/utils/currency";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = Activity & {
  onPress?: () => void;
};

function ActivityCard({
  name,
  location,
  distanceFromCityCenter,
  rating,
  reviews,
  books,
  price,
  prevPrice,
  types,
  image,
  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      {/* Hero image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          contentFit="cover"
        />
        {/* Bookmark icon overlay */}
        <View style={styles.bookmarkBtn}>
          <Ionicons name="bookmark-outline" size={18} color={Colors.text} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title + distance badge */}
        <HStack justifyContent="flex-start" alignItems="center" gap={8}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
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
          {location}
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
          <Text style={styles.price}>{formatCurrency(price)}</Text>
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
