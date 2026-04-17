import { Typography } from "@/src/constants/styles";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type Section = {
  id: string;
  title: string;
};

type AccomodationNavHeaderProps = {
  sections: Section[];
  selectedSectionId?: string;
  onSelectSection?: (sectionId: string) => void;
  showHeader?: boolean;
};

export default function AccomodationNavHeader({
  sections,
  selectedSectionId,
  onSelectSection,
  showHeader = true,
}: AccomodationNavHeaderProps) {
  if (!showHeader || sections.length === 0) return null;

  return (
    <View
      style={[styles.stickyHeader, { display: showHeader ? "flex" : "none" }]}
    >
      {/* the sections will be  */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabRow}
      >
        {sections.map((section) => {
          const isSelected = section.id === selectedSectionId;
          return (
            <Pressable
              key={section.id}
              style={styles.tab}
              onPress={() => onSelectSection?.(section.id)}
            >
              <Text
                style={[
                  styles.headerText,
                  isSelected ? styles.selectedText : null,
                ]}
              >
                {section.title}
              </Text>
              {isSelected ? <View style={styles.underline} /> : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  stickyHeader: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    zIndex: 1,
  },
  tabRow: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 13,
    fontFamily: Typography.family.medium,
    color: "#1A2117",
  },
  selectedText: {
    textDecorationLine: "underline",
  },
  underline: {
    marginTop: 4,
    width: "100%",
    height: 2,
    backgroundColor: "#1A2117",
    borderRadius: 2,
  },
});
