import { Colors, Typography } from "@/src/constants/styles";
import useAuthStore from "@/src/stores/authStore";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type ReplyComposerPayload = {
  text: string;
  imageUris?: string[];
};

type ReplyComposerProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: (payload: ReplyComposerPayload) => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  activeReplyTarget?: string | null;
  onCancelReply: () => void;
  onTyping?: () => void;
  onStopTyping?: () => void;
};

export default function ReplyComposer({
  value,
  onChangeText,
  onSubmit,
  placeholder = "Write a reply...",
  isLoading = false,
  disabled = false,
  activeReplyTarget,
  onCancelReply,
  onTyping,
  onStopTyping,
}: ReplyComposerProps) {
  const author = useAuthStore((state) => state.user);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const inputRef = useRef<TextInput | null>(null);
  const MAX_IMAGES = 4;

  const isExpanded = isFocused || value.length > 0 || selectedImages.length > 0;
  const canSend =
    !disabled && (value.trim().length > 0 || selectedImages.length > 0);
  const remainingImageSlots = MAX_IMAGES - selectedImages.length;

  const handleImagePick = async () => {
    if (remainingImageSlots <= 0) return;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsMultipleSelection: true,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const pickedUris = result.assets
        .map((asset) => asset.uri)
        .filter(Boolean) as string[];
      const limitedUris = pickedUris.slice(0, remainingImageSlots);
      setSelectedImages((current) => [...current, ...limitedUris]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((current) => current.filter((_, i) => i !== index));
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (value.length === 0 && selectedImages.length === 0) {
      setIsFocused(false);
    }
    onStopTyping?.();
  };

  const handleSend = () => {
    onSubmit({
      text: value,
      imageUris: selectedImages.length > 0 ? selectedImages : undefined,
    });
    setSelectedImages([]);
    onStopTyping?.();
  };

  return (
    <View style={styles.footer}>
      {activeReplyTarget ? (
        <View style={styles.replyTargetRow}>
          <Text style={styles.replyTargetText}>
            Replying to @{activeReplyTarget}
          </Text>
          <TouchableOpacity onPress={onCancelReply}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {selectedImages.length > 0 ? (
        <ScrollView
          style={styles.imagePreviewGrid}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imagePreviewContent}
        >
          {selectedImages.map((uri, index) => (
            <View key={`${uri}-${index}`} style={styles.imagePreviewItem}>
              <Image
                source={{ uri }}
                style={styles.previewImage}
                contentFit="cover"
              />
              <TouchableOpacity
                onPress={() => handleRemoveImage(index)}
                style={styles.removeImageButton}
              >
                <Feather name="x" size={12} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : null}

      <View style={styles.composerRow}>
        <Image
          source={{ uri: author?.profilePictureUrl ?? "" }}
          style={styles.avatar}
          contentFit="cover"
        />

        <View style={styles.inputWrapper}>
          <TextInput
            ref={inputRef}
            style={[styles.input, isExpanded && styles.expandedInput]}
            placeholder={placeholder}
            placeholderTextColor={Colors.textMuted}
            value={value}
            onChangeText={(text) => {
              onChangeText(text);
              onTyping?.();
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            multiline
            scrollEnabled
          />
        </View>

        <TouchableOpacity
          style={[
            styles.attachButton,
            remainingImageSlots <= 0 && styles.attachButtonDisabled,
          ]}
          onPress={handleImagePick}
          disabled={remainingImageSlots <= 0}
        >
          <MaterialIcons name="image" size={20} color={Colors.textMuted} />
        </TouchableOpacity>

        <Pressable
          style={({ pressed }) => [
            styles.sendIconButton,
            pressed && styles.sendIconPressed,
          ]}
          onPress={handleSend}
          disabled={!canSend}
        >
          <Ionicons
            name="send-sharp"
            size={20}
            color={canSend ? Colors.text : Colors.textMuted}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "95%",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 10,
    borderRadius: 30,
    alignSelf: "center",
  },
  replyTargetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  replyTargetText: {
    color: Colors.text,
    fontFamily: Typography.family.medium,
    fontSize: 12,
  },
  cancelText: {
    color: Colors.primary,
    fontFamily: Typography.family.medium,
    fontSize: 12,
  },
  imagePreviewGrid: {
    marginBottom: 12,
    paddingTop: 10,
  },
  imagePreviewContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  imagePreviewItem: {
    width: 80,
    alignItems: "center",
    position: "relative",
    marginRight: 10,
  },
  previewImage: {
    width: 70,
    height: 70,
    borderRadius: 14,
    backgroundColor: Colors.border,
  },
  removeImageButton: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 12,
    backgroundColor: Colors.error,
    position: "absolute",
    top: -6,
    right: -6,
  },
  removeImageText: {
    color: "white",
    fontSize: 11,
    fontFamily: Typography.family.medium,
  },
  composerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 21,
    backgroundColor: Colors.border,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    minHeight: 28,
    maxHeight: 140,
    borderRadius: 18,
    color: Colors.text,
    fontSize: 12.5,
    fontFamily: Typography.family.regular,
    backgroundColor: "#F0F0F0",
  },
  expandedInput: {
    borderColor: Colors.primary,
  },
  actionRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  attachButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    // paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#F0F0F0",
  },
  attachButtonDisabled: {
    borderColor: Colors.border,
    opacity: 0.5,
  },
  attachIcon: {
    fontSize: 16,
  },
  attachLabel: {
    color: Colors.text,
    fontSize: 12,
    fontFamily: Typography.family.medium,
  },
  sendIconButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
  },
  sendIconPressed: {
    opacity: 0.7,
  },
  imageCountText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontFamily: Typography.family.regular,
    marginHorizontal: 10,
  },
  sendButton: {
    minWidth: 88,
    paddingVertical: 10,
    borderRadius: 14,
  },
});
