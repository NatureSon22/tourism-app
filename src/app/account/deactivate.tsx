import HeaderWithBack from "@/src/components/app/HeaderWithBack";
import DeactivateForm from "@/src/forms/DeactivateForm";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import React from "react";

export default function deactivate() {
  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen>
        <HeaderWithBack title="Deactivate Account" />

        <DeactivateForm />
      </Screen>
    </SafeArea>
  );
}
