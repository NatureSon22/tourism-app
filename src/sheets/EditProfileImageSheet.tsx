import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ActionSheet, { SheetManager, SheetProps } from "react-native-actions-sheet";
import CustomButton from "@/src/components/ui/CustomButton";
import HeaderSheet from "@/src/components/app/HeaderSheet";
import useAuthStore from "@/src/stores/authStore";

export default function EditProfileImageSheet(props: SheetProps) {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleClose = () => {
    setSelectedImage(null);
    SheetManager.hide(props.sheetId);
  };

  const handlePickFromLibrary = async () => {
    // Fallback stub: no image-picker module available in this workspace.
    const sampleUri = "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e";
    setSelectedImage(sampleUri);
  };

  const handleTakePhoto = async () => {
    // Fallback stub: assign sample photo URI
    const sampleUri = "https://images.unsplash.com/photo-1544005313-94ddf0286df2";
    setSelectedImage(sampleUri);
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
          <CustomButton title="Choose from Library" onPress={handlePickFromLibrary} />
        </View>

        {user?.profilePictureUrl ? (
          <Text style={styles.currentLabel}>Current photo</Text>
        ) : null}

        <Image
          source={{ uri: selectedImage || user?.profilePictureUrl || "" }}
          style={styles.imagePreview}
        />

        {selectedImage && (
          <CustomButton title="Remove Photo" variant="outlined" onPress={handleRemovePhoto} />
        )}

        <View style={styles.actions}> 
          <CustomButton title="Save" onPress={handleSave} disabled={!selectedImage} />
          <CustomButton title="Cancel" variant="outlined" onPress={handleClose} />
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
