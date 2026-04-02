import { CUISINE_FILTERS } from "@/src/constants/filterConstants";
import { Typography } from "@/src/constants/styles";
import VStack from "@/src/layouts/VStack";
import { useFilterStore } from "@/src/stores/filterStore";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ActionSheet, {
  ScrollView,
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { CategoryGroup } from "../../app/filter/CategoryGroup";
import FilterFooter from "../../app/filter/FilterFooter";
import { CheckboxGroup } from "../../app/filter/FilterRating"; // Ensure this uses selectedNames prop
import { StarRatingGroup } from "../../app/filter/StarRating";
import HeaderSheet from "../../app/HeaderSheet";

export default function DiningFilterSheet(props: SheetProps) {
  const updateOptions = useFilterStore((state) => state.updateOptions);

  // Local Draft States switched to Name-based strings
  const [draft, setDraft] = useState({
    rating: 0,
    categoryName: null as string | null,
    subnames: [] as string[],
    amenities: [] as string[],
    attributes: {} as Record<string, string[]>, // Key: Attr Name, Value: Option Names
  });

  const handleApply = () => {
    updateOptions("dining", {
      rating: draft.rating,
      type: {
        type: draft.categoryName || "",
        subtypes: draft.subnames,
      },
      amenities: draft.amenities,
      attributes: draft.attributes,
    });
    SheetManager.hide(props.sheetId);
  };

  const handleClear = () => {
    setDraft({
      rating: 0,
      categoryName: null,
      subnames: [],
      amenities: [],
      attributes: {},
    });
  };

  const toggleSubname = (name: string) => {
    setDraft((prev) => ({
      ...prev,
      subnames: prev.subnames.includes(name)
        ? prev.subnames.filter((i) => i !== name)
        : [...prev.subnames, name],
    }));
  };

  const toggleAttribute = (attrName: string, optionName: string) => {
    setDraft((prev) => {
      const current = prev.attributes[attrName] || [];
      const next = current.includes(optionName)
        ? current.filter((n) => n !== optionName)
        : [...current, optionName];
      return { ...prev, attributes: { ...prev.attributes, [attrName]: next } };
    });
  };

  const handleCloseSheet = () => {
    SheetManager.hide(props.sheetId);
  };

  return (
    <ActionSheet id={props.sheetId} useBottomSafeAreaPadding={false}>
      <View style={styles.wrapper}>
        <HeaderSheet title="Filter" handleCloseSheet={handleCloseSheet} />
        <ScrollView contentContainerStyle={{ padding: 20, gap: 24 }}>
          {/* Star Rating */}
          <VStack gap={8} style={{ width: "100%" }}>
            <Text
              style={{ fontFamily: Typography.family.semiBold, fontSize: 18 }}
            >
              Star Rating
            </Text>
            <StarRatingGroup
              options={CUISINE_FILTERS.rating}
              value={draft.rating}
              onChange={(val) => setDraft({ ...draft, rating: val })}
            />
          </VStack>

          {/* Dining Type */}
          <VStack gap={8}>
            <Text
              style={{ fontFamily: Typography.family.semiBold, fontSize: 18 }}
            >
              Dining Type
            </Text>
            <CategoryGroup
              types={CUISINE_FILTERS.types}
              selectedName={draft.categoryName}
              selectedSubnames={draft.subnames}
              onCategoryChange={(name) =>
                setDraft({ ...draft, categoryName: name, subnames: [] })
              }
              onSubnameToggle={toggleSubname}
            />
          </VStack>

          {/* Dynamic Attributes (e.g., Price Range, Meal Time) */}
          {CUISINE_FILTERS.attributes.map((attr) => (
            <CheckboxGroup
              key={attr.name}
              title={attr.name}
              options={attr.options}
              selectedNames={draft.attributes[attr.name] || []}
              onToggle={(optName) => toggleAttribute(attr.name, optName)}
            />
          ))}

          {/* Amenities (e.g., Outdoor Seating, WiFi) */}
          <CheckboxGroup
            title="Amenities"
            options={CUISINE_FILTERS.amenities}
            selectedNames={draft.amenities}
            onToggle={(name) =>
              setDraft((prev) => ({
                ...prev,
                amenities: prev.amenities.includes(name)
                  ? prev.amenities.filter((i) => i !== name)
                  : [...prev.amenities, name],
              }))
            }
          />
        </ScrollView>

        <FilterFooter handleApply={handleApply} handleClear={handleClear} />
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 520, // Adjusted for slightly longer text labels in names
  },
});
