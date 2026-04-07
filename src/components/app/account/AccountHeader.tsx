import { USER_PROFILE_PLACEHOLDER } from "@/src/constants/assetsPath";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import useAuthStore from "@/src/stores/authStore";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AccountHeader() {
  const user = useAuthStore((state) => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <HStack justifyContent="flex-start" alignItems="flex-end" gap={16}>
          <Image
            source={
              user?.profilePictureUrl
                ? {
                    uri: user.profilePictureUrl,
                  }
                : USER_PROFILE_PLACEHOLDER
            }
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />

          <VStack gap={2} style={styles.infoContainer}>
            <Text style={styles.userName}>
              {user?.userName ?? "Default username"}
            </Text>
            <Text style={styles.email}>{user?.email ?? "mina@jyp.com"}</Text>
          </VStack>
        </HStack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
  },
  headerWrapper: {
    width: "85%",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: Colors.surface,
  },
  infoContainer: {
    alignSelf: "center",
  },
  userName: {
    fontSize: 15,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
    includeFontPadding: false,
  },
  email: {
    fontSize: 10,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
    includeFontPadding: false,
  },
});
