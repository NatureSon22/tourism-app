import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Skeleton } from "../../ui/Skeleton";

export default function TransportationCardSkeleton() {
  return (
    <View style={styles.card}>
      {/* 1. Image Placeholder */}
      <Skeleton.Rect
        width="100%"
        height={120}
        style={styles.imagePlaceholder}
      />

      <View style={styles.content}>
        <VStack gap={6}>
          {/* 2. Location Placeholder (Small) */}
          <Skeleton.Rect width="40%" height={10} borderRadius={2} />

          {/* 3. Name Placeholder (Bolder/Medium) */}
          <Skeleton.Rect width="85%" height={14} borderRadius={4} />

          {/* 4. Rating Row Placeholder */}
          <HStack gap={4} alignItems="center">
            <Skeleton.Circle width={10} height={10} />
            <Skeleton.Rect width="15%" height={10} borderRadius={2} />
            <Skeleton.Rect width="10%" height={10} borderRadius={2} />
          </HStack>

          {/* 5. Price Placeholder */}
          <Skeleton.Rect
            width="30%"
            height={14}
            borderRadius={4}
            style={{ marginTop: 5 }}
          />
        </VStack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 15,
    overflow: "hidden",
  },
  imagePlaceholder: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    padding: 10,
  },
});
