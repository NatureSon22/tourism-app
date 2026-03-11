import { Stack } from "expo-router";
import React from "react";

export default function BookmarkLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="bookmark" />
    </Stack>
  );
}
