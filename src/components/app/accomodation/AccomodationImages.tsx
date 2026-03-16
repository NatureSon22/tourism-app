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
};

export default function AccomodationImages({ images }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const router = useRouter();

  // automatic scrolling every 3 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentPage((prevPage) => {
        const isAtEnd = prevPage === images.length - 1;
        const nextPage = isAtEnd ? 0 : prevPage + 1;

        if (isAtEnd) {
          pagerRef.current?.setPageWithoutAnimation(nextPage);
        } else {
          // Normal smooth slide to the next image
          pagerRef.current?.setPage(nextPage);
        }

        return nextPage;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  const handleBackPage = () => {
    router.back();
  };

  

  return (
    <View style={styles.carouselContainer}>
      {/* THE BLENDING FADE: 
         This sits ON TOP of the image and matches your screen background 
      */}
      <LinearGradient
        colors={[Colors.background, "transparent"]} // Fades from BG color to nothing
        style={styles.topBlendGradient}
      />

      <HStack justifyContent="space-between" style={styles.headerActions}>
        <Pressable onPress={handleBackPage} style={styles.iconButton}>
          <Ionicons name="chevron-back-outline" size={20} color={Colors.text} />
        </Pressable>

        <HStack gap={10}>
          <Pressable style={styles.iconButton}>
            <Feather name="heart" size={20} color={Colors.text} />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Ionicons name="share-outline" size={20} color={Colors.text} />
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
            key={idx}
            source={{ uri: image }}
            style={styles.carouselImage}
            contentFit="cover"
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
    zIndex: 0,
  },
  topBlendGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60, // How deep the fade goes
    zIndex: 1,
  },
  headerActions: {
    position: "absolute",
    top: 10,
    zIndex: 2,
    paddingHorizontal: 15,
    width: "100%",
  },
  iconButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    bottom: 15,
    flexDirection: "row",
    alignSelf: "center",
    gap: 6,
    paddingHorizontal: 20,
    width: "100%",
  },
  bar: {
    height: 4,
    borderRadius: 10,
    flex: 1,
  },
  activeBar: {
    backgroundColor: Colors.textOnPrimary,
  },
  inactiveBar: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});
