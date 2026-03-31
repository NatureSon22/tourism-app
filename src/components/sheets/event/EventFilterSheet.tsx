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

  // Local Draft States
  const [draft, setDraft] = useState({
    rating: 0,
    categoryId: null as number | null,
    subtypes: [] as number[],
    amenities: [] as number[],
    attributes: {} as Record<number, number[]>,
  });

  const handleApply = () => {
    updateOptions("event", {
      type: {
        type: draft.categoryId?.toString() || "",
        subtypes: draft.subtypes.map(String),
      },
      amenities: draft.amenities.map(String),
      attributes: Object.fromEntries(
        Object.entries(draft.attributes).map(([k, v]) => [k, v.map(String)]),
      ),
    });
    SheetManager.hide(props.sheetId);
  };

  const handleClear = () => {
    setDraft({
      rating: 0,
      categoryId: null,
      subtypes: [],
      amenities: [],
      attributes: {},
    });
  };

  const toggleSubtype = (id: number) => {
    setDraft((prev) => ({
      ...prev,
      subtypes: prev.subtypes.includes(id)
        ? prev.subtypes.filter((i) => i !== id)
        : [...prev.subtypes, id],
    }));
  };

  const toggleAttribute = (headerId: number, optionId: number) => {
    setDraft((prev) => {
      const current = prev.attributes[headerId] || [];
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, attributes: { ...prev.attributes, [headerId]: next } };
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
              Event Type
            </Text>
            <CategoryGroup
              types={EVENT_FILTERS.types}
              selectedId={draft.categoryId}
              selectedSubtypes={draft.subtypes}
              onCategoryChange={(id) =>
                setDraft({ ...draft, categoryId: id, subtypes: [] })
              }
              onSubtypeToggle={toggleSubtype}
            />
          </VStack>

          {/* Dynamic Attributes */}
          {EVENT_FILTERS.attributes.map((attr) => (
            <CheckboxGroup
              key={attr.id}
              title={attr.name}
              options={attr.options}
              selectedIds={draft.attributes[attr.id] || []}
              onToggle={(optId) => toggleAttribute(attr.id, optId)}
            />
          ))}

          <CheckboxGroup
            title="Amenities"
            options={EVENT_FILTERS.amenities}
            selectedIds={draft.amenities}
            onToggle={(id) =>
              setDraft({
                ...draft,
                amenities: draft.amenities.includes(id)
                  ? draft.amenities.filter((i) => i !== id)
                  : [...draft.amenities, id],
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
  sheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "white",
  },
  wrapper: {
    height: 500,
  },
});
