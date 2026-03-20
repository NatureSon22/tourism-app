import { Colors } from "@/src/constants/styles";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function MainLayout() {
  return (
    <>
      <StatusBar backgroundColor={Colors.surface} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
