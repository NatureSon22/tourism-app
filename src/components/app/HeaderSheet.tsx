import { Typography } from "@/src/constants/styles";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type HeaderProps = {
  title: string;
  handleCloseSheet: () => void;
};

export default function HeaderSheet({ title, handleCloseSheet }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={handleCloseSheet} style={styles.closeButton}>
        <Feather name="x" size={24} color="black" />
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  closeButton: {
    padding: 5,
  },
  title: {
    fontFamily: Typography.family.medium,
    fontSize: 15,
    color: "black",
    textAlign: "center",
  },
  placeholder: {
    width: 34,
  },
});
