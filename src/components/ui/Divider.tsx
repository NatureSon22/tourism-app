import React from "react";
import { StyleSheet, View } from "react-native";

export default function Divider() {
  return <View style={styles.divider}></View>;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
});
