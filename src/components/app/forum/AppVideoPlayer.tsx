import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Image } from "expo-image";
import { useVideoPlayer, VideoThumbnail, VideoView } from "expo-video";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type AppVideoPlayerProps = {
  url: string;
  isActive: boolean;
};

export default function AppVideoPlayer({ url, isActive }: AppVideoPlayerProps) {
  const player = useVideoPlayer(url, (p) => {
    p.loop = false;
  });

  const [thumbnail, setThumbnail] = useState<VideoThumbnail | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePress = () => {
    setIsPlaying(true);
    player.play();
  };

  // Generates the thumbnail when the player is ready
  useEffect(() => {
    async function getCover() {
      try {
        const [result] = await player.generateThumbnailsAsync([2000]); // Generate thumbnail at 2 seconds
        setThumbnail(result);
      } catch (e) {
        console.error("Thumbnail failed", e);
      }
    }
    if (player) getCover();
  }, [player]);

  useEffect(() => {
    if (player && !isActive) {
      player.pause();
    }
  }, [isActive, player]);

  return (
    <View style={styles.wrapper}>
      {isPlaying ? (
        <VideoView
          player={player}
          style={styles.fill}
          contentFit="cover"
          allowsPictureInPicture
        />
      ) : (
        <Pressable onPress={handlePress} style={styles.fill}>
          <Image source={thumbnail} style={styles.fill} contentFit="cover" />
          <View style={styles.overlay}>
            <FontAwesome5 name="play" size={24} color="white" />
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  fill: { width: "100%", height: "100%" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
