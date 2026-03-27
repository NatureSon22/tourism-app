import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface HeaderWithBackProps {
  title: string;
}

export default function HeaderWithBack({ title }: HeaderWithBackProps) {
  const router = useRouter();

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      style={styles.container}
    >
      <Pressable
        onPress={() => router.back()}
        hitSlop={15}
        style={styles.backButton}
      >
        <MaterialIcons name="arrow-back-ios" size={20} color={Colors.text} />
      </Pressable>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.spacer} />
    </HStack>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  backButton: {
    zIndex: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: Typography.family.regular,
    color: Colors.text,
    textAlign: "center",
    flex: 1,
  },
  spacer: {
    width: 20,
  },
});
