import { Skeleton } from "@/src/components/ui/Skeleton";
import { Colors } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function EventCardSkeleton() {
  return (
    <View style={styles.card}>
      <HStack gap={12} alignItems="center">
        {/* Image Placeholder - Matches 110 width and full height */}
        <Skeleton.Rect width={110} height={100} borderRadius={8} />

        <VStack style={styles.content} gap={5}>
          {/* Title Placeholder */}
          <Skeleton.Rect width="80%" height={14} borderRadius={4} />

          {/* Location Placeholder */}
          <Skeleton.Rect width="50%" height={12} borderRadius={4} />

          {/* Date Placeholder */}
          <Skeleton.Rect width="40%" height={10} borderRadius={4} />

          {/* Tags Placeholder Row */}
          <HStack justifyContent="flex-start" gap={6} style={styles.tagWrapper}>
            <Skeleton.Rect width={60} height={20} borderRadius={20} />
            <Skeleton.Rect width={60} height={20} borderRadius={20} />
            <Skeleton.Rect width={25} height={20} borderRadius={20} />
          </HStack>
        </VStack>
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    width: "100%",
  },
  content: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
  },
  tagWrapper: {
    marginTop: 4,
  },
});
