import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Skeleton } from "../../ui/Skeleton";

function ActivityCardSkeleton() {
  return (
    <View style={styles.card}>
      {/* Hero image */}
      <Skeleton.Rect width="100%" height={175} borderRadius={0} />

      {/* Content */}
      <View style={styles.content}>
        {/* Title */}
        <Skeleton.Rect width="60%" height={16} borderRadius={4} />

        {/* Location */}
        <Skeleton.Rect width="90%" height={12} borderRadius={4} />

        {/* Rating row */}
        <Skeleton.Rect width="50%" height={12} borderRadius={4} />

        {/* Price */}
        <Skeleton.Rect width="35%" height={15} borderRadius={4} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
});

export default memo(ActivityCardSkeleton);
