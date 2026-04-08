import ForumList from "@/src/components/app/forum/ForumList";
import CustomButton from "@/src/components/ui/CustomButton";
import { Colors, Typography } from "@/src/constants/styles";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export default function Forum() {
  const handlePressFilter = () => {
    SheetManager.show("forum-filter-sheet");
  };
  const router = useRouter();

  const handlePressCreate = () => {
    router.push("/forum/experience");
  };

  return (
    <SafeArea edges={["top"]}>
      <Screen style={{ paddingBottom: 0, position: "relative" }}>
        <View
          style={{
            alignItems: "flex-end",

            marginBottom: 12,
          }}
        >
          <CustomButton
            title="Filters"
            prefixIcon={
              <MaterialCommunityIcons name="filter" size={10} color="white" />
            }
            textStyle={{ fontSize: 10 }}
            style={{ paddingHorizontal: 12, paddingVertical: 6 }}
            onPress={handlePressFilter}
          />
        </View>

        <ForumList />

        <CustomButton
          title=""
          prefixIcon={<FontAwesome6 name="add" size={18} color="white" />}
          style={styles.buttonStyle}
          onPress={handlePressCreate}
        />
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
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
