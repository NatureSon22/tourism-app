import PreferenceForm from "@/src/forms/PreferenceForm";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import React from "react";

export default function Preference() {
  return (
    <SafeArea edges={["top"]}>
      <Screen>
        <PreferenceForm />
      </Screen>
    </SafeArea>
  );
}
