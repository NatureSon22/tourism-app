import DiningConditions from "@/src/components/app/dining/DiningConditions";
import DiningGeneralInformation from "@/src/components/app/dining/DiningGeneralInformation";
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

        <DiningGeneralInformation />

        <DiningConditions />
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: 20,
  },
});
