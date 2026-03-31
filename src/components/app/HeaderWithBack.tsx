import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface HeaderWithBackProps {
  title?: string;
  suffix?: ReactNode;
}

export default function HeaderWithBack({ title, suffix }: HeaderWithBackProps) {
  const router = useRouter();

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      style={styles.container}
    >
      <View style={styles.sideSlot}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={15}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back-ios" size={20} color={Colors.text} />
        </Pressable>
      </View>

      <View style={styles.centerSlot}>
        {title && (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>

      <View style={[styles.sideSlot, styles.alignRight]}>
        {suffix ? suffix : <View style={styles.spacer} />}
      </View>
    </HStack>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
  },
  sideSlot: {
    width: 40,
    justifyContent: "center",
  },
  centerSlot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  alignRight: {
    alignItems: "flex-end",
  },
  backButton: {
    zIndex: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: Typography.family.medium,
    color: Colors.text,
    textAlign: "center",
  },
  spacer: {
    width: 20,
  },
});
