import { ForumPost } from "@/src/constants/forum";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ForumPreviewCard({ forum }: { forum: ForumPost }) {
  return (
    <View style={styles.forumCard}>
      <HStack gap={10} alignItems="flex-start">
        {forum.author?.avatarUrl ? (
          <Image
            source={forum.author.avatarUrl}
            style={styles.forumAvatar}
            contentFit="cover"
          />
        ) : (
          <View style={[styles.forumAvatar, styles.avatarFallback]}>
            <Ionicons name="person" size={18} color="#9CA3AF" />
          </View>
        )}

        <VStack gap={2} style={{ flex: 1 }}>
          <Text style={styles.forumAuthor} numberOfLines={1}>
            {forum.author?.name ?? "Anonymous"} {`>`} {forum.category}
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
  avatarFallback: {
    alignItems: "center",
    justifyContent: "center",
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
