import ExperienceContent from "@/src/components/app/forum/ExperienceContent";
import ExperienceFooter from "@/src/components/app/forum/ExperienceFooter";
import ExperienceHeader from "@/src/components/app/forum/ExperienceHeader";
import ExperienceMediaPreview from "@/src/components/app/forum/ExperienceMediaPreview";
import { useExperienceComposer } from "@/src/hooks/useExperienceComposer";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import useAuthStore from "@/src/stores/authStore";
import React, { useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function Experience() {
  const auth = useAuthStore((state) => state);
  const {
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
  } = useExperienceComposer();

  const [currentPage, setCurrentPage] = useState(0);

  const mediaCount = selectedImages.length;
  const contentCountLabel = useMemo(
    () => `${content.length} chars`,
    [content.length],
  );

  const handlePageSelected = (event: any) => {
    setCurrentPage(event.nativeEvent.position);
  };

  useEffect(() => {
    if (currentPage >= selectedImages.length) {
      setCurrentPage(Math.max(0, selectedImages.length - 1));
    }
  }, [currentPage, selectedImages.length]);

  return (
    <SafeArea edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 80}
      >
        <Screen style={styles.screen}>
          <ExperienceHeader
            userName={auth.user?.userName}
            profilePictureUrl={auth.user?.profilePictureUrl}
          />

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
          >
            <ExperienceContent
              title={title}
              content={content}
              onTitleChange={setTitle}
              onContentChange={setContent}
              titleCountLabel={`${title.length} chars`}
              contentCountLabel={contentCountLabel}
            />
            {mediaCount > 0 && (
              <ExperienceMediaPreview
                selectedImages={selectedImages}
                currentPage={currentPage}
                onPageSelected={handlePageSelected}
                removeImage={removeImage}
              />
            )}
          </ScrollView>

          <ExperienceFooter
            onCapture={captureImage}
            onPickImages={pickImages}
            canPost={canPost}
            onPost={handlePost}
            mediaCount={mediaCount}
          />
        </Screen>
      </KeyboardAvoidingView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
  screen: {
    flex: 1,
    gap: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
    gap: 24,
  },
});
