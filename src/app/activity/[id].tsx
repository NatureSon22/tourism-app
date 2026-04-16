import ActivityForums from "@/src/components/app/activity/ActivityForums";
import ActivityHeader from "@/src/components/app/activity/ActivityHeader";
import ActivityHotlines from "@/src/components/app/activity/ActivityHotlines";
import ActivityImages from "@/src/components/app/activity/ActivityImages";
import ActivityPackages from "@/src/components/app/activity/ActivityPackages";
import ActivityReviews from "@/src/components/app/activity/ActivityReviews";
import NavigationRow from "@/src/components/app/NavigationRow";
import StickyFooter from "@/src/components/app/StickyFooter";
import Divider from "@/src/components/ui/Divider";
import Loading from "@/src/components/ui/Loading";
import { ACTIVITY_DETAIL } from "@/src/constants/activitydetail";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useActivityDetails } from "@/src/services/request/useActivity";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function ActivityDetailsPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: activity, isLoading } = useActivityDetails({
    id: idParam ?? "",
  });

  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screenContainer}>
        {isLoading || !activity ? (
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
              <ActivityImages images={ACTIVITY_DETAIL.images} />

              <View style={styles.contentContainer}>
                <ActivityHeader
                  name={ACTIVITY_DETAIL.name}
                  rating={ACTIVITY_DETAIL.rating}
                  reviews={ACTIVITY_DETAIL.reviews}
                  location={ACTIVITY_DETAIL.location}
                  description={ACTIVITY_DETAIL.description}
                  books={ACTIVITY_DETAIL.books}
                  tags={ACTIVITY_DETAIL.tags}
                />

                <ActivityHotlines hotlines={ACTIVITY_DETAIL.hotlines} />

                <ActivityPackages packages={ACTIVITY_DETAIL.packages} />

                <Divider />

                <NavigationRow
                  label="General Information"
                  onPress={() => {
                    router.push("/accommodation/about");
                  }}
                />

                <Divider />

                <NavigationRow
                  label="Terms & Conditions"
                  onPress={() => {
                    router.push("/accommodation/about");
                  }}
                />

                <Divider />

                <ActivityForums forums={ACTIVITY_DETAIL.forums} />

                <ActivityReviews reviews={ACTIVITY_DETAIL.reviewsData} />
              </View>
            </ScrollView>

            <StickyFooter price={ACTIVITY_DETAIL.price} />
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
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
