import HeaderSheet from "@/src/components/app/HeaderSheet";
import CustomButton from "@/src/components/ui/CustomButton";
import { useProfilePicture } from "@/src/services/request/useProfilePicture";
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
  const profilePictureMutation = useProfilePicture();
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

    const fileName = selectedImage.split("/").pop() || "profile.jpg";
    const form = new FormData();
    form.append("image", {
      uri: selectedImage,
      name: fileName,
      type: "image/jpeg",
    } as any);

    profilePictureMutation.mutate(form, {
      onSuccess: handleClose,
    });
  };

  const imageSource = selectedImage || user?.profilePictureUrl;

  return (
    <ActionSheet id={props.sheetId} containerStyle={styles.sheetContainer}>
      <HeaderSheet title="Edit Photo" handleCloseSheet={handleClose} />

      <View style={styles.content}>
        <View style={styles.intro}>
          <Text style={styles.title}>Update your profile photo</Text>
          <Text style={styles.subtitle}>
            Choose a new image or take a photo to personalize your profile.
          </Text>
        </View>

        <View style={styles.previewWrapper}>
          {imageSource ? (
            <Image source={{ uri: imageSource }} style={styles.imagePreview} />
          ) : (
            <View style={[styles.imagePreview, styles.imagePlaceholder]}>
              <Text style={styles.placeholderText}>No photo selected</Text>
            </View>
          )}
          <Text style={styles.previewHint}>
            {selectedImage
              ? "Preview of selected photo"
              : "Current profile photo"}
          </Text>
        </View>

        <View style={styles.optionsRow}>
          <CustomButton
            title="Take Photo"
            onPress={handleTakePhoto}
            variant="outlined"
            style={styles.optionButton}
            textStyle={styles.buttonTextStyle}
          />
          <CustomButton
            title="Choose from Library"
            onPress={handlePickFromLibrary}
            variant="outlined"
            style={styles.optionButton}
            textStyle={styles.buttonTextStyle}
          />
        </View>

        <View style={styles.actions}>
          <CustomButton
            title="Save"
            onPress={handleSave}
            disabled={!selectedImage || profilePictureMutation.isPending}
            isLoading={profilePictureMutation.isPending}
            style={styles.actionButton}
            textStyle={styles.buttonTextStyle}
          />
          <CustomButton
            title="Cancel"
            variant="outlined"
            onPress={handleClose}
            style={styles.actionButton}
            textStyle={styles.buttonTextStyle}
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
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 12,
  },
  intro: {
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 20,
  },
  previewWrapper: {
    alignItems: "center",
    gap: 10,
  },
  imagePreview: {
    width: 130,
    height: 130,
    borderRadius: 80,
    backgroundColor: "#E5E7EB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  previewHint: {
    fontSize: 12,
    color: "#6B7280",
  },
  optionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
  },
  buttonTextStyle: {
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
  },
});
