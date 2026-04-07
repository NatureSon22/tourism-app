import { Typography } from "@/src/constants/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    gap: 12,
  },
  profileSection: {
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 48,
    backgroundColor: "#E5E7EB",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
  },
  profileSub: {
    fontSize: 14,
    color: "#6B7280",
  },
  photoSection: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  fieldSection: {
    gap: 10,
  },
  fieldRow: {
    width: "100%",
  },
  fieldLabel: {
    fontSize: 12,
    fontFamily: Typography.family.medium,
    color: "#6B7280",
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  editBtn: {
    padding: 0,
    borderWidth: 0,
  },
  editBtnText: {
    fontSize: 12,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#6B7280",
  },
});
