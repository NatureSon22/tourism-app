import { Colors, Typography } from "@/src/constants/styles";
import { SelectedImage } from "@/src/hooks/useExperienceComposer";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

type ExperienceMediaPreviewProps = {
  selectedImages: SelectedImage[];
  currentPage: number;
  onPageSelected: (event: any) => void;
  removeImage: (id: string) => void;
};

export default function ExperienceMediaPreview({
  selectedImages,
  currentPage,
  onPageSelected,
  removeImage,
}: ExperienceMediaPreviewProps) {
  const pagerRef = useRef<PagerView>(null);

  useEffect(() => {
    if (pagerRef.current && currentPage < selectedImages.length) {
      pagerRef.current.setPage(currentPage);
    }
  }, [currentPage, selectedImages.length]);

  return (
    <View style={styles.mediaSection}>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={onPageSelected}
      >
        {selectedImages.map((image) => (
          <View key={image.id} style={styles.pageContainer}>
            <Image source={{ uri: image.uri }} style={styles.mediaPreview} />
            <Pressable
              style={styles.pageRemoveButton}
              onPress={() => removeImage(image.id)}
            >
              <Feather name="x" size={18} color="white" />
            </Pressable>
          </View>
        ))}
      </PagerView>
      <View style={styles.mediaIndicatorRow}>
        <Text style={styles.mediaIndicatorText}>Attachments</Text>
        <Text style={styles.mediaIndicatorCounter}>
          {selectedImages.length > 0
            ? `${currentPage + 1} / ${selectedImages.length}`
            : "0 / 0"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mediaSection: {
    gap: 10,
  },
  pagerView: {
    height: 260,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: Colors.surface,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  mediaPreview: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  pageRemoveButton: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  mediaIndicatorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  mediaIndicatorText: {
    color: Colors.textMuted,
    fontFamily: Typography.family.regular,
    fontSize: 12,
  },
  mediaIndicatorCounter: {
    color: Colors.text,
    fontFamily: Typography.family.semiBold,
    fontSize: 12,
  },
});
