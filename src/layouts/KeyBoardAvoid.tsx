import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type KeyBoardAvoidProps = {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  // Buffer space between keyboard and focused input
  extraScrollHeight?: number;
};

export default function KeyBoardAvoid({
  children,
  contentContainerStyle,
  extraScrollHeight = 20,
}: KeyBoardAvoidProps) {
  return (
    <>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, contentContainerStyle]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled={false}
      >
        {children}
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
});
