import { ACCOMMODATION_FILTERS } from "@/src/constants/filterConstants";
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
import { CheckboxGroup } from "../../app/filter/FilterRating"; // Updated to use selectedNames
import { StarRatingGroup } from "../../app/filter/StarRating";
import HeaderSheet from "../../app/HeaderSheet";

export default function AccommodationFilterSheet(props: SheetProps) {
  const state = useFilterStore(
    (state) => state.categories.accommodation.options,
  );
  const updateOptions = useFilterStore((state) => state.updateOptions);

  // Local Draft States - Now using strings for identification
  const [draft, setDraft] = useState({
    rating: state.rating || 0,
    categoryName: state.type.type || (null as string | null),
    subnames: state.type.subtypes || ([] as string[]),
    amenities: state.amenities || ([] as string[]),
    attributes: state.attributes || ({} as Record<string, string[]>), // Keyed by attribute name, values are option names
  });

  const handleApply = () => {
    updateOptions("accommodation", {
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
        ? prev.subnames.filter((n) => n !== name)
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
              options={ACCOMMODATION_FILTERS.rating}
              value={draft.rating}
              onChange={(val) => setDraft({ ...draft, rating: val })}
            />
          </VStack>

          {/* Property Type (Categories & Subtypes) */}
          <VStack gap={8}>
            <Text
              style={{ fontFamily: Typography.family.semiBold, fontSize: 18 }}
            >
              Property Type
            </Text>
            <CategoryGroup
              types={ACCOMMODATION_FILTERS.types}
              selectedName={draft.categoryName}
              selectedSubnames={draft.subnames}
              onCategoryChange={(name) =>
                setDraft({ ...draft, categoryName: name, subnames: [] })
              }
              onSubnameToggle={toggleSubname}
            />
          </VStack>

          {/* Dynamic Attributes (e.g., Duration, Difficulty) */}
          {ACCOMMODATION_FILTERS.attributes.map((attr) => (
            <CheckboxGroup
              key={attr.name} // Key by name
              title={attr.name}
              options={attr.options}
              selectedNames={draft.attributes[attr.name] || []}
              onToggle={(optName) => toggleAttribute(attr.name, optName)}
            />
          ))}

          {/* Amenities */}
          <CheckboxGroup
            title="Amenities"
            options={ACCOMMODATION_FILTERS.amenities}
            selectedNames={draft.amenities}
            onToggle={(name) =>
              setDraft({
                ...draft,
                amenities: draft.amenities.includes(name)
                  ? draft.amenities.filter((n) => n !== name)
                  : [...draft.amenities, name],
              })
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
    height: 550,
  },
});
