import ActivityConditions from "@/src/components/app/activity/ActivityConditions";
import ActivityGeneralInformation from "@/src/components/app/activity/ActivityGeneralInformation";
import HeaderWithBack from "@/src/components/app/HeaderWithBack";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import React from "react";
import { StyleSheet } from "react-native";

export default function About() {
  return (
    <SafeArea edges={["top"]}>
      <Screen style={styles.screen}>
        <HeaderWithBack title="Package Details" />

        <ActivityGeneralInformation />

        <ActivityConditions />
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: 20,
  },
});
