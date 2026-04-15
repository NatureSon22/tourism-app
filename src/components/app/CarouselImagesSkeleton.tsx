import React from "react";
import { StyleSheet } from "react-native";
import { Skeleton } from "../ui/Skeleton";

export default function CarouselImagesSkeleton() {
  return <Skeleton.Rect style={styles.carouselContainer} />;
}

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
    height: 200,
  },
});
