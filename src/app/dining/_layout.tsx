import { Stack } from "expo-router";

export default function DiningLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="[id]"
          options={{
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </>
  );
}
