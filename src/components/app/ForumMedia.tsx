import { Attachment } from "@/src/constants/forum";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// TODO: for videos, show only the thumbnail int the feed and play the video in a modal when tapped
// TODO: apply styling for images and videos
// TODO: apply 

type ForumMediaProps = {
  media: Attachment[];
};

export default function ForumMedia({ media }: ForumMediaProps) {
  if (!media || media.length === 0) return null;

  return (
    <View style={styles.container}>
      {media.map((item) => {
        if (item.type === "video") {
          return (
            <TouchableOpacity key={item.id} style={styles.videoContainer}>
              {/* Show the thumbnail, not the video file itself, in the feed */}
              <Image
                source={{ uri: item.thumbnailUrl || item.url }}
                style={styles.mediaItem}
                contentFit="cover"
              />
              {/* Add a Play Icon Overlay here */}
              <View style={styles.playOverlay} />
            </TouchableOpacity>
          );
        }

        return (
          <View key={item.id} style={styles.imageContainer}>
            <Image
              source={{ uri: item.url }}
              style={styles.mediaItem}
              contentFit="cover"
              transition={200} // Smooth fade-in
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    gap: 8,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#eee",
    aspectRatio: 16 / 9,
  },
  videoContainer: {
    borderRadius: 12,
    overflow: "hidden",
    aspectRatio: 16 / 9,
  },
  mediaItem: {
    width: "100%",
    height: "100%",
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});
