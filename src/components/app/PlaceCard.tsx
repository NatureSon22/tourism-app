import type { PlaceList } from "@/src/constants/placeList";
import { Colors, Typography } from "@/src/constants/styles";
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
        {/* for online source use uri */}
        <Image
          source={imageUrl}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={400}
          style={{ width: "100%", height: "100%" }}
        />

        <View
          style={{
            position: "absolute",
            bottom: 3,
            left: 3,
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
            style={{
              color: "white",
              fontSize: 11,
              fontFamily: Typography.family.regular,
            }}
          >
            {name}
          </Text>
        </View>
      </View>

      <View style={{ gap: 5, padding: 8 }}>
        <Text
          numberOfLines={1}
          style={{ fontSize: 11, fontFamily: Typography.family.medium }}
        >
          {location}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
          <FontAwesome6 name="star" size={10} color="#E28F0B" solid />
          <Text
            style={{
              marginLeft: 4,
              fontSize: 10,
              fontFamily: Typography.family.medium,
              color: "#E28F0B",
            }}
          >
            {rating}
          </Text>
          <Text
            style={{
              marginLeft: 4,
              fontSize: 10,
              fontFamily: Typography.family.medium,
              color: Colors.textDimmed,
            }}
          >
            ({reviews})
          </Text>
        </View>

        <Text
          style={{
            fontSize: 12,
            fontFamily: Typography.family.medium,
            color: Colors.textMuted,
          }}
        >
          From {formatCurrency(price)}
        </Text>
      </View>
    </View>
  );
}
