import PLACE_LIST from "@/src/constants/placeList";
import React from "react";
import { FlatList, View } from "react-native";
import Filter from "./Filter";
import PlaceCard from "./PlaceCard";

export default function PlaceList() {
  return (
    <View style={{ gap: 5 }}>
      <Filter />

      <FlatList
        data={PLACE_LIST}
        numColumns={2}
        columnWrapperStyle={{
          gap: 10,
          marginBottom: 10,
          height: 180,
        }}
        contentContainerStyle={{ flexGrow: 1, maxWidth: 600 }}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PlaceCard {...item} />}
      />
    </View>
  );
}
