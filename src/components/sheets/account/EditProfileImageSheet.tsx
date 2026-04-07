import HeaderSheet from "@/src/components/app/HeaderSheet";
import CustomButton from "@/src/components/ui/CustomButton";
import useAuthStore from "@/src/stores/authStore";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";

export default function EditProfileImageSheet(props: SheetProps) {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleClose = () => {
    setSelectedImage(null);
    SheetManager.hide(props.sheetId);
  };

  const handlePickFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Please grant permission to access the photo library in your device settings.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.status !== "granted") {
      Alert.alert("Permission for camera access needed.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ["images"],
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!selectedImage) return;
    if (updateUser) {
      updateUser({ profilePictureUrl: selectedImage });
    }
    handleClose();
  };

  const imageSource = selectedImage || user?.profilePictureUrl;

  return (
    <ActionSheet id={props.sheetId} containerStyle={styles.sheetContainer}>
      <HeaderSheet title="Edit Photo" handleCloseSheet={handleClose} />

      <View style={styles.content}>
        {/* Preview */}
        <View style={styles.previewWrapper}>
          {imageSource ? (
            <Image source={{ uri: imageSource }} style={styles.imagePreview} />
          ) : (
            <View style={[styles.imagePreview, styles.imagePlaceholder]}>
              <Text style={styles.placeholderText}>No photo selected</Text>
            </View>
          )}
        </View>

        {/* Pick options */}
        <View style={styles.optionsRow}>
          <CustomButton
            title="Take Photo"
            onPress={handleTakePhoto}
            variant="outlined"
          />
          <CustomButton
            title="Choose from Library"
            onPress={handlePickFromLibrary}
            variant="outlined"
          />
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <CustomButton
            title="Save"
            onPress={handleSave}
            disabled={!selectedImage}
          />
          <CustomButton
            title="Cancel"
            variant="outlined"
            onPress={handleClose}
          />
        </View>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "white",
  },
  content: {
    gap: 16,
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 8,
  },
  previewWrapper: {
    alignItems: "center",
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E5E7EB",
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  optionsRow: {
    gap: 10,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
});
