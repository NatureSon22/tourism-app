import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ToastConfig } from "react-native-toast-message";

const toastConfig: ToastConfig = {
  error: ({ text1 }) => (
    <View style={[styles.container, styles.error]}>
      <Feather name="alert-circle" size={15} color="#fff" />
      <Text style={styles.text} numberOfLines={1}>
        {text1}
      </Text>
    </View>
  ),

  success: ({ text1 }) => (
    <View style={[styles.container, styles.success]}>
      <Feather name="check-circle" size={15} color="#fff" />
      <Text style={styles.text} numberOfLines={1}>
        {text1}
      </Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 100,
    maxWidth: "80%",
    alignSelf: "center",
  },
  error: {
    backgroundColor: "#EF4444",
    shadowColor: "#EF4444",
  },
  success: {
    backgroundColor: "#22C55E",
    shadowColor: "#22C55E",
  },
  text: {
    fontSize: 13,
    fontWeight: "500",
    color: "#fff",
  },
});

export default toastConfig;
