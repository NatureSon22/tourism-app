import HeaderWithBack from "@/src/components/app/HeaderWithBack";
import { USER_PROFILE_PLACEHOLDER } from "@/src/constants/assetsPath";
import { Colors, Typography } from "@/src/constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ExperienceHeaderProps = {
  userName?: string;
  profilePictureUrl?: string;
};

export default function ExperienceHeader({
  userName,
  profilePictureUrl,
}: ExperienceHeaderProps) {
  const router = useRouter();

  const handleSelectCommunity = () => {
    router.push("/forum/community");
  };

  return (
    <View style={styles.header}>
      <HeaderWithBack />

      <View style={styles.profileRow}>
        <Image
          style={styles.profileImage}
          source={
            profilePictureUrl
              ? { uri: profilePictureUrl }
              : USER_PROFILE_PLACEHOLDER
          }
        />
        <Text style={styles.profileText}>{userName ?? "Guest"}</Text>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={16}
          color={Colors.text}
        />

        <Pressable style={styles.button} onPress={handleSelectCommunity}>
          <Text numberOfLines={1} style={styles.buttonText}>
            Select Community
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 16,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 999,
  },
  profileText: {
    fontSize: 12,
    color: Colors.text,
    fontFamily: Typography.family.regular,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#EEEEEE",
    borderRadius: 14,
  },
  buttonText: {
    fontSize: 10,
    color: Colors.text,
    fontFamily: Typography.family.medium,
  },
});
