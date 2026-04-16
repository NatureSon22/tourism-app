import type { Media } from "@/src/types/forum";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

type ForumImageGalleryProps = { images: Media[] };

export default function ForumImageGallery({ images }: ForumImageGalleryProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // For pagination dots

  const openModal = (index: number) => {
    setStartIndex(index);
    setModalVisible(true);
  };

  return (
    <>
      {/* carousel display */}
      <View style={styles.carouselContainer}>
        <PagerView
          style={styles.mainPager}
          initialPage={0}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        >
          {images.map((image, idx) => (
            <Pressable
              key={image.id}
              style={styles.page}
              onPress={() => openModal(idx)}
            >
              <Image
                source={{ uri: image.url ?? image.src ?? "" }}
                style={styles.carouselImage}
                contentFit="cover"
              />
            </Pressable>
          ))}
        </PagerView>

        {/* pagination */}
        {images.length > 1 && (
          <View style={styles.pagination}>
            {images.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  currentPage === i ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        )}
      </View>

      {/* modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <PagerView initialPage={startIndex} style={styles.pagerView}>
            {images.map((image) => (
              <View key={image.id} style={styles.page}>
                <Image
                  source={{ uri: image.url ?? image.src ?? "" }}
                  style={styles.modalImage}
                  contentFit="contain"
                />
              </View>
            ))}
          </PagerView>

          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Feather name="x" size={28} color="white" />
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
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
    bottom: 10,
    flexDirection: "row",
    alignSelf: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    backgroundColor: "white",
    width: 14,
  },
  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  modalContainer: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.9)" },
  pagerView: { flex: 1 },
  page: { flex: 1 },
  modalImage: { width: "100%", height: "100%" },
  closeButton: { position: "absolute", top: 40, right: 20, zIndex: 10 },
});
