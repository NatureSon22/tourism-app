import { ACTIVITY_FILTERS } from "@/src/constants/filterConstants";
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
import DurationFilter from "../../app/filter/Duration";
import FilterFooter from "../../app/filter/FilterFooter";
import { CheckboxGroup } from "../../app/filter/FilterRating";
import { StarRatingGroup } from "../../app/filter/StarRating";
import HeaderSheet from "../../app/HeaderSheet";

export default function ActivityFilterSheet(props: SheetProps) {
  const updateOptions = useFilterStore((state) => state.updateOptions);

  // Local Draft States: Names for filters, but keeping original Duration logic
  const [draft, setDraft] = useState({
    rating: 0,
    categoryName: null as string | null,
    subnames: [] as string[],
    amenities: [] as string[],
    attributes: {} as Record<string, string[]>,
    duration: { min: 0, max: 0 }, // Kept as numbers per your request
  });

  const handleApply = () => {
    updateOptions("activity", {
      type: {
        type: draft.categoryName || "",
        subtypes: draft.subnames,
      },
      amenities: draft.amenities,
      attributes: draft.attributes,
      duration: `${draft.duration.min}-${draft.duration.max}`,
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
      duration: { min: 0, max: 0 },
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
          <VStack gap={8}>
            <Text
              style={{ fontFamily: Typography.family.semiBold, fontSize: 18 }}
            >
              Star Rating
            </Text>
            <StarRatingGroup
              options={ACTIVITY_FILTERS.rating}
              value={draft.rating}
              onChange={(val) => setDraft({ ...draft, rating: val })}
            />
          </VStack>

          <VStack gap={8}>
            <Text
              style={{ fontFamily: Typography.family.semiBold, fontSize: 18 }}
            >
              Activity Type
            </Text>
            <CategoryGroup
              types={ACTIVITY_FILTERS.types}
              selectedName={draft.categoryName}
              selectedSubnames={draft.subnames}
              onCategoryChange={(name) =>
                setDraft({ ...draft, categoryName: name, subnames: [] })
              }
              onSubnameToggle={toggleSubname}
            />
          </VStack>

          {/* Duration Filter: Original Props/Logic Maintained */}
          <DurationFilter
            durations={ACTIVITY_FILTERS.duration}
            values={draft.duration}
            onChange={(min, max) =>
              setDraft({ ...draft, duration: { min, max } })
            }
          />

          {/* Attributes: Switched to Name mapping */}
          {ACTIVITY_FILTERS.attributes.map((attr) => (
            <CheckboxGroup
              key={attr.name}
              title={attr.name}
              options={attr.options}
              selectedNames={draft.attributes[attr.name] || []}
              onToggle={(optName) => toggleAttribute(attr.name, optName)}
            />
          ))}

          {/* Amenities: Switched to Name mapping */}
          <CheckboxGroup
            title="Amenities"
            options={ACTIVITY_FILTERS.amenities}
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
    height: 600,
  },
});
