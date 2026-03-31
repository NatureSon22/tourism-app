import AccountHeader from "@/src/components/app/account/AccountHeader";
import AccountOptions from "@/src/components/app/account/AccountOptions";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function account() {
  return (
    <SafeArea edges={["top"]}>
      <Screen style={styles.screenOverride}>
        <View style={styles.wrapper}>
          <AccountHeader />

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
});
