import BookmarkForum from "@/src/components/app/BookmarkForum";
import BookmarkListing from "@/src/components/app/BookmarkListing";

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
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function Bookmark() {
  const [section, setSection] = useState<"listing" | "forum">("forum");
  const [selectedFilter, setSelectedFilter] = useState<
    ListingOptionValue | ForumsOptionValue
  >("accommodation");

  const handleSetSection = (section: "listing" | "forum") => {
    setSection(section);
    setSelectedFilter(
      section === "listing" ? "accommodation" : "tourist_spots_and_attractions",
    );
  };

  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={{ gap: 20, paddingBottom: 10 }}>
        {/* header */}
        <HStack justifyContent="space-between" alignItems="center" gap={20}>
          <HStack gap={5}>
            <Pressable
              onPress={() => handleSetSection("listing")}
              style={{
                backgroundColor:
                  section === "listing" ? Colors.primary : Colors.surface,
                paddingHorizontal: 18,
                paddingVertical: 4,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: Colors.primary,
              }}
            >
              <Text
                style={{
                  fontFamily: Typography.family.regular,
                  fontSize: 10,
                  color:
                    section === "listing"
                      ? Colors.textOnPrimary
                      : Colors.textHighlight,
                }}
              >
                Listing
              </Text>
            </Pressable>

            <Pressable
              onPress={() => handleSetSection("forum")}
              style={{
                backgroundColor:
                  section === "forum" ? Colors.primary : Colors.surface,
                paddingHorizontal: 18,
                paddingVertical: 4,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: Colors.primary,
              }}
            >
              <Text
                style={{
                  fontFamily: Typography.family.regular,
                  fontSize: 10,
                  color:
                    section === "forum"
                      ? Colors.textOnPrimary
                      : Colors.textHighlight,
                }}
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
            // TODO: make the width dynamic based on the longest option label
            menuStyle={{
              width: section === "listing" ? 220 : 255,
              padding: 10,
            }}
            triggerButton={
              <View
                style={{
                  backgroundColor: Colors.primary,
                  paddingHorizontal: 18,
                  paddingVertical: 4,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: Colors.primary,
                }}
              >
                <HStack>
                  <FontAwesome5
                    name="filter"
                    size={11}
                    color={Colors.textOnPrimary}
                  />
                  <Text
                    style={{
                      fontFamily: Typography.family.regular,
                      fontSize: 10,
                      color: Colors.textOnPrimary,
                    }}
                  >
                    Filter
                  </Text>
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
