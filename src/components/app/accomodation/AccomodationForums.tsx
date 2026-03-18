import { ForumPost } from "@/src/constants/forum";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../ui/CustomButton";
import AccomodationForumCard from "./AccomodationForumCard";

type AccomodationForumsProps = {
  forums: ForumPost[];
};

export default function AccomodationForums({
  forums,
}: AccomodationForumsProps) {
  const router = useRouter();
  // useQuery

  const handleSeeAllPress = () => {
    // must be accommodation/forums
    router.push("/forum");
  };

  return (
    <VStack style={styles.sectionContainer}>
      <HStack gap={8} style={styles.sectionHeader}>
        <View style={styles.sectionIndicator} />
        <Text style={styles.sectionTitle}>From community forums</Text>
      </HStack>

      <FlatList
        data={forums}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AccomodationForumCard forum={item} />}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        horizontal
      />

      <CustomButton
        title="See all connected forums"
        variant="outlined"
        style={{
          paddingVertical: 12,
          borderRadius: 8,
          borderWidth: 0.8,
          borderColor: Colors.secondary,
        }}
        textStyle={{
          fontSize: 11,
          fontFamily: Typography.family.light,
          color: Colors.text,
        }}
        onPress={handleSeeAllPress}
      />
    </VStack>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    alignSelf: "stretch",
    gap: 5,
    marginVertical: 10, // Gives breathing room between different sections
  },
  sectionHeader: {
    justifyContent: "flex-start",
    gap: 10,
  },
  sectionIndicator: {
    width: 4,
    height: "100%",
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
});
