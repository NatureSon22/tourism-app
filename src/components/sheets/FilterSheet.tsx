import CustomButton from "@/src/components/ui/CustomButton";
import { CustomRadioGroup } from "@/src/components/ui/CustomRadioGroup";
import {
  ACCOMODATION_TYPES,
  AMMENITIES,
  FILTER_DEFAULTS,
  PROPERTY_TYPES,
  REVIEW_OPTIONS,
  STAR_OPTIONS,
} from "@/src/constants/filterConstants";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { ScrollView } from "react-native-gesture-handler";

// TODO: create store to persist the state

export default function FilterSheet(props: SheetProps) {
  const [selectedStar, setSelectedStar] = useState<number>(
    FILTER_DEFAULTS.selectedStar,
  );
  const [reviewScore, setReviewScore] = useState<number>(
    FILTER_DEFAULTS.reviewScore,
  );
  const [propertyType, setPropertyType] = useState<string>(
    FILTER_DEFAULTS.propertyType,
  );
  const [accomodationType, setAccomodationType] = useState<string[]>(
    FILTER_DEFAULTS.accommodationType,
  );
  const [ammenities, setAmmenities] = useState<string[]>(
    FILTER_DEFAULTS.amenities,
  );
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const toggleAmenity = (name: string) => {
    setAmmenities((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name],
    );
  };

  const toggleAccomodation = (name: string) => {
    setAccomodationType((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name],
    );
  };

  const handleClear = () => {
    setSelectedStar(FILTER_DEFAULTS.selectedStar);
    setReviewScore(FILTER_DEFAULTS.reviewScore);
    setPropertyType(FILTER_DEFAULTS.propertyType);
    setAccomodationType(FILTER_DEFAULTS.accommodationType);
    setAmmenities(FILTER_DEFAULTS.amenities);
  };

  const handleApply = () => {
    // You can emit the selected filters via SheetManager, event emitter, or callback
    SheetManager.hide(props.sheetId);
    // Example: SheetManager.resolve might be used to pass data back — depending on sheet lib support
    // SheetManager.resolve(props.sheetId, { selectedStar, reviewScore, propertyType, accomodationType, ammenities });
  };

  const handleCloseSheet = () => {
    SheetManager.hide(props.sheetId);
  };

  const handleShowAllAmenities = () => {
    setShowAllAmenities((prev) => !prev);
  };

  return (
    <ActionSheet
      id={props.sheetId}
      gestureEnabled={true}
      defaultOverlayOpacity={0.64}
      useBottomSafeAreaPadding={false}
      containerStyle={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
    >
      <View style={{ height: 600 }}>
        {/* header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 10,
            paddingHorizontal: 35,
            borderBottomWidth: 1,
            borderColor: "#D9D9D9",
          }}
        >
          <Pressable onPress={handleCloseSheet}>
            <Feather name="x" size={24} color="black" />
          </Pressable>

          <Text
            style={{
              fontFamily: Typography.family.medium,
              fontSize: 15,
              marginHorizontal: "auto",
            }}
          >
            Filter
          </Text>
        </View>

        {/* body */}
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 20,
            paddingHorizontal: 35,
            gap: 18,
          }}
          // allow nested scrolling so the ScrollView takes gestures instead of the sheet
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
        >
          <VStack gap={8} style={{ width: "100%" }}>
            <Text
              style={{ fontFamily: Typography.family.semiBold, fontSize: 18 }}
            >
              Star Rating
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              {STAR_OPTIONS.map((s) => (
                <Pressable
                  key={s}
                  onPress={() => setSelectedStar(s)}
                  style={{
                    padding: 10,
                    paddingVertical: 7,
                    borderRadius: 8,
                    backgroundColor:
                      selectedStar === s ? Colors.primary : Colors.surface,
                    borderWidth: 1,
                    borderColor: Colors.border,
                    flex: 1,
                  }}
                >
                  <HStack gap={6} alignItems="center" justifyContent="center">
                    <Text
                      style={{
                        color: selectedStar === s ? "#fff" : Colors.text,
                        fontFamily: Typography.family.medium,
                        includeFontPadding: false,
                        textAlignVertical: "center",
                      }}
                    >
                      {s}
                    </Text>

                    <Ionicons
                      name="star"
                      size={14}
                      color={selectedStar === s ? "#fff" : "#FBBF24"}
                    />
                  </HStack>
                </Pressable>
              ))}
            </View>
          </VStack>

          <VStack gap={8}>
            <Text
              style={{ fontFamily: Typography.family.semiBold, fontSize: 18 }}
            >
              Review Score
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {REVIEW_OPTIONS.map((r) => (
                <Pressable
                  key={r}
                  onPress={() => setReviewScore(r)}
                  style={{
                    width: "48%",
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor:
                      reviewScore === r ? Colors.primary : Colors.surface,
                    borderWidth: 1,
                    borderColor:
                      reviewScore === r ? Colors.primary : Colors.border, // Highlight border if selected
                  }}
                >
                  <VStack
                    gap={1}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    {/* Top Row: The Score */}
                    <Text
                      style={{
                        color: reviewScore === r ? "#fff" : Colors.text,
                        fontFamily: Typography.family.semiBold,
                        fontSize: 11,
                      }}
                    >
                      {r}+
                    </Text>

                    {/* Bottom Row: The Label */}
                    <Text
                      style={{
                        color: reviewScore === r ? "#fff" : Colors.textMuted, // Use a lighter color for label when not selected
                        fontSize: 11,
                        fontFamily: Typography.family.medium,
                      }}
                    >
                      {r >= 4 ? "Excellent" : r >= 3.5 ? "Good" : "Comfort"}
                    </Text>
                  </VStack>
                </Pressable>
              ))}
            </View>
          </VStack>

          <VStack gap={8}>
            <Text
              style={{ fontFamily: Typography.family.semiBold, fontSize: 18 }}
            >
              Property Type
            </Text>

            <CustomRadioGroup
              selectedValue={propertyType}
              onSelect={(v) => setPropertyType(v)}
              options={PROPERTY_TYPES}
            />
          </VStack>

          <VStack gap={8}>
            <Text
              style={{ fontFamily: Typography.family.semiBold, fontSize: 18 }}
            >
              Accommodation Type
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {ACCOMODATION_TYPES.map((a) => (
                <View
                  key={a}
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    paddingVertical: 6,
                  }}
                >
                  <Checkbox
                    value={accomodationType.includes(a)}
                    color={
                      accomodationType.includes(a)
                        ? Colors.primary
                        : Colors.border
                    }
                    onValueChange={() => toggleAccomodation(a)}
                    style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                  />

                  <Text
                    style={{
                      color: Colors.text,
                      fontFamily: Typography.family.regular,
                    }}
                  >
                    {a}
                  </Text>
                </View>
              ))}
            </View>
          </VStack>

          <VStack gap={8}>
            <Text
              style={{ fontFamily: Typography.family.semiBold, fontSize: 18 }}
            >
              Amenities
            </Text>

            <View style={{ gap: 10 }}>
              {AMMENITIES.slice(
                0,
                showAllAmenities ? AMMENITIES.length : 5,
              ).map((m) => (
                <View
                  key={m}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Checkbox
                    value={ammenities.includes(m)}
                    color={
                      ammenities.includes(m) ? Colors.primary : Colors.border
                    }
                    style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                    onValueChange={() => toggleAmenity(m)}
                  />
                  <Text style={{ fontFamily: Typography.family.regular }}>
                    {m}
                  </Text>
                </View>
              ))}

              <Pressable
                style={{ marginTop: 8 }}
                onPress={handleShowAllAmenities}
              >
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 13,
                    textDecorationLine: "underline",
                  }}
                >
                  {showAllAmenities ? "Hide" : "See all"}
                </Text>
              </Pressable>
            </View>
          </VStack>
        </ScrollView>

        {/* footer */}
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderTopWidth: 1,
            borderColor: Colors.border,
          }}
        >
          <HStack gap={12} justifyContent="space-between">
            <Pressable
              onPress={handleClear}
              style={{ paddingVertical: 17, paddingHorizontal: 20 }}
            >
              <Text
                style={{
                  color: Colors.textMuted,
                  fontFamily: Typography.family.medium,
                  textDecorationLine: "underline",
                }}
              >
                Clear
              </Text>
            </Pressable>

            <CustomButton
              title="Show Results"
              style={{ paddingVertical: 9, paddingHorizontal: 20 }}
              textStyle={{
                fontSize: 13,
              }}
              onPress={handleApply}
            />
          </HStack>
        </View>
      </View>
    </ActionSheet>
  );
}
