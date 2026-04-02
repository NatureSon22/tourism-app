import { SERVICE_FILTERS } from "@/src/constants/filterConstants";
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

export default function ServiceFilterSheet(props: SheetProps) {
  const updateOptions = useFilterStore((state) => state.updateOptions);

  // Local Draft States - Now using Names as identifiers
  const [draft, setDraft] = useState({
    categoryName: null as string | null,
    subnames: [] as string[],
    attributes: {} as Record<string, string[]>, // Key: Attribute Name, Value: Option Names
  });

  const handleApply = () => {
    updateOptions("services", {
      type: {
        type: draft.categoryName || "",
        subtypes: draft.subnames,
      },
      attributes: draft.attributes,
    });
    SheetManager.hide(props.sheetId);
  };

  const handleClear = () => {
    setDraft({
      categoryName: null,
      subnames: [],
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
        attributes: { ...prev.attributes, [attrName]: next } 
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
          
          {/* Service Type Section */}
          <VStack gap={8}>
            <Text style={{ fontFamily: Typography.family.semiBold, fontSize: 18 }}>
              Service Type
            </Text>
            <CategoryGroup
              types={SERVICE_FILTERS.types}
              selectedName={draft.categoryName}
              selectedSubnames={draft.subnames}
              onCategoryChange={(name) =>
                setDraft({ ...draft, categoryName: name, subnames: [] })
              }
              onSubnameToggle={toggleSubname}
            />
          </VStack>

          {/* Dynamic Attributes Section */}
          {SERVICE_FILTERS.attributes.map((attr) => (
            <CheckboxGroup
              key={attr.name}
              title={attr.name}
              options={attr.options}
              selectedNames={draft.attributes[attr.name] || []}
              onToggle={(optName) => toggleAttribute(attr.name, optName)}
            />
          ))}
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