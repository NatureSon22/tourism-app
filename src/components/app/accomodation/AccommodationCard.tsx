import type { Accommodation } from "@/src/constants/accomodations";
import { Colors, Typography } from "@/src/constants/styles";
import { useSafeNavigation } from "@/src/hooks/useSafeNavigation";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import formatCurrency from "@/src/utils/currency";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image } from "expo-image";
import React, { memo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = Accommodation;

function AccommodationCard({
  imageUrl,
  name,
  location,
  pricePerNight,
  rating,
  reviews,
  distanceFromCityCenter,
}: Props) {
  const router = useSafeNavigation();

  const handlePress = () => {
    router.push({ pathname: `/accommodation/[id]`, params: { id: name } });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <HStack gap={17} alignItems="flex-start">
        <Image source={imageUrl} contentFit="cover" style={styles.image} />

        <VStack style={styles.content} gap={5}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>

          <Text style={styles.location} numberOfLines={1}>
            {location}
          </Text>

          <VStack gap={0} style={{ alignItems: "flex-start" }}>
            <HStack gap={5}>
              <Text style={styles.distanceText}>
                {">"} {distanceFromCityCenter} km away
              </Text>
            </HStack>

            <HStack alignItems="center" gap={5}>
              <FontAwesome6 name="star" size={10} color="#E28F0B" solid />
              <Text style={styles.ratingText}>{rating}</Text>
              <Text style={styles.reviewText}>({reviews})</Text>
            </HStack>
          </VStack>

          <Text style={styles.price}>{formatCurrency(pricePerNight)}</Text>
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
  image: {
    width: 95,
    height: "100%",
    borderRadius: 10,
    backgroundColor: Colors.background,
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
    alignSelf: "flex-end",
  },
});

export default memo(AccommodationCard);
