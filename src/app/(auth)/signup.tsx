import { LOGO_IMAGE } from "@/src/constants/assetsPath";
import { Colors, Typography } from "@/src/constants/styles";
import SignUpForm from "@/src/forms/SignUpForm";
import Center from "@/src/layouts/Center";
import KeyBoardAvoid from "@/src/layouts/KeyBoardAvoid";
import Screen from "@/src/layouts/Screen";
import VStack from "@/src/layouts/VStack";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SignUp() {
  return (
    <KeyBoardAvoid>
      <Screen>
        <Center>
          <View style={styles.formContainer}>
            {/* Logo Section */}
            <View style={styles.header}>
              <View style={styles.logoWrapper}>
                <Image
                  source={LOGO_IMAGE}
                  contentFit="contain"
                  style={styles.logo}
                />
              </View>

              <VStack gap={3} style={styles.textGroup}>
                <Text style={styles.tagline}>
                  Where the real adventure begins
                </Text>
                <Text style={styles.instruction}>
                  Please sign up to continue
                </Text>
              </VStack>
            </View>

            {/* Form Section */}
            <SignUpForm />
          </View>
        </Center>
      </Screen>
    </KeyBoardAvoid>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    width: "100%",
    gap: 30,
    borderColor: "pink",
  },
  header: {
    gap: 5,
  },
  logoWrapper: {
    width: 190,
    height: 80,
    alignSelf: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  textGroup: {
    alignItems: "center",
    alignSelf: "center",
  },
  tagline: {
    fontSize: 13,
    fontFamily: Typography.family.mediumItalic,
    textAlign: "center",
  },
  instruction: {
    fontSize: 11,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
    textAlign: "center",
  },
});
