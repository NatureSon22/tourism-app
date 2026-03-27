import { Event } from "@/src/constants/eventListing";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { memo, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type EventCardProps = Event & { formattedDate?: string };

function EventCard({
  name,
  location,
  date,
  imageUrl,
  types,
  formattedDate,
}: EventCardProps) {
  const router = useRouter();
  const [showAllTypes, setShowAllTypes] = useState(false);
  const hasMoreTypes = types.length > 2;
  const visibleTypes = useMemo(
    () => (showAllTypes ? types : types.slice(0, 2)),
    [showAllTypes, types],
  );

  const handlePress = () => {
    router.push({ pathname: "/event", params: { id: name } });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <HStack gap={16} alignItems="center">
        {/* Event Image */}
        <Image source={imageUrl} style={styles.image} contentFit="cover" />

        <VStack style={styles.content} gap={4}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.location} numberOfLines={1}>
            {location}
          </Text>
          <Text style={styles.date}>{formattedDate}</Text>

          {/* Tags Section */}
          <View style={styles.tagRow}>
            {visibleTypes.map((type, idx) => (
              <View
                key={`${type}-${idx}`}
                style={[styles.tag, idx !== 0 && styles.tagSpacing]}
              >
                <Text style={styles.tagText}>{type}</Text>
              </View>
            ))}
            {hasMoreTypes && (
              <Pressable
                onPress={() => setShowAllTypes((s) => !s)}
                hitSlop={20}
                style={({ pressed }) => [
                  styles.tag,
                  styles.moreTag,
                  { opacity: pressed ? 0.6 : 1 },
                ]}
              >
                <Text style={styles.tagText}>
                  {showAllTypes ? "Show less" : "..."}
                </Text>
              </Pressable>
            )}
          </View>
        </VStack>
      </HStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    width: "100%",
  },
  image: {
    width: 110,
    height: "100%",
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 12,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
  location: {
    fontSize: 11,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
  },
  date: {
    fontSize: 10,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  tagWrapper: {
    marginTop: 4,
  },
  tagRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 22,
  },
  tagSpacing: {
    marginLeft: 6,
  },
  moreTag: {
    marginLeft: 6,
    paddingHorizontal: 8,
  },
  tagText: {
    fontSize: 9,
    fontFamily: Typography.family.medium,
    color: Colors.primary,
    includeFontPadding: false,
  },
});

export default memo(EventCard);
