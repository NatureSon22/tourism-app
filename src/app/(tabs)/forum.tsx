import ForumList from "@/src/components/app/forum/ForumList";
import CustomButton from "@/src/components/ui/CustomButton";
import { Colors, Typography } from "@/src/constants/styles";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Forum() {
  return (
    <SafeArea edges={["top"]}>
      <Screen style={{ paddingBottom: 0, position: "relative" }}>
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

        <ForumList />

        <CustomButton
          title=""
          prefixIcon={<FontAwesome6 name="add" size={18} color="white" />}
          style={styles.buttonStyle}
          onPress={() => {}}
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
  buttonStyle: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
