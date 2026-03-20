import ForumCard from "@/src/components/app/forum/ForumCard";
import forumData from "@/src/constants/forum";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { Stack } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

export default function Forum() {
  return (
    <SafeArea>
      <Screen>
        <Stack.Screen
          options={{
            title: "Forum",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  backgroundColor: "#e0e7ff",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 4,
                }}
              >
                <Text style={{ color: "#2563eb", fontWeight: "600" }}>
                  Action
                </Text>
              </TouchableOpacity>
            ),
          }}
        />

        <FlatList
          data={forumData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ForumCard {...item} />}
        />
      </Screen>
    </SafeArea>
  );
}
