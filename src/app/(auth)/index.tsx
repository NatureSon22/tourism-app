import { LOGO_IMAGE } from "@/src/constants/assetsPath";
import { Colors, Typography } from "@/src/constants/styles";
import SignInForm from "@/src/forms/SignInForm";
import Center from "@/src/layouts/Center";
import KeyBoardAvoid from "@/src/layouts/KeyBoardAvoid";
import Screen from "@/src/layouts/Screen";
import VStack from "@/src/layouts/VStack";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SignIn() {
  return (
    <KeyBoardAvoid>
      <Screen>
        <View style={styles.container}>
          <Center>
            <View style={styles.formWrapper}>
              <View style={styles.headerGap}>
                <View style={styles.logoContainer}>
                  <Image
                    source={LOGO_IMAGE}
                    contentFit="contain"
                    style={styles.logo}
                  />
                </View>

                <VStack gap={3} style={styles.textStack}>
                  <Text style={styles.tagline}>
                    Where the real adventure begins
                  </Text>
                  <Text style={styles.instruction}>
                    Please login to continue
                  </Text>
                </VStack>
              </View>

              <SignInForm />
            </View>
          </Center>

          <View style={styles.footer}>
            {/* <Text style={styles.versionText}>Ver. 1.00.1.01</Text> */}
          </View>
        </View>
      </Screen>
    </KeyBoardAvoid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formWrapper: {
    padding: 16,
    width: "100%",
    gap: 50,
  },
  headerGap: {
    gap: 5,
  },
  logoContainer: {
    width: 190,
    height: 80,
    alignSelf: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  textStack: {
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
  footer: {
    marginTop: "auto",
    alignSelf: "center",
    paddingBottom: 10, 
  },
  versionText: {
    fontSize: 12,
    textAlign: "center",
    color: Colors.textMuted,
    fontFamily: Typography.family.regular,
  },
});