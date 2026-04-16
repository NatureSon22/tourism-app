import { USER_PROFILE_PLACEHOLDER } from "@/src/constants/assetsPath";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import useAuthStore from "@/src/stores/authStore";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import CustomButton from "../../ui/CustomButton";

export default function ShareExperienceHeader() {
  const auth = useAuthStore((state) => state);
  const router = useRouter();

  const handlePress = () => {
    router.push("/forum/experience");
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      {auth.user ? (
        <HStack style={styles.headerWrapper}>
          <HStack>
            <Image
              style={styles.profileImage}
              source={
                auth.user?.profilePictureUrl
                  ? { uri: auth.user.profilePictureUrl }
                  : USER_PROFILE_PLACEHOLDER
              }
            />

            <VStack gap={4}>
              <Text style={styles.titleText}>Share your experience!</Text>
              <Text style={styles.subtitleText}>(Tap to post)</Text>
            </VStack>
          </HStack>

          <Feather name="image" size={20} color={Colors.iconSecondary} />
        </HStack>
      ) : (
        <>
          <HStack style={styles.headerWrapper}>
            <VStack gap={4}>
              <Text style={styles.titleText}>Sign in</Text>
              <Text style={styles.subtitleText}>(Join to Share)</Text>
            </VStack>

            <CustomButton
              onPress={handlePress}
              title="Sign in"
              style={styles.buttonStyle}
              textStyle={styles.buttonText}
            />
          </HStack>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  headerWrapper: {
    justifyContent: "space-between",
    margin: 15,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
  },
  titleText: {
    fontFamily: Typography.family.medium,
    color: Colors.textMuted,
    fontSize: 12,
    includeFontPadding: false,
  },
  subtitleText: {
    fontFamily: Typography.family.light,
    color: Colors.textMuted,
    fontSize: 10,
    includeFontPadding: false,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 999,
  },
  buttonStyle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 10,
  },
});
