import PlaceList from "@/src/components/app/PlaceList";
import TabNavigation from "@/src/components/app/TabNavigation";
import CustomTextInput from "@/src/components/ui/CustomTextInput";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import { Colors } from "@/src/constants/styles";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import React, { useState } from "react";
import { View } from "react-native";

export default function Index() {
  const [search, setSearch] = useState("");

  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={{ gap: 15, padding: 0 }}>
        {/* search bar */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <CustomTextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search places..."
            suffixIcon={
              <EvilIcons name="search" size={18} color={Colors.textMuted} />
            }
            inputStyle={{ fontSize: 12 }}
            containerStyle={{ height: 45 }}
          />
        </View>

        {/* tabnavigation */}
        <View style={{ paddingHorizontal: 16 }}>
          <TabNavigation />
        </View>

        {/* list */}
        <View style={{ flex: 1, overflow: "hidden" }}>
          <PlaceList />
        </View>
      </Screen>
    </SafeArea>
  );
}
