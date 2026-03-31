import ACCOUNT_OPTIONS from "@/src/constants/accountOptions";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AccountOptions() {
  const router = useRouter();

  const handleOptionPress = (path: Parameters<typeof router.push>[0]) => {
    router.push(path);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Account Settings</Text>

      <View style={styles.optionsList}>
        {ACCOUNT_OPTIONS.map((option, index) => (
          <Pressable
            key={option.title}
            onPress={() =>
              handleOptionPress(
                option.path as Parameters<typeof router.push>[0],
              )
            }
            style={({ pressed }) => [
              styles.optionItem,
              pressed && styles.pressed,
            ]}
          >
            <HStack
              justifyContent="space-between"
              alignItems="center"
              style={{ width: "85%" }}
            >
              <HStack gap={10} alignItems="center">
                <View style={styles.iconContainer}>{option.icon}</View>

                <VStack gap={2}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>
                    {option.description}
                  </Text>
                </VStack>
              </HStack>

              <Ionicons
                name="chevron-forward"
                size={15}
                color={Colors.textMuted}
              />
            </HStack>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 10,
    fontFamily: Typography.family.regular,
    color: Colors.text,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    width: "85%",
  },
  optionsList: {
    backgroundColor: Colors.surface,
    overflow: "hidden",
    width: "100%",
    alignItems: "center",
  },
  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    backgroundColor: "#F3F4F6",
  },
  iconContainer: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  optionTitle: {
    fontSize: 12,
    fontFamily: Typography.family.medium,
    color: Colors.text,
  },
  optionDescription: {
    fontSize: 8,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
  },
});
