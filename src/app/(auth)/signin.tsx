import { LOGO_IMAGE } from "@/src/constants/assetsPath";
import { Colors, Typography } from "@/src/constants/styles";
import SignInForm from "@/src/forms/SignInForm";
import Center from "@/src/layouts/Center";
import KeyBoardAvoid from "@/src/layouts/KeyBoardAvoid";
import Screen from "@/src/layouts/Screen";
import VStack from "@/src/layouts/VStack";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

export default function SignOut() {
  return (
    <KeyBoardAvoid>
      <Screen>
        <View style={{ flex: 1 }}>
          <Center>
            <View
              style={{
                padding: 16,
                width: "100%",
                gap: 50,
              }}
            >
              <View style={{ gap: 5 }}>
                <View
                  style={{
                    width: 190,
                    height: 80,
                    alignSelf: "center",
                  }}
                >
                  <Image
                    source={LOGO_IMAGE}
                    contentFit="contain"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </View>

                <VStack
                  gap={3}
                  style={{
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: Typography.family.mediumItalic,
                      textAlign: "center",
                    }}
                  >
                    Where the real adventure begins
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: Typography.family.regular,
                      color: Colors.textMuted,
                      textAlign: "center",
                    }}
                  >
                    Please login to continue
                  </Text>
                </VStack>
              </View>

              <SignInForm />
            </View>
          </Center>

          <View style={{ marginTop: "auto", alignSelf: "center" }}>
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: Colors.textMuted,
                alignSelf: "flex-end",
                fontFamily: Typography.family.regular,
              }}
            >
              Ver. 1.00.1.01
            </Text>
          </View>
        </View>
      </Screen>
    </KeyBoardAvoid>
  );
}
