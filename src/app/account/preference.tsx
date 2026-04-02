import HeaderWithBack from "@/src/components/app/HeaderWithBack";
import PreferenceForm from "@/src/forms/PreferenceForm";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import React from "react";

export default function Preference() {
  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen>
        <HeaderWithBack title="User Preference" />

        <PreferenceForm />
      </Screen>
    </SafeArea>
  );
}
