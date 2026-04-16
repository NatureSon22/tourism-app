import { Colors, Typography } from "@/src/constants/styles";
import VStack from "@/src/layouts/VStack";
import type { Media } from "@/src/types/forum";
import cutString from "@/src/utils/cutString";
import React from "react";
import { StyleSheet, Text } from "react-native";
import ForumMedia from "./ForumMedia";

type ForumContentProps = {
  content?: string;
  media?: Media[];
};

export const ForumContent = ({ content, media }: ForumContentProps) => (
  <VStack gap={12}>
    {content && (
      <Text style={contentStyles.text}>{cutString(content, 100)}</Text>
    )}
    {media && media.length > 0 && <ForumMedia media={media} />}
  </VStack>
);

const contentStyles = StyleSheet.create({
  text: {
    color: Colors.text,
    fontSize: 12,
    lineHeight: 20,
    fontFamily: Typography.family.regular,
  },
});
