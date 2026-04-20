import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { useBookmarkService } from "@/src/services/request/useService";
import { SERVICE } from "@/src/types/listingTypes";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ServiceCardProps = SERVICE;

export default function ServiceCard({
  id,
  thumbnail,
  title,
  addresses,
  distanceFromCityCenter,
  is_bookmarked,
}: ServiceCardProps) {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(is_bookmarked ?? false);
  const bookmarkMutation = useBookmarkService(id);

  const handlePress = () => {
    router.push({ pathname: "/service/[id]", params: { id } });
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

  const listingLocation = addresses?.formatted ?? "Location not available";
  const listingProvince =
    addresses?.province ?? addresses?.city ?? "Province not available";

  const distanceText =
    distanceFromCityCenter !== undefined && distanceFromCityCenter !== null
      ? `>${distanceFromCityCenter}km away`
      : "Distance unknown";

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <HStack gap={17} alignItems="flex-start">
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: thumbnail }}
            contentFit="cover"
            style={styles.image}
          />
          <Pressable style={styles.bookmarkIcon} onPress={handleBookmark}>
            <Ionicons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={20}
              color={Colors.rating}
            />
          </Pressable>
        </View>

        <VStack style={styles.content} gap={5}>
          <Text style={styles.name} numberOfLines={2}>
            {title}
          </Text>

          <Text style={styles.location} numberOfLines={1}>
            {listingLocation}
          </Text>

          <Text style={styles.location} numberOfLines={2}>
            {listingProvince}
          </Text>

          <VStack gap={0} style={{ alignItems: "flex-start" }}>
            <Text style={styles.distanceText}>{distanceText}</Text>
          </VStack>
        </VStack>
      </HStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    padding: 10,
    borderRadius: 10,
  },
  imageWrapper: {
    width: 95,
    aspectRatio: 12 / 15,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    backgroundColor: Colors.background,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bookmarkIcon: {
    position: "absolute",
    top: 6,
    right: 6,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1, // Ensures it stays on top of the image
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
    fontSize: 10,
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
