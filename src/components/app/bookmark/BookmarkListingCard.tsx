import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { useDeleteBookmark } from "@/src/services/request/useBookmark";
import { Bookmark } from "@/src/types/bookmark";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const placeholderImage = require("../../../assets/images/placeholder.jpg");

type Props = Bookmark;

function BookmarkListingCard({
  id,
  bookmarkable_id,
  bookmarkable_type,
  module_id,
  title,
}: Props) {
  const deleteBookmarkMutation = useDeleteBookmark();

  return (
    <View style={styles.card}>
      <HStack alignItems="center" gap={18}>
        <View style={styles.imageWrapper}>
          <Image
            source={placeholderImage}
            contentFit="cover"
            style={styles.image}
          />
          <Pressable
            style={styles.bookmarkBtn}
            onPress={() => deleteBookmarkMutation.mutate(id)}
            disabled={deleteBookmarkMutation.isPending}
          >
            <Ionicons name="bookmark" size={18} color={Colors.rating} />
          </Pressable>
        </View>

        <VStack gap={6} style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {title}
          </Text>
        </VStack>
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
  },
  imageWrapper: {
    width: 95,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    backgroundColor: Colors.background,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
    flex: 1,
  },
  location: {
    fontSize: 12,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
  },
  reviewText: {
    fontSize: 11,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
  },
  price: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
    alignSelf: "flex-start",
  },
  bookmarkBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default memo(BookmarkListingCard);
