import FORUM_TYPES from "@/src/constants/forumTypes";
import { Colors, Typography } from "@/src/constants/styles";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActionSheet, {
  ScrollView,
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import FooterSheet from "../app/FooterSheet";
import HeaderSheet from "../app/HeaderSheet";

export default function ForumFilterSheet(props: SheetProps) {
  const [filter, setFilter] = useState<string[]>([]);

  const handleCloseSheet = () => {
    SheetManager.hide(props.sheetId);
  };

  const toggleFilter = (type: string) => {
    setFilter((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleApplyFilter = () => {
    // Logic to apply filter
  };

  const handleClearFilter = () => {
    setFilter([]);
  };

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={styles.sheetContainer}
      gestureEnabled={true}
      useBottomSafeAreaPadding={false}
    >
      <View style={styles.wrapper}>
        <HeaderSheet title="Forum Filter" handleCloseSheet={handleCloseSheet} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.chipContainer}>
            {FORUM_TYPES.map((type) => {
              const isSelected = filter.includes(type);

              return (
                <TouchableOpacity key={type} onPress={() => toggleFilter(type)}>
                  <View
                    style={[styles.chip, isSelected && styles.selectedChip]}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isSelected && styles.selectedChipText,
                      ]}
                    >
                      {type}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <FooterSheet
          handleApply={handleApplyFilter}
          handleClear={handleClearFilter}
        />
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  wrapper: {
    height: 420,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  chipContainer: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  chip: {
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedChip: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  chipText: {
    fontSize: 10,
    fontFamily: Typography.family.regular,
    color: Colors.text,
  },
  selectedChipText: {
    color: Colors.textOnPrimary,
    fontFamily: Typography.family.semiBold, // Optional: makes it stand out more
  },
});
