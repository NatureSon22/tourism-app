import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import { Feather, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
  const router = useRouter();

  const handlePressAction = () => {
    router.push("/forum/location");
  };

  return (
    <HStack justifyContent="space-between" style={styles.footerContainer}>
      <HStack style={styles.footerActions}>
        <Pressable onPress={() => handlePressAction()}>
          <FontAwesome5 name="running" size={20} color={Colors.primary} />
        </Pressable>

        <Pressable onPress={() => handlePressAction()}>
          <FontAwesome6 name="location-dot" size={20} color={Colors.primary} />
        </Pressable>

        <Pressable onPress={onCapture}>
          <Feather name="camera" size={20} color={Colors.primary} />
        </Pressable>
        <Pressable onPress={onPickImages}>
          <FontAwesome6 name="images" size={20} color={Colors.primary} />
        </Pressable>
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
  footerContainer: {
    borderTopWidth: 1,
    paddingVertical: 3,
    borderColor: Colors.border,
  },
  footerActions: {
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
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
  postButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 14,
  },
  postButtonPressed: {
    opacity: 0.8,
  },
  postButtonDisabled: {
    backgroundColor: Colors.border,
  },
  postButtonText: {
    fontFamily: Typography.family.semiBold,
    fontSize: 11,
    color: Colors.textOnPrimary,
  },
  postButtonTextDisabled: {
    color: Colors.textMuted,
  },
});
