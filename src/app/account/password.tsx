import HeaderWithBack from "@/src/components/app/HeaderWithBack";
import ChangePasswordForm from "@/src/forms/ChangePasswordForm";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import React from "react";
import { Text } from "react-native";

export default function password() {
  return (
    <SafeArea edges={["top"]}>
      <Screen>
        <HeaderWithBack title="" suffix={<Text>Done</Text>} />

        <ChangePasswordForm />
      </Screen>
    </SafeArea>
  );
}
