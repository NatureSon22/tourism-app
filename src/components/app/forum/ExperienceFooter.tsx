import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ExperienceFooterProps = {
  onCapture: () => void;
  onPickImages: () => void;
  canPost: boolean;
  onPost: () => void;
  mediaCount: number;
};

export default function ExperienceFooter({
  onCapture,
  onPickImages,
  canPost,
  onPost,
  mediaCount,
}: ExperienceFooterProps) {
  return (
    <HStack justifyContent="space-between">
      <HStack style={styles.footerActions}>
        <Pressable onPress={onCapture} style={styles.iconButton}>
          <Feather name="camera" size={22} color={Colors.text} />
        </Pressable>
        <Pressable onPress={onPickImages} style={styles.iconButton}>
          <FontAwesome6 name="images" size={22} color={Colors.text} />
        </Pressable>
        {mediaCount > 0 && (
          <Text style={styles.footerMediaCount}>
            {mediaCount} media selected
          </Text>
        )}
      </HStack>

      <View style={styles.footerActionRow}>
        <Pressable
          onPress={onPost}
          disabled={!canPost}
          style={({ pressed }) => [
            styles.postButton,
            !canPost && styles.postButtonDisabled,
            pressed && styles.postButtonPressed,
          ]}
        >
          <Text
            style={[
              styles.postButtonText,
              !canPost && styles.postButtonTextDisabled,
            ]}
          >
            Post
          </Text>
        </Pressable>
      </View>
    </HStack>
  );
}

const styles = StyleSheet.create({
  footerActions: {
    gap: 16,
    alignItems: "center",
  },
  footerMediaCount: {
    marginLeft: 8,
    color: Colors.textMuted,
    fontFamily: Typography.family.regular,
    fontSize: 12,
  },
  footerActionRow: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  postButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
  postButtonPressed: {
    opacity: 0.8,
  },
  postButtonDisabled: {
    backgroundColor: Colors.border,
  },
  postButtonText: {
    color: Colors.surface,
    fontFamily: Typography.family.semiBold,
    fontSize: 14,
  },
  postButtonTextDisabled: {
    color: Colors.textMuted,
  },
});
