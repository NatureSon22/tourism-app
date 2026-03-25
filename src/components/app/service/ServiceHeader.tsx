import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

interface ServiceHeaderProps {
  title: string;
  tags: string[];
  location: string;
}

export default function ServiceHeader({
  title,
  tags,
  location,
}: ServiceHeaderProps) {
  return (
    <VStack gap={12}>
      <VStack gap={8} style={{ alignItems: "flex-start" }}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.tagsWrapper}>
          <FlatList
            data={tags}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.tagsContainer}
            renderItem={({ item: tag }) => (
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            )}
          />
        </View>
      </VStack>

      <HStack
        alignItems="center"
        justifyContent="space-between"
        style={{ width: "100%" }}
      >
        <HStack gap={4}>
          <Ionicons
            name="location-outline"
            size={18}
            color={Colors.textMuted}
          />
          <Pressable onPress={() => {}}>
            <Text style={styles.locationText} numberOfLines={1}>
              {location}
            </Text>
          </Pressable>
        </HStack>
        <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
      </HStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
  tagsWrapper: { height: 30 },
  tagsContainer: { flexDirection: "row", gap: 8 },
  tagBadge: {
    height: 24,
    backgroundColor: "#4C7799",
    borderRadius: 5,
    paddingHorizontal: 7,
    justifyContent: "center",
  },
  tagText: {
    fontSize: 9.5,
    fontFamily: Typography.family.medium,
    color: Colors.textOnPrimary,
  },
  locationText: {
    fontSize: 10.5,
    fontFamily: Typography.family.regular,
    maxWidth: 220,
  },
});
