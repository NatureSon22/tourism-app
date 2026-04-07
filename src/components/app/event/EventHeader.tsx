import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type EventHeaderProps = {
  name: string;
  rating: number;
  reviews: number;
  books: number;
  tags: string[];
  location: string;
  description: string;
};

export default function EventHeader({
  name,
  rating,
  reviews,
  books,
  tags,
  location,
  description,
}: EventHeaderProps) {
  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <>
      <VStack gap={8} style={{ alignItems: "flex-start" }}>
        <Text style={styles.title}>{name}</Text>

        <HStack gap={8} alignItems="center">
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingValue}>{rating.toFixed(1)}</Text>
            <Text style={styles.ratingSlash}>/</Text>
            <Text style={styles.ratingMax}>5</Text>
          </View>
          <Pressable>
            <Text style={styles.reviewsLink}>
              {reviews.toLocaleString()} reviews
            </Text>
          </Pressable>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.booksText}>{books}k + booked</Text>
        </HStack>
      </VStack>

      <View style={styles.tagsWrapper}>
        <FlatList
          data={tags}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.tagsContainer}
          renderItem={({ item: tag }) => (
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          )}
        />
      </View>

      <HStack
        gap={8}
        alignItems="center"
        justifyContent="space-between"
        style={{ width: "100%" }}
      >
        <HStack gap={4}>
          <Text style={styles.locationText}>📍</Text>
          <Pressable onPress={() => {}}>
            <Text style={styles.locationText} numberOfLines={1}>
              {location}
            </Text>
          </Pressable>
        </HStack>

        <Text style={styles.locationText}>›</Text>
      </HStack>

      <View style={styles.descriptionBox}>
        <Text
          style={styles.descriptionText}
          numberOfLines={showFullDesc ? undefined : 3}
        >
          {description}
        </Text>

        <Pressable
          onPress={() => setShowFullDesc((s) => !s)}
          style={{ marginTop: 8, alignSelf: "flex-start" }}
        >
          <Text style={styles.seeAllLink}>
            {showFullDesc ? "See less" : "See all"}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
  ratingBadge: {
    backgroundColor: "#CEE9FF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  ratingValue: {
    fontSize: 11,
    fontFamily: Typography.family.medium,
    color: "#03518E",
  },
  ratingSlash: {
    fontSize: 12,
    fontFamily: Typography.family.medium,
    color: "#03518E",
  },
  ratingMax: {
    fontSize: 11,
    fontFamily: Typography.family.medium,
    color: "#03518E",
  },
  reviewsLink: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: Colors.textMuted,
    textDecorationLine: "underline",
  },
  separator: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  booksText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: Colors.textMuted,
  },
  tagsWrapper: {
    height: 30,
  },
  tagsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
  },
  tagBadge: {
    height: 24,
    backgroundColor: "#4C7799",
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  tagText: {
    fontSize: 9.5,
    fontFamily: "Poppins-Medium",
    color: Colors.textOnPrimary,
  },
  locationText: {
    fontSize: 10.5,
    fontFamily: Typography.family.regular,
    includeFontPadding: false,
    maxWidth: 220,
    padding: 4,
  },
  descriptionBox: {
    backgroundColor: "#E9F5FF",
    borderRadius: 10,
    padding: 14,
    position: "relative",
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
    lineHeight: 22,
  },
  seeAllLink: {
    fontSize: 12,
    fontFamily: Typography.family.medium,
    color: Colors.primary,
    textDecorationLine: "underline",
  },
});
