import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Keyboard } from "react-native";

export type SelectedImage = {
  id: string;
  uri: string;
};

const createSelectedImage = (uri: string) => ({
  id: `${uri}-${Date.now()}`,
  uri,
});

export const useExperienceComposer = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const pickImages = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (result.canceled) return;

    const assets = result.assets ?? [];
    const newImages = assets
      .filter((asset) => asset.uri)
      .map((asset) => createSelectedImage(asset.uri));

    setSelectedImages((prev) => [...prev, ...newImages]);
  }, []);

  const captureImage = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your camera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (result.canceled) return;
    const asset = result.assets?.[0];
    if (!asset?.uri) return;

    setSelectedImages((prev) => [...prev, createSelectedImage(asset.uri)]);
  }, []);

  const removeImage = useCallback((id: string) => {
    setSelectedImages((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const canPost = useMemo(
    () => !!title.trim() || !!content.trim() || selectedImages.length > 0,
    [title, content, selectedImages.length],
  );

  const handlePost = useCallback(() => {
    if (!canPost) return;

    console.log("Posting experience", {
      title,
      content,
      imageUris: selectedImages.map((image) => image.uri),
    });

    setTitle("");
    setContent("");
    setSelectedImages([]);
    Keyboard.dismiss();
  }, [canPost, content, selectedImages, title]);

  return {
    title,
    content,
    selectedImages,
    isKeyboardVisible,
    setTitle,
    setContent,
    pickImages,
    captureImage,
    removeImage,
    canPost,
    handlePost,
  };
};
