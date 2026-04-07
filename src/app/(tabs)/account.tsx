import AccountHeader from "@/src/components/app/account/AccountHeader";
import AccountOptions from "@/src/components/app/account/AccountOptions";
import ProtectedAccessNotice from "@/src/components/app/ProtectedAccessNotice";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import useAuthStore from "@/src/stores/authStore";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Account() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <SafeArea edges={["top"]}>
        <ProtectedAccessNotice
          headline="Account access requires sign-in"
          description="Sign in to manage your profile and preferences."
          actionLabel="Go to Sign In"
        />
      </SafeArea>
    );
  }

  return (
    <SafeArea edges={["top"]}>
      <Tabs.Screen
        options={{
          sceneStyle: {
            backgroundColor: "#E5F4FF",
          },
        }}
      />

      <Screen style={styles.screenOverride}>
        <View style={styles.wrapper}>
          <LinearGradient
            colors={["#E5F4FF", "rgba(229, 244, 255, 0.8)", "transparent"]}
            start={[0, 0]}
            end={[0, 1]}
            style={styles.topGradient}
          >
            <AccountHeader />
          </LinearGradient>

          <AccountOptions />
        </View>
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screenOverride: {
    padding: 0,
  },
  wrapper: {
    gap: 15,
  },
  topGradient: {
    overflow: "hidden",
  },
});
