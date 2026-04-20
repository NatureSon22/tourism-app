import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { useBookmarkEvent } from "@/src/services/request/useEvent";
import { EVENT } from "@/src/types/listingTypes";
import { formatListingAddress } from "@/src/utils/formatListingAddress";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { memo, useMemo, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type EventCardProps = EVENT & { formattedDate?: string };

function EventCard({
  id,
  title,
  thumbnail,
  addresses,
  categories,
  formattedDate,
  is_bookmarked,
}: EventCardProps) {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(is_bookmarked ?? false);
  const bookmarkMutation = useBookmarkEvent(id);
  const [showAllTypes, setShowAllTypes] = useState(false);
  const types = useMemo(
    () =>
      categories && categories.length > 0
        ? categories.map((category) => category.name)
        : [],
    [categories],
  );
  const hasMoreTypes = types.length > 2;
  const visibleTypes = useMemo(
    () => (showAllTypes ? types : types.slice(0, 2)),
    [showAllTypes, types],
  );

  const location = addresses
    ? formatListingAddress(addresses, "short")
    : "Location not available";

  const handlePress = () => {
    router.push({ pathname: "/event/[id]", params: { id: String(id) } });
  };

  const handleBookmark = (event: GestureResponderEvent) => {
    event.stopPropagation?.();
    if (!id || bookmarkMutation.isPending) return;

    const nextBookmarked = !bookmarked;
    const previousBookmarked = bookmarked;
    setBookmarked(nextBookmarked);

    bookmarkMutation.mutate(
      { shouldBookmark: nextBookmarked },
      {
        onError: () => {
          setBookmarked(previousBookmarked);
        },
        onSuccess: (data) => {
          if (typeof data?.bookmarked === "boolean") {
            setBookmarked(data.bookmarked);
          }
        },
      },
    );
  };

  return (
    <View style={styles.card}>
      <HStack gap={16} alignItems="center">
        {/* Event Image */}
        <Pressable style={styles.image} onPress={handlePress}>
          <Image
            source={{ uri: thumbnail }}
            contentFit="cover"
            style={styles.imageContent}
          />
          <Pressable style={styles.bookmarkBtn} onPress={handleBookmark}>
            <Ionicons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={16}
              color={Colors.rating}
            />
          </Pressable>
        </Pressable>

        <VStack style={styles.content} gap={4}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.location} numberOfLines={1}>
            {location}
          </Text>
          <Text style={styles.date}>{formattedDate}</Text>

          {/* Tags Section */}
          <ScrollView
            horizontal
            // This is the secret: give the ScrollView vertical padding
            // so the touchable area is larger (around 40-44px)

            showsHorizontalScrollIndicator={false}
            // Disable the parent Pressable when touching the tags
            onTouchStart={(e) => e.stopPropagation()}
          >
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
          </ScrollView>
        </VStack>
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    width: "100%",
  },
  image: {
    width: 110,
    height: 120,
    borderRadius: 8,
    backgroundColor: Colors.background,
    position: "relative",
    overflow: "hidden",
  },
  imageContent: {
    width: "100%",
    height: "100%",
  },
  bookmarkBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: 6,
    zIndex: 1,
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
