import { Skeleton } from "@/src/components/ui/Skeleton";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ServiceCardSkeleton() {
  return (
    <View style={styles.card}>
      <HStack gap={17} alignItems="center">
        <Skeleton.Rect
          width={95}
          style={styles.imagePlaceholder}
          borderRadius={10}
        />

        <VStack style={styles.content} gap={8}>
          <Skeleton.Rect width="90%" height={18} borderRadius={4} />

          <VStack
            gap={8}
            style={{
              width: "100%",
            }}
          >
            <Skeleton.Rect width="60%" height={12} borderRadius={2} />
            <Skeleton.Rect width="45%" height={12} borderRadius={2} />
          </VStack>

          <Skeleton.Rect width="40%" height={10} borderRadius={2} />
        </VStack>
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  imagePlaceholder: {
    aspectRatio: 12 / 15,
  },
  content: {
    flex: 1,
    gap: 5,
  },
});
