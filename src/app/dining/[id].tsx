import DiningForums from "@/src/components/app/dining/DiningForums";
import DiningHeader from "@/src/components/app/dining/DiningHeader";
import DiningHotlines from "@/src/components/app/dining/DiningHotlines";
import DiningImages from "@/src/components/app/dining/DiningImages";
import DiningPackages from "@/src/components/app/dining/DiningPackages";
import DiningReviews from "@/src/components/app/dining/DiningReviews";
import NavigationRow from "@/src/components/app/NavigationRow";
import StickyFooter from "@/src/components/app/StickyFooter";
import Divider from "@/src/components/ui/Divider";
import Loading from "@/src/components/ui/Loading";
import { FOOD_DETAIL } from "@/src/constants/fooddetail";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useDiningDetails } from "@/src/services/request/useDining";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function DiningDetailsPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: dining, isLoading } = useDiningDetails({
    id: idParam ?? "",
  });

  return (
  <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screenContainer}>
        {isLoading || !dining ? (
          <View style={styles.loadingContainer}>
            <Loading />
          </View>
        ) : (
          <>
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

                <DiningHotlines hotlines={FOOD_DETAIL.hotlines} />

                <DiningPackages packages={FOOD_DETAIL.packages} />

                <Divider />

                <NavigationRow
                  label="General Information"
                  onPress={() => {
                    router.push("/dining/about");
                  }}
                />

                <Divider />

                <NavigationRow
                  label="Terms & Conditions"
                  onPress={() => {
                    router.push("/dining/about");
                  }}
                />

                <Divider />

                <DiningForums forums={FOOD_DETAIL.forums} />

                <DiningReviews reviews={FOOD_DETAIL.reviewsData} />
              </View>
            </ScrollView>

            <StickyFooter price={FOOD_DETAIL.price} />
          </>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
