import { Skeleton } from "@/src/components/ui/Skeleton";
import { Colors } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function DiningCardSkeleton() {
  return (
    <View style={styles.card}>
      {/* Row 1: Name and Distance Badge */}
      <HStack justifyContent="flex-start" style={styles.row}>
        <Skeleton.Rect width="60%" height={18} borderRadius={4} />
        <Skeleton.Rect width={60} height={16} borderRadius={20} />
      </HStack>

      {/* Row 2: Category Badges */}
      <HStack justifyContent="flex-start" gap={6} style={styles.row}>
        <Skeleton.Rect width={50} height={18} borderRadius={20} />
        <Skeleton.Rect width={70} height={18} borderRadius={20} />
        <Skeleton.Rect width={40} height={18} borderRadius={20} />
      </HStack>

      {/* Row 3: Meta (Stars, Reviews, Bookings) */}
      <HStack justifyContent="flex-start" gap={8} style={styles.row}>
        <Skeleton.Rect width="40%" height={14} borderRadius={4} />
      </HStack>

      {/* Row 4: Image Grid (Matching your ImageGrid aspect ratio) */}
      <View style={styles.imageGridPlaceholder}>
        <HStack gap={4} style={{ flex: 1 }}>
          <View style={{ flex: 1.5 }}>
            <Skeleton.Rect height="100%" borderRadius={8} />
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Skeleton.Rect height="48%" borderRadius={8} />
            <Skeleton.Rect height="48%" borderRadius={8} />
          </View>
        </HStack>
      </View>

      {/* Row 5: Footer (Location and Price) */}
      <HStack justifyContent="space-between" style={styles.footer}>
        <Skeleton.Rect width="50%" height={14} borderRadius={4} />
        <Skeleton.Rect width="25%" height={16} borderRadius={4} />
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    gap: 12, // Increased slightly to match visual weight
    marginBottom: 10,
  },
  row: {
    width: "100%",
  },
  imageGridPlaceholder: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  footer: {
    marginTop: 5,
    width: "100%",
  },
});
