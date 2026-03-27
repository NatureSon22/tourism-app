import { Review } from "@/src/constants/accommodationdetail";
import { Colors, Typography } from "@/src/constants/styles";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CustomButton from "../../ui/CustomButton";
import DetailSection from "../../ui/DetailsSection";
import ReviewPreviewCard from "../ReviewPreviewCard";

export type DiningReviewsProps = {
  reviews: Review[];
};

export default function DiningReviews({ reviews }: DiningReviewsProps) {
  const router = useRouter();

  const handleSeeAllPress = () => {
    router.push("/forum");
  };

  return (
    <DetailSection title="Reviews">
      <View style={styles.container}>
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ReviewPreviewCard review={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <CustomButton
          title="See all connected reviews"
          variant="outlined"
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={handleSeeAllPress}
        />
      </View>
    </DetailSection>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  separator: {
    width: 12,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 0.8,
    borderColor: Colors.secondary,
  },
  buttonText: {
    fontSize: 11,
    fontFamily: Typography.family.light,
    color: Colors.text,
  },
});
