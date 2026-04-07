import CustomButton from "@/src/components/ui/CustomButton";
import CustomTextInput from "@/src/components/ui/CustomTextInput";
import { Colors, Typography } from "@/src/constants/styles";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
    Platform,
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
}: ReplyComposerProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isEmojiMode, setIsEmojiMode] = useState(false);
  const inputRef = useRef<TextInput | null>(null);

  const isExpanded = isFocused || value.length > 0 || selectedImages.length > 0;

  const handleImagePick = async () => {
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
      setSelectedImages((current) => [...current, ...pickedUris]);
    }
  };

  const handleRemoveImage = (uri: string) => {
    setSelectedImages((current) => current.filter((item) => item !== uri));
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsEmojiMode(false);
  };

  const handleBlur = () => {
    if (value.length === 0 && selectedImages.length === 0) {
      setIsFocused(false);
      setIsEmojiMode(false);
    }
  };

  const handleOpenEmojiKeyboard = () => {
    inputRef.current?.focus();
    setIsEmojiMode(true);
  };

  const handleSend = () => {
    onSubmit({
      text: value,
      imageUris: selectedImages.length > 0 ? selectedImages : undefined,
    });
    setSelectedImages([]);
    setIsEmojiMode(false);
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

      <View style={styles.composerRow}>
        <CustomTextInput
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline
          containerStyle={styles.inputContainer}
          inputStyle={[styles.input, isExpanded && styles.expandedInput]}
        />

        <CustomButton
          title="Send"
          onPress={handleSend}
          disabled={disabled || (!value.trim() && selectedImages.length === 0)}
          isLoading={isLoading}
          style={styles.sendButton}
        />
      </View>

      {isExpanded ? (
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleOpenEmojiKeyboard}
          >
            <Text style={styles.actionLabel}>😊</Text>
            <Text style={styles.actionText}>Emoji Keyboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleImagePick}
          >
            <Text style={styles.actionLabel}>🖼️</Text>
            <Text style={styles.actionText}>Attach Images</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {isEmojiMode && isFocused ? (
        <Text style={styles.hintText}>
          Use your system keyboard’s emoji selector once the input is focused.
        </Text>
      ) : null}

      {selectedImages.length > 0 ? (
        <View style={styles.imagePreviewGrid}>
          {selectedImages.map((uri) => (
            <View key={uri} style={styles.imagePreviewItem}>
              <Image source={{ uri }} style={styles.previewImage} />
              <TouchableOpacity
                onPress={() => handleRemoveImage(uri)}
                style={styles.removeImageButton}
              >
                <Text style={styles.removeImageText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 24 : 16,
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
  composerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  inputContainer: {
    flex: 1,
    minHeight: 54,
    marginRight: 12,
  },
  input: {
    fontSize: 14,
    paddingVertical: 12,
  },
  sendButton: {
    minWidth: 80,
    paddingVertical: 14,
    borderRadius: 14,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  actionLabel: {
    fontSize: 16,
  },
  actionText: {
    color: Colors.text,
    fontSize: 12,
    fontFamily: Typography.family.medium,
  },
  hintText: {
    marginTop: 8,
    color: Colors.textMuted,
    fontSize: 11,
    fontFamily: Typography.family.regular,
  },
  imagePreviewGrid: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  imagePreviewItem: {
    width: 76,
    alignItems: "center",
  },
  previewImage: {
    width: 76,
    height: 76,
    borderRadius: 14,
    backgroundColor: Colors.border,
  },
  removeImageButton: {
    marginTop: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: Colors.error,
    borderRadius: 12,
  },
  removeImageText: {
    color: "white",
    fontSize: 12,
    fontFamily: Typography.family.medium,
  },
  expandedInput: {
    minHeight: 90,
  },
});
