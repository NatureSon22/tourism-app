import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Skeleton } from "../../ui/Skeleton";

export default function ForumSkeletonCard() {
  return (
    <View style={styles.card}>
      <HStack alignItems="center" style={styles.header}>
        <Skeleton.Circle width={34} height={34} />
        <VStack gap={6} style={styles.headerText}>
          <Skeleton.Rect width="40%" height={10} borderRadius={4} />
          <Skeleton.Rect width="30%" height={10} borderRadius={4} />
        </VStack>
        <Skeleton.Rect width={70} height={28} borderRadius={14} />
      </HStack>

      <View style={styles.body}>
        <Skeleton.Rect width="100%" height={12} borderRadius={4} />
        <Skeleton.Rect
          width="100%"
          height={12}
          borderRadius={4}
          style={styles.bodyLine}
        />
        <Skeleton.Rect
          width="70%"
          height={12}
          borderRadius={4}
          style={styles.bodyLine}
        />

        <HStack gap={10} style={styles.mediaRow}>
          <Skeleton.Rect width="48%" height={90} borderRadius={12} />
          <Skeleton.Rect width="48%" height={90} borderRadius={12} />
        </HStack>
      </View>

      <HStack
        alignItems="center"
        justifyContent="space-between"
        style={styles.footer}
      >
        <HStack gap={12} alignItems="center">
          <Skeleton.Circle width={14} height={14} />
          <Skeleton.Rect width={40} height={10} borderRadius={4} />
          <Skeleton.Circle width={14} height={14} />
          <Skeleton.Rect width={30} height={10} borderRadius={4} />
        </HStack>
        <HStack gap={10} alignItems="center">
          <Skeleton.Circle width={14} height={14} />
          <Skeleton.Circle width={14} height={14} />
        </HStack>
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  header: {
    justifyContent: "space-between",
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  body: {
    marginTop: 16,
    gap: 10,
  },
  bodyLine: {
    marginTop: 10,
  },
  mediaRow: {
    marginTop: 14,
  },
  footer: {
    marginTop: 18,
  },
});
