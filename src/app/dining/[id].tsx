import DiningHeader from "@/src/components/app/dining/DiningHeader";
import DiningHotlines from "@/src/components/app/dining/DiningHotlines";
import DiningImages from "@/src/components/app/dining/DiningImages";
import DiningPackages from "@/src/components/app/dining/DiningPackages";
import { FOOD_DETAIL } from "@/src/constants/fooddetail";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function DiningDetailsPage() {
  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screenContainer}>
        <ScrollView
          style={styles.scrollView}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <DiningImages images={FOOD_DETAIL.images} />

          <View style={styles.contentContainer}>
            <DiningHeader
              name={FOOD_DETAIL.name}
              rating={FOOD_DETAIL.rating}
              reviews={FOOD_DETAIL.reviews}
              books={FOOD_DETAIL.books}
              tags={FOOD_DETAIL.tags}
              location={FOOD_DETAIL.location}
              description={FOOD_DETAIL.description}
            />

            <DiningHotlines />

            <DiningPackages packages={FOOD_DETAIL.packages} />
          </View>
        </ScrollView>
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingBottom: 10,
    paddingTop: 0,
    paddingHorizontal: 0,
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    marginTop: -20,
    padding: 15,
    paddingTop: 15,
    backgroundColor: "white",
    gap: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
