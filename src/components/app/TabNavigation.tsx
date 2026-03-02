import TABNAVIGATION from "@/src/constants/tabNavigation";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function TabNavigation() {
  const router = useRouter();

  return (
    <View style={{ width: "100%", alignSelf: "flex-start" }}>
      <FlatList
        style={{ borderWidth: 1, width: "100%", borderColor: "#e5e7eb" }}
        data={TABNAVIGATION}
        horizontal
        keyExtractor={(item) => item.name}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-around",
          paddingVertical: 10,
        }}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(item.path as any)}>
            <View
              style={{ alignItems: "center", justifyContent: "center", gap: 4 }}
            >
              {item.icon}
              <Text style={{ fontSize: 10 }}>{item.name}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
