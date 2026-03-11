import type { ForumPost } from "@/src/constants/forum";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import cutString from "@/src/utils/cutString";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import CustomButton from "../ui/CustomButton";
import ForumMedia from "./ForumMedia";

export default function FormCard({
  author,
  viewers,
  category,
  place,
  content,
  media,
}: Partial<ForumPost>) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 16,
        borderBottomWidth: 0.5,
        borderColor: "#D9D9D980",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <View>
        <Image
          source={{ uri: author?.avatarUrl }}
          style={{ width: 35, height: 35, borderRadius: 24 }}
        />
      </View>

      <View style={{ flex: 1, gap: 14 }}>
        {/* author and category */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              justifyContent: "flex-start",
            }}
          >
            <VStack gap={2}>
              <HStack gap={2}>
                <Text
                  style={{
                    fontSize: 10,
                    color: Colors.text,
                    fontFamily: Typography.family.regular,
                  }}
                >
                  {author?.name}
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={12}
                  color="black"
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    color: Colors.text,
                    fontFamily: Typography.family.regular,
                  }}
                >
                  {category}
                </Text>
              </HStack>

              <Text
                style={{
                  fontSize: 10,
                  color: Colors.text,
                  fontFamily: Typography.family.regular,
                }}
              >
                {place}
              </Text>
            </VStack>
          </View>

          <View style={{ justifyContent: "flex-end" }}>
            <CustomButton
              style={{
                padding: 0,
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
              textStyle={{ fontSize: 10 }}
              title="Join"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* main content */}
        <VStack gap={8}>
          {content && (
            <Text
              style={{
                color: Colors.text,
                fontFamily: Typography.family.regular,
              }}
            >
              {cutString(content!, 100)}
            </Text>
          )}

          {media && media.length > 0 && <ForumMedia media={media} />}
        </VStack>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <HStack gap={2}>
            <CustomButton
              prefixIcon={
                <AntDesign name="like" size={12} color={Colors.textMuted} />
              }
              title="123"
              textStyle={{ fontSize: 10, color: Colors.textMuted }}
              onPress={() => {}}
              gap={4}
              style={{
                padding: 0,
                backgroundColor: Colors.buttonSecondary,
                borderColor: Colors.border,
                borderRadius: 5,
              }}
            />
            <CustomButton
              prefixIcon={
                <AntDesign name="like" size={12} color={Colors.textMuted} />
              }
              style={{
                padding: 0,
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 5,
                backgroundColor: Colors.buttonSecondary,
                borderColor: Colors.border,
              }}
              onPress={() => {}}
            />
            <CustomButton
              prefixIcon={
                <MaterialCommunityIcons
                  name="comment"
                  size={12}
                  color={Colors.textMuted}
                />
              }
              gap={4}
              title="123 Replies"
              textStyle={{ fontSize: 10, color: Colors.textMuted }}
              style={{
                padding: 0,
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 5,
                backgroundColor: Colors.buttonSecondary,
                borderColor: Colors.border,
              }}
              onPress={() => {}}
            />
          </HStack>

          {/* <HStack gap={5}>
            <Ionicons name="eye-outline" size={12} color="black" />
            <Text
              style={{
                fontSize: 10,
                color: Colors.text,
                fontFamily: Typography.family.regular,
              }}
            >
              {viewers}
            </Text>
          </HStack> */}

          <HStack gap={2}>
            <CustomButton
              prefixIcon={
                <MaterialIcons
                  name="bookmark-border"
                  size={12}
                  color={Colors.textMuted}
                />
              }
              onPress={() => {}}
              style={{
                padding: 0,
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 5,
                backgroundColor: Colors.buttonSecondary,
                borderColor: Colors.border,
              }}
            />
            <CustomButton
              prefixIcon={
                <Feather name="share-2" size={12} color={Colors.textMuted} />
              }
              style={{
                padding: 0,
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 5,
                backgroundColor: Colors.buttonSecondary,
                borderColor: Colors.border,
              }}
              onPress={() => {}}
            />
          </HStack>
        </View>
      </View>
    </View>
  );
}
