import TranportationForum from "@/src/components/app/transportation/TransportationForum";
import TransportationHotlines from "@/src/components/app/transportation/TransportationHotlines";
import TransportationImages from "@/src/components/app/transportation/TransportationImages";
import TransportationRoutes from "@/src/components/app/transportation/TransportationRoutes";
import TransportationSchedule from "@/src/components/app/transportation/TransportationSchedule";
import { Colors, Typography } from "@/src/constants/styles";
import { TRANSPORTATION_DETAIL } from "@/src/constants/transportationdetail";
import HStack from "@/src/layouts/HStack";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import VStack from "@/src/layouts/VStack";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function TransportationDetailsPage() {
  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screenContainer}>
        <ScrollView
          style={styles.scrollView}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {/* Image carousel — no sticky, sits at top */}
          <TransportationImages images={TRANSPORTATION_DETAIL.images} />

          {/* Content card overlaps the image by pulling it up */}
          <View style={styles.contentContainer}>
            <VStack gap={8} style={{ alignItems: "flex-start" }}>
              <Text style={styles.title} numberOfLines={2}>
                {TRANSPORTATION_DETAIL.title}
              </Text>

              {/* Tags */}
              <View style={styles.tagsWrapper}>
                <FlatList
                  data={TRANSPORTATION_DETAIL.tags}
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
                    {TRANSPORTATION_DETAIL.location}
                  </Text>
                </Pressable>
              </HStack>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={Colors.textMuted}
              />
            </HStack>

            {/* Hotlines */}
            <TransportationHotlines />

            <View style={styles.divider} />

            {/* routes */}
            <TransportationRoutes />

            <View style={styles.divider} />

            {/* schedule */}
            <TransportationSchedule />

            <View style={styles.divider} />

            <TranportationForum forums={TRANSPORTATION_DETAIL.forums} />
          </View>
        </ScrollView>
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
    marginTop: -20,
    padding: 15,
    paddingTop: 15,
    backgroundColor: "white",
    gap: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
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
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
});
