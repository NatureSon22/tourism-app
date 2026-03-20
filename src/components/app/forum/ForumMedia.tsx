import { Attachment } from "@/src/constants/forum";
import React from "react";
import { View } from "react-native";
import ForumImageGallery from "./ForumImageGallery";
import ForumVideos from "./ForumVideos";

type ForumMediaProps = {
  media: Attachment[];
};

export default function ForumMedia({ media }: ForumMediaProps) {
  if (!media || media.length === 0) return null;

  const videos = media.filter((item) => item.type === "video");
  const images = media.filter((item) => item.type === "image");

  return (
    <View style={{ marginTop: 10, gap: 8 }}>
      {videos.length > 0 && <ForumVideos videos={videos} />}
      {images.length > 0 && <ForumImageGallery images={images} />}
    </View>
  );
}
