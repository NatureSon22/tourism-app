import { Skeleton } from "@/src/components/ui/Skeleton";
import { Colors } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function AccommodationCardSkeleton() {
  return (
    <View style={styles.card}>
      <HStack gap={17} alignItems="flex-start">
        {/* Image Placeholder */}
        <Skeleton.Rect width={95} height={120} borderRadius={10} />

        <VStack style={styles.content} gap={5}>
          {/* Name Placeholder */}
          <Skeleton.Rect width="80%" height={30} borderRadius={4} />

          <VStack gap={5} style={styles.metaContainer}>
            {/* Distance Placeholder */}
            <Skeleton.Rect width="40%" height={20} borderRadius={4} />

            {/* Rating/Reviews Placeholder */}
            <Skeleton.Rect width="30%" height={12} borderRadius={4} />
          </VStack>

          {/* Price Placeholder - Aligned to the end like the original */}
          <View style={styles.priceWrapper}>
            <Skeleton.Rect width={80} height={30} borderRadius={4} />
          </View>
        </VStack>
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
  },
  content: {
    flex: 1,
    alignItems: "stretch",
  },
  metaContainer: {
    marginTop: 15,
    width: "100%",
  },
  priceWrapper: {
    alignSelf: "flex-end",
    marginTop: 5,
  },
});
