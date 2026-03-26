import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { Service } from "@/src/types/service";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ServiceCardProps = Service;

export default function ServiceCard({
  id,
  imageUrl,
  location,
  distanceFromCityCenter,
  name,
  province,
}: ServiceCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({ pathname: "/service/[id]", params: { id } });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <HStack gap={17} alignItems="flex-start">
        <View style={styles.imageWrapper}>
          <Image source={imageUrl} contentFit="cover" style={styles.image} />
          <View style={styles.bookmarkIcon}>
            <Ionicons name="bookmark-outline" size={20} color={Colors.rating} />
          </View>
        </View>

        <VStack style={styles.content} gap={5}>
          <Text style={styles.name} numberOfLines={2}>
            {name}
          </Text>

          <Text style={styles.location} numberOfLines={1}>
            {location}
          </Text>

          <Text style={styles.location} numberOfLines={2}>
            {province}
          </Text>

          <VStack gap={0} style={{ alignItems: "flex-start" }}>
            <Text
              style={styles.distanceText}
            >{`>${distanceFromCityCenter}km away`}</Text>
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
