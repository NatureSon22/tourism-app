import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { User } from "@/src/stores/authStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../../ui/CustomButton";

type ForumHeaderProps = {
  author: Partial<User>;
  category: string;
  place: string;
  joined?: boolean;
  isJoining?: boolean;
  onJoinPress: () => void;
};

export const ForumHeader = ({
  author,
  category,
  place,
  joined,
  isJoining,
  onJoinPress,
}: ForumHeaderProps) => (
  <View style={headerStyles.container}>
    <HStack gap={10}>
      <Image
        source={{ uri: author?.profilePictureUrl }}
        style={headerStyles.avatar}
      />
      <VStack gap={2}>
        <HStack gap={2}>
          <Text style={headerStyles.authorName}>{author?.userName}</Text>
          <MaterialIcons name="keyboard-arrow-right" size={13} color="black" />
          <Text numberOfLines={1} style={headerStyles.categoryText}>
            {category}
          </Text>
        </HStack>
        <Text style={headerStyles.placeText}>{place}</Text>
      </VStack>
    </HStack>

    <CustomButton
      style={[headerStyles.joinButton, joined && headerStyles.joinedButton]}
      textStyle={[headerStyles.joinText, joined && headerStyles.joinedText]}
      title={joined ? "Joined" : "Join"}
      onPress={onJoinPress}
      isLoading={isJoining}
      removeLabel={isJoining}
      disabled={isJoining}
    />
  </View>
);

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: { width: 35, height: 35, borderRadius: 24 },
  authorName: {
    fontSize: 11,
    color: Colors.text,
    fontFamily: Typography.family.regular,
  },
  categoryText: {
    fontSize: 11,
    color: Colors.text,
    fontFamily: Typography.family.bold,
  },
  placeText: { fontSize: 9.5, color: Colors.text, opacity: 0.7 },
  joinButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  joinedButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  joinText: {
    fontSize: 10,
    color: Colors.surface,
  },
  joinedText: {
    color: "white",
  },
});
