import CustomButton from "@/src/components/ui/CustomButton";
import {
  AMMENITIES,
  FILTER_DEFAULTS,
  PROPERTY_TYPES,
  STAR_OPTIONS,
} from "@/src/constants/filterConstants";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { useFilterStore } from "@/src/stores/filterStore";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ActionSheet, {
  ScrollView,
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";

export default function AccommodationFilterSheet(props: SheetProps) {
  const updateOptions = useFilterStore((state) => state.updateOptions);
  const resetCategory = useFilterStore((state) => state.resetCategory);
  const [selectedStar, setSelectedStar] = useState<number>(
    FILTER_DEFAULTS.selectedStar,
  );
  const [reviewScore, setReviewScore] = useState<number>(
    FILTER_DEFAULTS.reviewScore,
  );
  const [propertyType, setPropertyType] = useState<string>(
    FILTER_DEFAULTS.propertyType,
  );
  const [propertySubtypes, setPropertySubtypes] = useState<string[]>([]);

  const [ammenities, setAmmenities] = useState<string[]>(
    FILTER_DEFAULTS.amenities,
  );
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const toggleAmenity = (name: string) => {
    setAmmenities((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name],
    );
  };

  const handleSelectStar = (value: number) => {
    setSelectedStar(value);
  };

  const handleClear = () => {
    setSelectedStar(FILTER_DEFAULTS.selectedStar);
    setReviewScore(FILTER_DEFAULTS.reviewScore);
    setPropertyType(FILTER_DEFAULTS.propertyType);
    setPropertySubtypes([]);

    setAmmenities(FILTER_DEFAULTS.amenities);
    resetCategory("accommodation");

    handleCloseSheet();
  };

  const handleApply = () => {
    updateOptions("accommodation", {
      filter: {
        type: { type: propertyType, subtypes: propertySubtypes },
        amenities: ammenities,
      },
    });

    SheetManager.hide(props.sheetId);
  };

  const handleCloseSheet = () => {
    SheetManager.hide(props.sheetId);
  };

  const handleShowAllAmenities = () => {
    setShowAllAmenities((prev) => !prev);
  };

  const handleSelectPropertyType = (type: string) => {
    setPropertyType(type);
    setPropertySubtypes([]); // reset subtype when type changes
  };

  const handleToggleSubtype = (subtype: string) => {
    setPropertySubtypes((prev) =>
      prev.includes(subtype)
        ? prev.filter((item) => item !== subtype)
        : [...prev, subtype],
    );
  };

  return (
    <ActionSheet
      id={props.sheetId}
      gestureEnabled={true}
      defaultOverlayOpacity={0.64}
      useBottomSafeAreaPadding={false}
      containerStyle={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
    >
      <View style={{ height: 500 }}>
        {/* header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
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
                  onPress={() => handleSelectStar(s)}
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
              Property Type
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {PROPERTY_TYPES.map((item) => {
                const active = propertyType === item.type;
                return (
                  <Pressable
                    key={item.type}
                    onPress={() => handleSelectPropertyType(item.type)}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: active ? Colors.primary : Colors.border,
                      backgroundColor: active ? Colors.primary : Colors.surface,
                    }}
                  >
                    <Text
                      style={{
                        color: active ? "#fff" : Colors.text,
                        fontFamily: Typography.family.medium,
                        fontSize: 13,
                      }}
                    >
                      {item.type}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </VStack>

          {/** subtype toggles for the selected property type **/}
          <VStack gap={8}>
            <Text
              style={{ fontFamily: Typography.family.semiBold, fontSize: 18 }}
            >
              {`Subtypes (${propertyType})`}
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {PROPERTY_TYPES.find(
                (p) => p.type === propertyType,
              )?.subtypes.map((subtype) => {
                const selected = propertySubtypes.includes(subtype);
                return (
                  <Pressable
                    key={subtype}
                    onPress={() => handleToggleSubtype(subtype)}
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: selected ? Colors.primary : Colors.border,
                      backgroundColor: selected
                        ? Colors.primary
                        : Colors.surface,
                    }}
                  >
                    <Text
                      style={{
                        color: selected ? "#fff" : Colors.text,
                        fontFamily: Typography.family.medium,
                        fontSize: 12,
                      }}
                    >
                      {subtype}
                    </Text>
                  </Pressable>
                );
              })}
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
            borderWidth: 1,
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
