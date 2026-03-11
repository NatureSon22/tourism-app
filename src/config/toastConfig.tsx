import { Feather } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ToastConfig } from "react-native-toast-message";
import { Colors, Typography } from "../constants/styles";

const { width } = Dimensions.get("window");

const toastConfig: ToastConfig = {
  error: (params) => (
    <View style={styles.errorContainer}>
      {/* Icon Circle */}
      <View style={styles.errorIconContainer}>
        <Feather name="x" size={12} color="white" />
      </View>

      {/* Text Message */}
      <Text style={styles.errorText}>{params.text1}</Text>
    </View>
  ),

  success: (params) => (
    <View style={styles.successContainer}>
      <View style={styles.successIconContainer}>
        <Feather name="check" size={14} color="white" />
      </View>
      <Text style={styles.successText}>{params.text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  // Container styling to match your screenshot
  errorContainer: {
    height: 50,
    width: width * 0.9, // 90% of screen width
    backgroundColor: "#FEE2E2", // Light red background
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 12, // The "pill" look
    borderWidth: 1,
    borderColor: Colors.error, // Border color
  },
  errorIconContainer: {
    backgroundColor: Colors.error, // Darker red for icon background
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  errorText: {
    color: Colors.error, // Deep red text
    fontSize: 13,
    fontFamily: Typography.family.medium,
  },

  // Success styling
  successContainer: {
    height: 60,
    width: width * 0.9,
    backgroundColor: "#DCFCE7",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.success,
  },
  successIconContainer: {
    backgroundColor: Colors.success,
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  successText: {
    color: Colors.successText,
    fontSize: 13,
    fontFamily: Typography.family.medium,
  },
});

export default toastConfig;
