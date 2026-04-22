import CustomButton from "@/src/components/ui/CustomButton";
import Divider from "@/src/components/ui/Divider";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import useAuthStore from "@/src/stores/authStore";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { USER_PROFILE_PLACEHOLDER } from "../constants/assetsPath";
import { Typography } from "../constants/styles";

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
      <View style={styles.photoSection}>
        <VStack gap={8} style={styles.centeredSelf}>
          <VStack style={styles.centered} gap={7}>
            <Pressable
              onPress={() => handleOpenSheet("edit-profile-image-sheet")}
            >
              <Image
                source={
                  user.profilePictureUrl
                    ? {
                        uri: `${process.env.EXPO_BASE_URL}${user.profilePictureUrl}`,
                      }
                    : USER_PROFILE_PLACEHOLDER
                }
                style={styles.profileImage}
              />
            </Pressable>

            <VStack style={styles.centered} gap={0}>
              <Text
                style={styles.profileName}
              >{`${user.firstName} ${user.lastName}`}</Text>
              <Text style={styles.profileSub}>{`@${user.userName}`}</Text>
            </VStack>
          </VStack>
        </VStack>
      </View>

      <Divider />

      <View style={styles.fieldSection}>
        <VStack gap={8}>
          <HStack justifyContent="space-between" style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Name</Text>
            <CustomButton
              title="Edit"
              variant="outlined"
              onPress={() => handleOpenSheet("edit-name-sheet")}
              style={styles.editBtn}
              textStyle={styles.editBtnText}
            />
          </HStack>
          <Text
            style={styles.fieldValue}
          >{`${user.firstName} ${user.lastName}`}</Text>
        </VStack>

        <Divider />

        <VStack gap={8}>
          <HStack justifyContent="space-between" style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Username</Text>
            <CustomButton
              title="Edit"
              variant="outlined"
              onPress={() => handleOpenSheet("edit-username-sheet")}
              style={styles.editBtn}
              textStyle={styles.editBtnText}
            />
          </HStack>
          <Text style={styles.fieldValue}>{user.userName}</Text>
        </VStack>

        <Divider />

        <VStack gap={8}>
          <HStack justifyContent="space-between" style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Email</Text>
            {/* <CustomButton
              title="Edit"
              variant="outlined"
              onPress={() => handleOpenSheet("edit-email-sheet")}
              style={styles.editBtn}
              textStyle={styles.editBtnText}
            /> */}
          </HStack>
          <Text style={styles.fieldValue}>{user.email}</Text>
        </VStack>
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
    width: 80,
    height: 80,
    borderRadius: 48,
    backgroundColor: "#E5E7EB",
  },
  profileName: {
    fontSize: 14,
    fontFamily: Typography.family.medium,
  },
  profileSub: {
    fontSize: 10,
    fontFamily: Typography.family.regular,
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
  centered: {
    alignItems: "center",
  },
  centeredSelf: {
    alignItems: "center",
    alignSelf: "center",
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
