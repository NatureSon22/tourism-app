import React from "react";
import { StyleSheet, View } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";

export default function ForumFilterSheet(props: SheetProps) {
  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={styles.sheetContainer}
      gestureEnabled={true}
    >
      <View style={styles.container}>
        
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: { borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  container: { height: 600 },
});
