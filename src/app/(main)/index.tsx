import PlaceList from "@/src/components/app/PlaceList";
import TabNavigation from "@/src/components/app/TabNavigation";

import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import React, { useState } from "react";
import { View } from "react-native";

export default function Index() {
  const [search, setSearch] = useState("");

  return (
    <SafeArea>
      <Screen style={{ gap: 15 }}>
        {/* search bar */}

        {/* tabnavigation */}
        <TabNavigation />

        {/* list */}
        <View style={{ flex: 1, overflow: "hidden" }}>
          <PlaceList />
        </View>
      </Screen>
    </SafeArea>
  );
}
