import AccomodationExpectations from "@/src/components/app/accomodation/AccomodationExpectations";
import AccomodationForums from "@/src/components/app/accomodation/AccomodationForums";
import AccomodationHeader from "@/src/components/app/accomodation/AccomodationHeader";
import AccomodationImages from "@/src/components/app/accomodation/AccomodationImages";
import AccomodationReviews from "@/src/components/app/accomodation/AccomodationReviews";
import CustomButton from "@/src/components/ui/CustomButton";
import { LISTING_INFO } from "@/src/constants/accommodationdetail";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import VStack from "@/src/layouts/VStack";
import formatCurrency from "@/src/utils/currency";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function AccomodationDetailsPage() {
  const { width } = useWindowDimensions();
  const [showHeader, setShowHeader] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const imageHeight = width / (16 / 9);
  const router = useRouter();

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY >= imageHeight) {
      if (!showHeader) setShowHeader(true);
    } else {
      if (showHeader) setShowHeader(false);
    }
  };

  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screenContainer}>
        <ScrollView
          style={styles.scrollView}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
        >
          <AccomodationImages images={LISTING_INFO.images} />

          <AccomodationHeader showHeader={showHeader} />

          <View style={styles.contentContainer}>
            {/* Title + Rating + Reviews */}
            <VStack gap={8} style={{ alignItems: "flex-start" }}>
              <Text style={styles.title}>{LISTING_INFO.name}</Text>

              <HStack gap={8} alignItems="center">
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingValue}>
                    {LISTING_INFO.rating.toFixed(1)}
                  </Text>
                  <Text style={styles.ratingSlash}>/</Text>
                  <Text style={styles.ratingMax}>5</Text>
                </View>
                <Pressable>
                  <Text style={styles.reviewsLink}>
                    {LISTING_INFO.reviews.toLocaleString()} reviews
                  </Text>
                </Pressable>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.booksText}>
                  {LISTING_INFO.books}k + booked
                </Text>
              </HStack>

              {/* Tags */}
              <View style={styles.tagsWrapper}>
                <FlatList
                  data={LISTING_INFO.tags}
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

              {/* Location */}
              <HStack
                gap={8}
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
                      {LISTING_INFO.location}
                    </Text>
                  </Pressable>
                </HStack>

                <Ionicons
                  style={{}}
                  name="chevron-forward"
                  size={18}
                  color={Colors.textMuted}
                />
              </HStack>

              {/* Description with background */}
              <View style={styles.descriptionBox}>
                <Text
                  style={styles.descriptionText}
                  numberOfLines={showFullDesc ? undefined : 3}
                >
                  {LISTING_INFO.description}
                </Text>

                <Pressable
                  onPress={() => setShowFullDesc((s) => !s)}
                  style={{ marginTop: 8, alignSelf: "flex-start" }}
                >
                  <Text style={styles.seeAllLink}>
                    {showFullDesc ? "See less" : "See all"}
                  </Text>
                </Pressable>
              </View>
            </VStack>

            {/* Local hotlines */}
            <VStack style={styles.sectionContainer}>
              <HStack gap={8} style={styles.sectionHeader}>
                <View style={styles.sectionIndicator} />
                <Text style={styles.sectionTitle}>Nearby Local Hotlines</Text>
              </HStack>

              <VStack gap={5}>
                <HStack justifyContent="flex-start">
                  <MaterialCommunityIcons
                    name="office-building"
                    size={15}
                    color="black"
                  />
                  <Text style={styles.hotlineText}>
                    Pasig Medical Center: 0917-123-4567
                  </Text>
                </HStack>

                <HStack justifyContent="flex-start">
                  <MaterialCommunityIcons
                    name="police-badge-outline"
                    size={15}
                    color="black"
                  />
                  <Text style={styles.hotlineText}>
                    Pasig City Police Station: (63) 917-542-5967
                  </Text>
                </HStack>
              </VStack>
            </VStack>

            <View style={styles.divider} />

            {/* General Information Section */}
            <Pressable onPress={() => {}}>
              <HStack justifyContent="space-between">
                <Text style={[styles.sectionTitle, { fontSize: 13 }]}>
                  General Information
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={Colors.textMuted}
                />
              </HStack>
            </Pressable>

            <View style={styles.divider} />

            <Pressable onPress={() => {}}>
              <HStack justifyContent="space-between">
                <Text style={[styles.sectionTitle, { fontSize: 13 }]}>
                  Terms & Conditions
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={Colors.textMuted}
                />
              </HStack>
            </Pressable>

            <View style={styles.divider} />

            {/* From Community Forums */}
            <AccomodationForums forums={LISTING_INFO.forums} />

            <View style={styles.divider} />

            {/* Reviews */}
            <AccomodationReviews reviews={LISTING_INFO.reviewsData} />

            <View style={styles.divider} />

            <AccomodationExpectations expectations={LISTING_INFO.expects} />
            {/* Spacer for sticky footer */}
            <View style={{ height: 50 }} />
          </View>
        </ScrollView>

        {/* Sticky Footer with Price and Book Button */}
        <View style={styles.stickyFooter}>
          <VStack gap={0}>
            <Text style={styles.startsAtLabel}>Starts at</Text>
            <Text style={styles.priceText}>
              {formatCurrency(LISTING_INFO.packages[0].price)}
            </Text>
            <Text style={styles.discountText}>-38% TODAY</Text>
          </VStack>

          <CustomButton
            title="Book Now"
            textStyle={{ fontSize: 12 }}
            onPress={() => router.push("/bookmark")}
            variant="solid"
            style={{
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
            }}
          />
        </View>
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingBottom: 10,
    paddingTop: 0,
    paddingHorizontal: 0,
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    backgroundColor: "white",
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: Typography.family.bold,
    color: Colors.text,
  },
  ratingBadge: {
    backgroundColor: "#CEE9FF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  ratingValue: {
    fontSize: 11,
    fontFamily: Typography.family.medium,
    color: "#03518E",
  },
  ratingSlash: {
    fontSize: 12,
    fontFamily: Typography.family.medium,
    color: "#03518E",
  },
  ratingMax: {
    fontSize: 11,
    fontFamily: Typography.family.medium,
    color: "#03518E",
  },
  reviewsLink: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: Colors.textMuted,
    textDecorationLine: "underline",
  },
  separator: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  booksText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: Colors.textMuted,
  },
  tagsWrapper: {
    height: 30,
  },
  tagsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
  },
  tagBadge: {
    height: 24,
    backgroundColor: "#4C7799",
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  tagText: {
    fontSize: 9.5,
    fontFamily: "Poppins-Medium",
    color: Colors.textOnPrimary,
  },
  locationText: {
    fontSize: 10.5,
    fontFamily: Typography.family.regular,
    includeFontPadding: false,
    maxWidth: 220,
    padding: 4,
  },
  descriptionBox: {
    backgroundColor: "#E9F5FF",
    borderRadius: 10,
    padding: 14,
    position: "relative",
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
    lineHeight: 22,
  },
  seeAllLink: {
    fontSize: 12,
    fontFamily: Typography.family.medium,
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  hotlineText: {
    fontSize: 11,
    fontFamily: Typography.family.regular,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  sectionContainer: {
    alignSelf: "stretch",
    gap: 5,
    marginVertical: 10, // Gives breathing room between different sections
  },
  sectionHeader: {
    justifyContent: "flex-start",
    gap: 10,
  },
  sectionIndicator: {
    width: 4,
    height: "100%",
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
  seeAllButton: {
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 13,
    fontFamily: "Poppins-Medium",
    color: Colors.text,
  },
  stickyFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 20,
  },
  startsAtLabel: {
    fontSize: 10,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
    includeFontPadding: false,
  },
  priceText: {
    fontSize: 20,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
    includeFontPadding: false,
  },
  discountText: {
    fontSize: 11,
    fontFamily: Typography.family.semiBold,
    color: "#EF4444",
    includeFontPadding: false,
  },
});
