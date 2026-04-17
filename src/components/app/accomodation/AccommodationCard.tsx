import { mockAccommodation } from "@/src/constants/accomodations";
import { Colors, Typography } from "@/src/constants/styles";
import { useSafeNavigation } from "@/src/hooks/useSafeNavigation";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { ACCOMMODATION } from "@/src/types/listingTypes";
import formatCurrency from "@/src/utils/currency";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image } from "expo-image";
import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = ACCOMMODATION;

function AccommodationCard({
  id,
  base_price,
  thumbnail,
  title,
  addresses,
  distanceFromCityCenter,
  rating,
  reviews,
}: Props) {
  const router = useSafeNavigation();

  const handlePress = () => {
    router.push({ pathname: `/accommodation/[id]`, params: { id: id } });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <HStack gap={17} alignItems="flex-start">
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: thumbnail ?? mockAccommodation[0].imageUrl }}
            contentFit="cover"
            style={styles.image}
          />

          <View style={styles.bookmarkBtn}>
            <Ionicons name="bookmark-outline" size={18} color={Colors.rating} />
          </View>
        </View>

        <VStack style={styles.content} gap={5}>
          <Text style={styles.name} numberOfLines={1}>
            {title ?? mockAccommodation[0].title}
          </Text>

          <Text style={styles.location} numberOfLines={1}>
            {"Location not available"}
          </Text>

          <VStack gap={0} style={styles.flexStart}>
            <HStack gap={5}>
              <Text style={styles.distanceText}>
                {">"}
                {distanceFromCityCenter ??
                  mockAccommodation[0].distanceFromCityCenter}
                km away
              </Text>
            </HStack>

            <HStack alignItems="center" gap={5}>
              <FontAwesome6 name="star" size={10} color="#E28F0B" solid />
              <Text style={styles.ratingText}>
                {rating ?? mockAccommodation[0].rating}
              </Text>
              <Text style={styles.reviewText}>
                ({reviews ?? mockAccommodation[0].reviews})
              </Text>
            </HStack>
          </VStack>

          <Text style={styles.price}>
            {formatCurrency(
              base_price ?? mockAccommodation[0].pricePerNight ?? 0,
            )}
            {/* basePrice */}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    alignItems: "flex-start",
  },
  imageWrapper: {
    width: 95,
    height: 120,
    // borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.background,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bookmarkBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 50,
    padding: 6,
    zIndex: 1,
    // borderWidth: 1,
    // borderColor: "rgba(0,0,0,0.12)",
  },
  content: {
    flex: 1,
  },
  flexStart: {
    alignItems: "flex-start",
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
    includeFontPadding: false,
  },
  reviewText: {
    fontSize: 10,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
    includeFontPadding: false,
  },
  price: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: Typography.family.semiBold,
    color: "#334155",
    alignSelf: "flex-end",
  },
});

export default memo(AccommodationCard);
