import type { ForumPost } from "@/src/constants/forum";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ForumContent } from "./ForumContent";
import { ForumFooter } from "./ForumFooter";
import { ForumHeader } from "./ForumHeader";

export default function ForumCard({
  author,
  category,
  place,
  content,
  media,
  viewers,
}: Pick<
  ForumPost,
  "author" | "category" | "place" | "content" | "media" | "viewers"
>) {
  return (
    <View style={cardStyles.wrapper}>
      <ForumHeader author={author} category={category} place={place} />

      <ForumContent content={content} media={media} />

      <ForumFooter viewers={viewers} />
    </View>
  );
}

const cardStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderColor: "#c4c3c380",
    paddingVertical: 20,
    paddingHorizontal: 15,
    gap: 20,
  },
});
