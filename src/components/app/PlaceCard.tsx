import type { PlaceList } from "@/src/constants/placeList";
import formatCurrency from "@/src/utils/currency";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function PlaceCard({
  imageUrl,
  location,
  name,
  price,
  rating,
  reviews,
}: PlaceList) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        overflow: "hidden",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <View
        style={{
          width: "100%",
          flex: 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={400}
          style={{ width: "100%", height: "100%" }}
        />

        <View
          style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 6,
            paddingHorizontal: 8,
            paddingVertical: 4,
            maxWidth: "90%",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <FontAwesome6 name="location-dot" size={10} color="white" />
          <Text
            numberOfLines={1}
            style={{ color: "white", fontWeight: "700", fontSize: 12 }}
          >
            {name}
          </Text>
        </View>
      </View>

      <View style={{ gap: 5, padding: 8 }}>
        <Text numberOfLines={1} style={{ fontSize: 12, fontWeight: "600" }}>
          {location}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
          <FontAwesome6 name="star" size={10} color="#FBBF24" solid />
          <Text
            style={{
              marginLeft: 4,
              fontSize: 10,
              fontWeight: "700",
              color: "#FBBF24",
            }}
          >
            {rating}
          </Text>
          <Text
            style={{
              marginLeft: 4,
              fontSize: 10,
              fontWeight: "700",
              color: "#374151",
            }}
          >
            ({reviews})
          </Text>
        </View>

        <Text style={{ fontSize: 12 }}>From {formatCurrency(price)}</Text>
      </View>
    </View>
  );
}
