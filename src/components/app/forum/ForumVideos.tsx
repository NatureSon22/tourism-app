import type { Media } from "@/src/types/forum";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import AppVideoPlayer from "./AppVideoPlayer";

type ForumVideoProps = {
  videos: Media[];
};

export default function ForumVideos({ videos }: ForumVideoProps) {
  const [current, setCurrent] = useState(0);

  return (
    <View style={styles.carouselContainer}>
      <PagerView
        style={{ flex: 1 }}
        initialPage={current}
        onPageSelected={(e) => setCurrent(e.nativeEvent.position)}
      >
        {videos.map((video) => (
          <AppVideoPlayer
            key={video.id}
            url={video.url ?? video.src ?? ""}
            isActive={current === videos.indexOf(video)}
          />
        ))}
      </PagerView>

      {videos.length > 1 && (
        <View style={styles.pagination}>
          {videos.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                current === i ? styles.activeDot : styles.inactiveDot,
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
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
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
});
