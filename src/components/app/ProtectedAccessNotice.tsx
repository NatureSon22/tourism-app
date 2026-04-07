import CustomButton from "@/src/components/ui/CustomButton";
import { Colors, Typography } from "@/src/constants/styles";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProtectedAccessNoticeProps {
  headline: string;
  description: string;
  actionLabel: string;
}

export default function ProtectedAccessNotice({
  headline,
  description,
  actionLabel,
}: ProtectedAccessNoticeProps) {
  const router = useRouter();

  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.headline}>{headline}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          <CustomButton
            title={actionLabel}
            onPress={() => router.push("/(auth)")}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  container: {
    width: "100%",
    maxWidth: 380,
    alignItems: "flex-start",
    gap: 28,
  },
  content: {
    gap: 10,
    width: "100%",
  },
  headline: {
    fontSize: 20,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
    letterSpacing: -0.4,
    lineHeight: 28,
  },
  description: {
    fontSize: 13,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
    lineHeight: 22,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 13,
    letterSpacing: 0.2,
  },
});
