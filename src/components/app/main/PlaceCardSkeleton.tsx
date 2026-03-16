import { Skeleton } from "@/src/components/ui/Skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function PlaceCardSkeleton() {
  return (
    <View style={styles.card}>
      {/* 1. Image Container Placeholder */}
      <View style={styles.imagePlaceholder}>
        <Skeleton.Rect height="100%" borderRadius={0} />

        {/* Floating Overlay Placeholder */}
        <View style={styles.overlayPlaceholder}>
          <Skeleton.Rect width={80} height={18} borderRadius={6} />
        </View>
      </View>

      {/* 2. Details Container */}
      <View style={styles.detailsContainer}>
        {/* Location Name */}
        <Skeleton.Rect width="90%" height={12} borderRadius={4} />

        {/* Rating Row */}
        <View style={styles.ratingRow}>
          <Skeleton.Circle width={10} height={10} />
          <Skeleton.Rect width={40} height={10} borderRadius={4} />
        </View>

        {/* Price Text */}
        <Skeleton.Rect width="60%" height={14} borderRadius={4} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  imagePlaceholder: {
    width: "100%",
    aspectRatio: 6 / 4,
    position: "relative",
  },
  overlayPlaceholder: {
    position: "absolute",
    bottom: 3,
    left: 3,
  },
  detailsContainer: {
    padding: 8,
    gap: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
