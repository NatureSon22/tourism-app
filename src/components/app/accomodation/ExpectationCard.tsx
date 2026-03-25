import { Expectation } from "@/src/constants/accommodationdetail";
import { Colors, Typography } from "@/src/constants/styles";
import VStack from "@/src/layouts/VStack";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ExpectationCardProps = Expectation;

export default function ExpectationCard({
  name,
  description,
  image,
}: ExpectationCardProps) {
  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          contentFit="cover"
        />
      )}

      <VStack style={styles.body} gap={4}>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>

        {description && (
          <Text style={styles.description} numberOfLines={3}>
            {description}
          </Text>
        )}
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    width: 250,
  },
  image: {
    width: "100%",
    height: 130,
    backgroundColor: "#F9FAFB",
  },
  body: {
    padding: 12,
  },
  title: {
    fontFamily: Typography.family.semiBold,
    fontSize: 14,
    color: Colors.text,
  },
  description: {
    fontSize: 11,
    lineHeight: 20,
    fontFamily: Typography.family.regular,
  },
});
