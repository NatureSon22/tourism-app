import { ForumPost } from "@/src/constants/forum";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ForumCard({ forum }: { forum: ForumPost }) {
  return (
    <View style={styles.forumCard}>
      <HStack gap={10} alignItems="flex-start">
        <Image
          source={forum.author?.avatarUrl}
          style={styles.forumAvatar}
          contentFit="cover"
        />
        <VStack gap={2} style={{ flex: 1 }}>
          <Text style={styles.forumAuthor} numberOfLines={1}>
            {forum.author?.name} {`>`} {forum.category}
          </Text>
          <Text style={styles.forumPlace} numberOfLines={1}>
            {forum.place}
          </Text>
        </VStack>
      </HStack>

      <Text style={styles.forumContent} numberOfLines={3}>
        {forum.content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  forumCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    gap: 10,
    width: 250,
  },
  forumAvatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#D1D5DB",
  },
  forumAuthor: {
    fontSize: 11,
    fontFamily: Typography.family.medium,
    color: Colors.text,
  },
  forumPlace: {
    fontSize: 9,
    fontFamily: Typography.family.light,
    color: Colors.text,
  },
  forumContent: {
    fontSize: 11,
    fontFamily: Typography.family.regular,
    lineHeight: 20,
  },
});
