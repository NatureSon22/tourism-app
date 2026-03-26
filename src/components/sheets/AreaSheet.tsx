import { Colors, Typography } from "@/src/constants/styles";
import VStack from "@/src/layouts/VStack";
import { getAllRegions } from "@aivangogh/ph-address";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import ActionSheet, {
  ScrollView,
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import FooterSheet from "../app/FooterSheet";
import HeaderSheet from "../app/HeaderSheet";
import RegionTab from "../app/LocationSheet";

export default function AreaSheet(props: SheetProps) {
  const regions = useMemo(() => getAllRegions(), []);

  const handleCloseSheet = () => {
    SheetManager.hide(props.sheetId);
  };

  return (
    <ActionSheet
      id={props.sheetId}
      gestureEnabled={false} // disable drag-to-dismiss
      closeOnTouchBackdrop={true} // tapping backdrop still closes it
      defaultOverlayOpacity={0.64}
      useBottomSafeAreaPadding={false}
      containerStyle={styles.sheetContainer}
    >
      <View style={styles.wrapper}>
        <HeaderSheet title="Area" handleCloseSheet={handleCloseSheet} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <VStack gap={20}>
            <Text style={styles.sectionTitle}>Location</Text>

            {regions.map((region) => (
              <RegionTab key={region.psgcCode} region={region} />
            ))}
          </VStack>
        </ScrollView>

        <FooterSheet handleApply={() => {}} handleClear={() => {}} />
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
    height: 420,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 20,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 18,
  },
  sectionTitle: {
    fontFamily: Typography.family.semiBold,
    fontSize: 19,
    color: Colors.text,
  },

  listItem: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    backgroundColor: Colors.surface,
  },
  listItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  listItemPressed: {
    backgroundColor: "#F3F4F6",
  },
  listItemText: {
    fontFamily: Typography.family.regular,
    fontSize: 13,
    color: Colors.text,
  },
});
