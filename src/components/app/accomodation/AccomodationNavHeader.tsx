import { Typography } from "@/src/constants/styles";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type AccomodationNavHeaderProps = {
  showHeader: boolean;
};

export default function AccomodationNavHeader({
  showHeader,
}: AccomodationNavHeaderProps) {
  return (
    <View
      style={[styles.stickyHeader, { display: showHeader ? "flex" : "none" }]}
    >
      <Pressable style={styles.pressable} onPress={() => {}}>
        <Text style={styles.headerText}> From community forums</Text>
      </Pressable>

      <Pressable style={styles.pressable} onPress={() => {}}>
        <Text style={styles.headerText}>Reviews</Text>
      </Pressable>

      <Pressable style={styles.pressable} onPress={() => {}}>
        <Text style={styles.headerText}>What to expect</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  stickyHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    gap: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    zIndex: 1,
    backgroundColor: "white",
  },
  pressable: {},
  headerText: {
    fontSize: 11,
    fontFamily: Typography.family.medium,
  },
});
