import { Stack } from "expo-router";
import React from "react";

export default function ForumLayout() {
  return (
    <Stack>
      <Stack.Screen name="feed" />
    </Stack>
  );
}
