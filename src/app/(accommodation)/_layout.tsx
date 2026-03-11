import { Stack } from "expo-router";
import React from "react";

export default function AccomodationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="accommodation" />
    </Stack>
  );
}
