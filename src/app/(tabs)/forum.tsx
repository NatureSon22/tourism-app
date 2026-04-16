import ForumList from "@/src/components/app/forum/ForumList";
import ShareExperienceHeader from "@/src/components/app/forum/ShareExperienceHeader";
import CustomButton from "@/src/components/ui/CustomButton";
import { Colors, Typography } from "@/src/constants/styles";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export default function Forum() {
  const handlePressFilter = () => {
    SheetManager.show("forum-filter-sheet");
  };

  return (
    <SafeArea edges={["top"]}>
      <Tabs.Screen
        options={{
          sceneStyle: styles.sceneStyle,
        }}
      />

      <Screen style={styles.screen}>
        <ShareExperienceHeader />

        <View style={styles.contentWrapper}>
          <CustomButton
            title="Filters"
            variant="outlined"
            prefixIcon={
              <MaterialCommunityIcons
                name="filter"
                size={10}
                color={Colors.primary}
              />
            }
            textStyle={styles.filterButtonText}
            style={styles.filterButton}
            onPress={handlePressFilter}
          />

          <ForumList />
        </View>

        {/* <CustomButton
          title=""
          prefixIcon={<FontAwesome6 name="add" size={18} color="white" />}
          style={styles.buttonStyle}
          onPress={handlePressCreate}
        /> */}
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  sceneStyle: {
    backgroundColor: Colors.background,
  },
  screen: {
    padding: 0,
    position: "relative",
  },
  contentWrapper: {
    paddingHorizontal: 12,
    paddingTop: 12,
    flex: 1,
    gap: 6,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-end",
    borderRadius: 5,
    borderWidth: 0,
    backgroundColor: "#e0e7ff",
  },
  filterButtonText: {
    fontSize: 10,
  },
  headerButton: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  headerButtonText: {
    color: Colors.primary,
    fontFamily: Typography.family.medium,
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 20,
  },
  buttonStyle: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
