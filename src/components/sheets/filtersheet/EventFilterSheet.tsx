import { EVENT_FILTERS } from "@/src/constants/filterConstants";
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
import { CheckboxGroup } from "../../app/filter/FilterRating";
import HeaderSheet from "../../app/HeaderSheet";

export default function EventFilterSheet(props: SheetProps) {
  const updateOptions = useFilterStore((state) => state.updateOptions);

  // Local Draft States - Now using Names instead of IDs
  const [draft, setDraft] = useState({
    categoryName: null as string | null,
    subnames: [] as string[],
    amenities: [] as string[],
    attributes: {} as Record<string, string[]>,
  });

  const handleApply = () => {
    updateOptions("event", {
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
      return {
        ...prev,
        attributes: { ...prev.attributes, [attrName]: next },
      };
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
          {/* Event Type / Category */}
          <VStack gap={8}>
            <Text
              style={{ fontFamily: Typography.family.semiBold, fontSize: 18 }}
            >
              Event Type
            </Text>
            <CategoryGroup
              types={EVENT_FILTERS.types}
              selectedName={draft.categoryName}
              selectedSubnames={draft.subnames}
              onCategoryChange={(name) =>
                setDraft({ ...draft, categoryName: name, subnames: [] })
              }
              onSubnameToggle={toggleSubname}
            />
          </VStack>

          {/* Dynamic Attributes (e.g., Event Status, Audience) */}
          {EVENT_FILTERS.attributes.map((attr) => (
            <CheckboxGroup
              key={attr.name}
              title={attr.name}
              options={attr.options}
              selectedNames={draft.attributes[attr.name] || []}
              onToggle={(optName) => toggleAttribute(attr.name, optName)}
            />
          ))}

          {/* Amenities / Features */}
          <CheckboxGroup
            title="Amenities"
            options={EVENT_FILTERS.amenities}
            selectedNames={draft.amenities}
            onToggle={(name) =>
              setDraft((prev) => ({
                ...prev,
                amenities: prev.amenities.includes(name)
                  ? prev.amenities.filter((n) => n !== name)
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
    height: 500,
  },
});
