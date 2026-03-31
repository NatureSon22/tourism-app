import CustomButton from "@/src/components/ui/CustomButton";
import Divider from "@/src/components/ui/Divider";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import useAuthStore from "@/src/stores/authStore";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export default function AccountInformation() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  const handleOpenSheet = (sheetId: string) => {
    SheetManager.show(sheetId, {
      onClose: () => {
        // Optionally refresh data after close
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Text
          style={styles.profileName}
        >{`${user.firstName} ${user.lastName}`}</Text>
        <Text style={styles.profileSub}>{`@${user.userName}`}</Text>
        <Text style={styles.profileSub}>{user.email}</Text>
      </View>

      <Divider />

      <View style={styles.photoSection}>
        <HStack justifyContent="space-between" style={styles.fieldRow}>
          <VStack gap={8} style={styles.valueGroup}>
            <Text style={styles.fieldLabel}>Photo</Text>
            <Image
              source={{ uri: user.profilePictureUrl }}
              style={styles.profileImage}
            />
          </VStack>
          <CustomButton
            title="Edit"
            variant="outlined"
            onPress={() => handleOpenSheet("edit-profile-image-sheet")}
            style={styles.editBtn}
          />
        </HStack>
      </View>

      <Divider />

      <View style={styles.fieldSection}>
        <HStack justifyContent="space-between" style={styles.fieldRow}>
          <VStack gap={4} style={styles.valueGroup}>
            <Text style={styles.fieldLabel}>Name</Text>
            <Text
              style={styles.fieldValue}
            >{`${user.firstName} ${user.lastName}`}</Text>
          </VStack>
          <CustomButton
            title="Edit"
            variant="outlined"
            onPress={() => handleOpenSheet("edit-name-sheet")}
            style={styles.editBtn}
          />
        </HStack>

        <Divider />

        <HStack justifyContent="space-between" style={styles.fieldRow}>
          <VStack gap={4} style={styles.valueGroup}>
            <Text style={styles.fieldLabel}>Username</Text>
            <Text style={styles.fieldValue}>{user.userName}</Text>
          </VStack>
          <CustomButton
            title="Edit"
            variant="outlined"
            onPress={() => handleOpenSheet("edit-username-sheet")}
            style={styles.editBtn}
          />
        </HStack>

        <Divider />

        <HStack justifyContent="space-between" style={styles.fieldRow}>
          <VStack gap={4} style={styles.valueGroup}>
            <Text style={styles.fieldLabel}>Email</Text>
            <Text style={styles.fieldValue}>{user.email}</Text>
          </VStack>
          <CustomButton
            title="Edit"
            variant="outlined"
            onPress={() => handleOpenSheet("edit-email-sheet")}
            style={styles.editBtn}
          />
        </HStack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: 96,
    height: 96,
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
  },
  fieldSection: {
    gap: 10,
  },
  fieldRow: {
    width: "100%",
  },
  valueGroup: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  editBtn: {
    minWidth: 80,
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
