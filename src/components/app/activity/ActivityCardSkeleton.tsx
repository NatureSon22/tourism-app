import { Colors } from "@/src/constants/styles";
import VStack from "@/src/layouts/VStack";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ActivityCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.image} />
      <VStack gap={8} style={{ padding: 12 }}>
        <View style={styles.lineLg} />
        <View style={styles.lineMd} />
        <View style={styles.lineTags} />
        <View style={styles.lineSm} />
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    height: 170,
    width: "100%",
    backgroundColor: Colors.border,
  },
  lineLg: {
    height: 14,
    borderRadius: 6,
    backgroundColor: Colors.border,
    width: "70%",
  },
  lineMd: {
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.border,
    width: "85%",
  },
  lineTags: {
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.border,
    width: "60%",
  },
  lineSm: {
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.border,
    width: "50%",
  },
});
