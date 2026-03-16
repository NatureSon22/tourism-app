import { Typography } from "@/src/constants/styles";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  images: string[];
}

export default function ImageGrid({ images }: Props) {
  const totalImages = images.length;
  if (totalImages === 0) return null;

  // Max thumbnails to show before adding the "+X" overlay
  const MAX_DISPLAY = 3;
  const displayImages = images.slice(0, MAX_DISPLAY);
  const extraCount = totalImages - MAX_DISPLAY;

  return (
    <View style={styles.thumbRow}>
      {/* If 1 Image: Takes full width */}
      {totalImages === 1 && (
        <View style={styles.thumbWrapper}>
          <Image
            source={images[0]}
            style={styles.thumbImage}
            contentFit="cover"
          />
        </View>
      )}

      {/* If 2 Images: Two equal columns */}
      {totalImages === 2 && (
        <>
          {displayImages.map((uri, i) => (
            <View key={i} style={styles.thumbWrapper}>
              <Image
                source={uri}
                style={styles.thumbImage}
                contentFit="cover"
              />
            </View>
          ))}
        </>
      )}

      {/* If 3+ Images: Large left image, two small right images */}
      {totalImages >= 3 && (
        <>
          <View style={styles.largeThumb}>
            <Image
              source={images[0]}
              style={styles.thumbImage}
              contentFit="cover"
            />
          </View>

          <View style={styles.rightColumn}>
            <View style={styles.smallThumb}>
              <Image
                source={images[1]}
                style={styles.thumbImage}
                contentFit="cover"
              />
            </View>

            <View style={styles.smallThumb}>
              <Image
                source={images[2]}
                style={styles.thumbImage}
                contentFit="cover"
              />
              {extraCount > 0 && (
                <View style={styles.extraOverlay}>
                  <Text style={styles.extraPlus}>+{extraCount}</Text>
                  <Text style={styles.extraPlus}>more</Text>
                </View>
              )}
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  thumbRow: {
    flexDirection: "row",
    height: 180, // Fixed height for the grid
    gap: 5,
  },
  thumbWrapper: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  largeThumb: {
    flex: 1.5, // Takes up more space on the left
    borderRadius: 8,
    overflow: "hidden",
  },
  rightColumn: {
    flex: 1,
    gap: 5,
  },
  smallThumb: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  thumbImage: {
    width: "100%",
    height: "100%",
  },
  extraOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
  },
  extraPlus: {
    color: "white",
    fontSize: 13,
    includeFontPadding: false,
    fontFamily: Typography.family.medium,
  },
});
