import PLACE_LIST from "@/src/constants/placeList";
import { Colors } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import React from "react";
import { FlatList, Text, View } from "react-native";
import PlaceCard from "./PlaceCard";

export default function PlaceList() {
  const [filter, setFilter] = React.useState("Recommended");
  // usequery
  // invalidate via filter change and preference change (from onboarding stage)
  // if filter is nearby, get location and pass to query

  return (
    <View
      style={{
        gap: 30,
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        backgroundColor: "white",
        borderColor: "#e5e7eb",
        paddingBottom: 50,
      }}
    >
      <HStack gap={20} justifyContent="flex-start">
        <Text
          style={{
            fontWeight: filter === "Recommended" ? "bold" : "normal",
            color: filter === "Recommended" ? Colors.primary : Colors.textMuted,
            textDecorationLine: filter === "Recommended" ? "underline" : "none",
            fontSize: 16,
          }}
          onPress={() => setFilter("Recommended")}
        >
          Recommended
        </Text>
        <Text
          style={{
            fontWeight: filter === "Nearby" ? "bold" : "normal",
            color: filter === "Nearby" ? Colors.primary : Colors.textMuted,
            textDecorationLine: filter === "Nearby" ? "underline" : "none",
            fontSize: 16,
          }}
          onPress={() => setFilter("Nearby")}
        >
          Nearby
        </Text>
      </HStack>

      <FlatList
        data={PLACE_LIST}
        numColumns={2}
        columnWrapperStyle={{
          gap: 10,
          marginBottom: 10,
          height: 180,
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PlaceCard {...item} />}
      />
    </View>
  );
}
