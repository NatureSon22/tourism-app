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
    // request permission to access media library
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
      allowsEditing: true, // Allows user to edit the selected image
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // result.assets[0].uri contains the local file URI
      const localUri = result.assets[0].uri;
      console.log(localUri);
      // Proceed to upload the image
      setSelectedImage(localUri);
    }
  };

  const handleTakePhoto = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.status !== "granted") {
      Alert.alert("Permission for camera access needed.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Allows editing/cropping the image after capture
      quality: 1, // Highest quality
      mediaTypes: ["images"],
      aspect: [4, 3],
    });

    if (!result.canceled) {
      // result.assets[0].uri contains the local file URI
      const localUri = result.assets[0].uri;
      console.log(localUri);
      // Proceed to upload the image
      setSelectedImage(localUri);
    }
  };

  const handleRemovePhoto = () => {
    setSelectedImage(null);
  };

  const handleSave = () => {
    if (!selectedImage) return;
    console.log("Selected profile image:", selectedImage);
    if (updateUser) {
      updateUser({ profilePictureUrl: selectedImage });
    }
    handleClose();
  };

  return (
    <ActionSheet id={props.sheetId} containerStyle={styles.sheetContainer}>
      <View style={styles.headerContainer}>
        <HeaderSheet title="Edit Photo" handleCloseSheet={handleClose} />
      </View>

      <View style={styles.content}>
        <View style={styles.optionsRow}>
          <CustomButton title="Take Photo" onPress={handleTakePhoto} />
          <CustomButton
            title="Choose from Library"
            onPress={handlePickFromLibrary}
          />
        </View>

        {user?.profilePictureUrl ? (
          <Text style={styles.currentLabel}>Current photo</Text>
        ) : null}

        <Image
          source={{ uri: selectedImage || user?.profilePictureUrl || "" }}
          style={styles.imagePreview}
        />

        {selectedImage && (
          <CustomButton
            title="Remove Photo"
            variant="outlined"
            onPress={handleRemovePhoto}
          />
        )}

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
    padding: 16,
  },
  headerContainer: {
    marginBottom: 12,
  },
  content: {
    gap: 12,
  },
  optionsRow: {
    gap: 10,
  },
  currentLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  imagePreview: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
});
