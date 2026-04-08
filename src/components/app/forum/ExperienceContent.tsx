import { Colors, Typography } from "@/src/constants/styles";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

type ExperienceContentProps = {
  title: string;
  content: string;
  onTitleChange: (text: string) => void;
  onContentChange: (text: string) => void;
  titleCountLabel: string;
  contentCountLabel: string;
};

export default function ExperienceContent({
  title,
  content,
  onTitleChange,
  onContentChange,
  titleCountLabel,
  contentCountLabel,
}: ExperienceContentProps) {
  return (
    <View style={styles.contentSection}>
      {/* <View style={styles.fieldLabelRow}>
        <Text style={styles.fieldLabel}>Title</Text>
        <Text style={styles.helpText}>{titleCountLabel}</Text>
      </View> */}

      <TextInput
        placeholder="Title"
        placeholderTextColor={Colors.textMuted}
        value={title}
        onChangeText={onTitleChange}
        style={styles.titleInput}
        returnKeyType="next"
      />

      {/* <View style={styles.fieldLabelRow}>
        <Text style={styles.fieldLabel}>Share your experience</Text>
        <Text style={styles.helpText}>{contentCountLabel}</Text>
      </View> */}

      <TextInput
        placeholder="Share your experience"
        placeholderTextColor={Colors.textMuted}
        value={content}
        onChangeText={onContentChange}
        multiline
        style={styles.contentInput}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentSection: {
    gap: 0,
  },
  fieldLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldLabel: {
    color: Colors.text,
    fontFamily: Typography.family.semiBold,
    fontSize: 14,
  },
  helpText: {
    color: Colors.textMuted,
    fontFamily: Typography.family.regular,
    fontSize: 12,
  },
  titleInput: {
    backgroundColor: Colors.surface,
    color: Colors.text,
    fontFamily: Typography.family.medium,
    fontSize: 16,
  },
  contentInput: {
    color: Colors.text,
    fontFamily: Typography.family.regular,
    fontSize: 14,
  },
});
