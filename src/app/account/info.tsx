import HeaderWithBack from "@/src/components/app/HeaderWithBack";
import AccountInformation from "@/src/forms/AccountInformation";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import React from "react";

export default function info() {
  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen>
        <HeaderWithBack title="Account Information" />

        <AccountInformation />
      </Screen>
    </SafeArea>
  );
}
