import { CustomRadioGroup } from "@/src/components/ui/CustomRadioGroup";
import { Colors, Typography } from "@/src/constants/styles";
import VStack from "@/src/layouts/VStack";
import { getAllRegions } from "@aivangogh/ph-address";
import Feather from "@expo/vector-icons/Feather";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";

const AREAS = [
  { label: "Baguio", value: "baguio" },
  { label: "Tagaytay", value: "tagaytay" },
  { label: "Manila", value: "manila" },
  { label: "Cebu", value: "cebu" },
];

export default function AreaSheet(props: SheetProps) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const regions = useMemo(() => getAllRegions(), []);

  const handleSelectArea = (value: string) => {
    setSelectedArea((prev) => (prev === value ? null : value));
  };

  const handleCloseSheet = () => {
    SheetManager.hide(props.sheetId);
  };

  return (
    <ActionSheet
      id={props.sheetId}
      gestureEnabled={true}
      defaultOverlayOpacity={0.5}
      containerStyle={styles.sheetContainer}
    >
      <View style={styles.wrapper}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={handleCloseSheet} hitSlop={15}>
            <Feather name="x" size={24} color={Colors.text} />
          </Pressable>

          <Text style={styles.headerTitle}>Area</Text>

          {/* Spacer for centering title */}
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <VStack gap={20}>
            <Text style={styles.sectionTitle}>Location</Text>

            <View style={styles.radioWrapper}>
              <CustomRadioGroup
                selectedValue={selectedArea}
                onSelect={handleSelectArea}
                options={AREAS}
              />
            </View>
          </VStack>
        </View>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: Colors.surface,
  },
  wrapper: {
    gap: 5,
    height: 350,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
  },
  headerTitle: {
    fontFamily: Typography.family.medium,
    fontSize: 15,
    color: Colors.text,
    textAlign: "center",
  },
  headerSpacer: {
    width: 24,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 35,
  },
  sectionTitle: {
    fontFamily: Typography.family.semiBold,
    fontSize: 19,
    color: Colors.text,
  },
  radioWrapper: {
    paddingLeft: 10,
  },
});
