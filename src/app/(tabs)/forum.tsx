import ForumCard from "@/src/components/app/forum/ForumCard";
import forumData from "@/src/constants/forum";
import { Colors, Typography } from "@/src/constants/styles";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { Stack } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Forum() {
  return (
    <SafeArea edges={["top"]}>
      <Screen style={{ paddingBottom: 0 }}>
        <Stack.Screen
          options={{
            title: "Forum",
            headerRight: () => (
              <TouchableOpacity onPress={() => {}} style={styles.headerButton}>
                <Text style={styles.headerButtonText}>Action</Text>
              </TouchableOpacity>
            ),
          }}
        />

        <FlatList
          data={forumData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ForumCard {...item} />}
          contentContainerStyle={styles.listContent}
        />
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  headerButtonText: {
    color: Colors.primary,
    fontFamily: Typography.family.medium,
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 20,
  },
});
