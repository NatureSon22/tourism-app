import { Colors } from "@/src/constants/styles";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
