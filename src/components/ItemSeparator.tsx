import React from "react";
import { StyleSheet, View } from "react-native";

export default function ItemSeparator() {
  return <View style={styles.separator}></View>;
}

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
});
