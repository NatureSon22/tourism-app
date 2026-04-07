import BookmarkForum from "@/src/components/app/bookmark/BookmarkForum";
import BookmarkListing from "@/src/components/app/bookmark/BookmarkListing";
import ProtectedAccessNotice from "@/src/components/app/ProtectedAccessNotice";
import CustomPopupMenu from "@/src/components/ui/CustomPopupMenu";
import FORUMS_OPTIONS, {
  ForumsOptionValue,
} from "@/src/constants/forumsFilter";
import LISTING_OPTIONS, {
  type ListingOptionValue,
} from "@/src/constants/listingsFilter";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import useAuthStore from "@/src/stores/authStore";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Bookmark() {
  const [section, setSection] = useState<"listing" | "forum">("listing");
  const [selectedFilter, setSelectedFilter] = useState<
    ListingOptionValue | ForumsOptionValue
  >("accommodation");
  const user = useAuthStore((state) => state.user);

  const handleSetSection = (newSection: "listing" | "forum") => {
    setSection(newSection);
    setSelectedFilter(
      newSection === "listing"
        ? "accommodation"
        : "tourist_spots_and_attractions",
    );
  };

  if (!user) {
    return (
      <SafeArea edges={["top"]}>
        <ProtectedAccessNotice
          headline="Account access requires sign-in"
          description="Sign in to manage your bookmarks of listing and forum."
          actionLabel="Go to Sign In"
        />
      </SafeArea>
    );
  }

  return (
    <SafeArea edges={["top"]}>
      <Screen style={styles.screen}>
        {/* header */}
        <HStack justifyContent="space-between" alignItems="center" gap={20}>
          <HStack gap={5}>
            {/* Listing Tab */}
            <Pressable
              onPress={() => handleSetSection("listing")}
              style={[
                styles.tabButton,
                section === "listing" ? styles.tabActive : styles.tabInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      section === "listing"
                        ? Colors.textOnPrimary
                        : Colors.textHighlight,
                  },
                ]}
              >
                Listing
              </Text>
            </Pressable>

            {/* Forum Tab */}
            <Pressable
              onPress={() => handleSetSection("forum")}
              style={[
                styles.tabButton,
                section === "forum" ? styles.tabActive : styles.tabInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      section === "forum"
                        ? Colors.textOnPrimary
                        : Colors.textHighlight,
                  },
                ]}
              >
                Forum
              </Text>
            </Pressable>
          </HStack>

          {/* filter */}
          <CustomPopupMenu
            options={section === "listing" ? LISTING_OPTIONS : FORUMS_OPTIONS}
            selectedValue={selectedFilter}
            onSelect={setSelectedFilter}
            menuStyle={[
              styles.menuBase,
              { width: section === "listing" ? 220 : 255 },
            ]}
            triggerButton={
              <View style={styles.filterButton}>
                <HStack gap={4}>
                  <FontAwesome5
                    name="filter"
                    size={11}
                    color={Colors.textOnPrimary}
                  />
                  <Text style={styles.filterText}>Filter</Text>
                </HStack>
              </View>
            }
          />
        </HStack>

        {/* body */}
        {section === "listing" ? <BookmarkListing /> : <BookmarkForum />}
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: 20,
    paddingBottom: 0,
  },
  tabButton: {
    paddingHorizontal: 18,
    paddingVertical: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabInactive: {
    backgroundColor: Colors.surface,
  },
  tabText: {
    fontFamily: Typography.family.regular,
    fontSize: 10,
  },
  filterButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  filterText: {
    fontFamily: Typography.family.regular,
    fontSize: 10,
    color: Colors.textOnPrimary,
  },
  menuBase: {
    padding: 10,
  },
});
