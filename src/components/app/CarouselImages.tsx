import { Colors } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

type Props = {
  images: string[];
  isBookmarked?: boolean;
  onBookmark?: () => void;
  onShare?: () => void;
};

export default function CarouselImages({
  images = [],
  isBookmarked = false,
  onBookmark,
  onShare,
}: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const router = useRouter();

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      const nextPageIndex = (currentPage + 1) % images.length;

      // If we are moving back to the start, skip animation for a "loop" feel
      if (nextPageIndex === 0) {
        pagerRef.current?.setPageWithoutAnimation(0);
      } else {
        pagerRef.current?.setPage(nextPageIndex);
      }

      setCurrentPage(nextPageIndex);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length, currentPage]);

  return (
    <View style={styles.carouselContainer}>
      <LinearGradient
        colors={[Colors.background, "transparent"]}
        style={styles.topBlendGradient}
      />

      <HStack justifyContent="space-between" style={styles.headerActions}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons
            name="chevron-back-outline"
            size={20}
            color={Colors.textOnPrimary}
          />
        </Pressable>

        <HStack gap={10}>
          <Pressable onPress={onBookmark} style={styles.iconButton}>
            <Feather
              name={isBookmarked ? "heart" : "heart"}
              size={20}
              color={isBookmarked ? Colors.primary : Colors.textOnPrimary}
            />
          </Pressable>
          <Pressable onPress={onShare} style={styles.iconButton}>
            <Ionicons
              name="share-outline"
              size={20}
              color={Colors.textOnPrimary}
            />
          </Pressable>
        </HStack>
      </HStack>

      <PagerView
        ref={pagerRef}
        style={styles.mainPager}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {images.map((image, idx) => (
          <Image
            key={`${image}-${idx}`}
            source={{ uri: image }}
            style={styles.carouselImage}
            contentFit="cover"
            transition={500} // Smooth fade-in for expo-image
          />
        ))}
      </PagerView>

      {images.length > 1 && (
        <View style={styles.pagination}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[
                styles.bar,
                currentPage === i ? styles.activeBar : styles.inactiveBar,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
    aspectRatio: 16 / 10,
    backgroundColor: Colors.background,
  },
  topBlendGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 1,
  },
  headerActions: {
    position: "absolute",
    top: 15, // Adjusted for slightly more breathing room
    zIndex: 2,
    paddingHorizontal: 15,
    width: "100%",
  },
  iconButton: {
    padding: 8,
    backgroundColor: "#484A47E5", // Slightly more opaque for visibility
    borderRadius: 25,
    // Standard shadow logic for both platforms
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  mainPager: {
    flex: 1,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  pagination: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 40,
    width: "100%",
  },
  bar: {
    height: 4,
    borderRadius: 10,
    flex: 1,
    maxWidth: 40, // Prevents bars from becoming too long on wide screens
  },
  activeBar: {
    backgroundColor: "#FFFFFF",
  },
  inactiveBar: {
    backgroundColor: "rgba(255, 255, 255, 0.4)", // White with transparency looks better over images
  },
});
