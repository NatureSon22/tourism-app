import EventConditions from "@/src/components/app/event/EventConditions";
import EventForums from "@/src/components/app/event/EventForums";
import EventGeneralInformation from "@/src/components/app/event/EventGeneralInformation";
import EventHeader from "@/src/components/app/event/EventHeader";
import EventHotlines from "@/src/components/app/event/EventHotlines";
import EventImages from "@/src/components/app/event/EventImages";
import EventPackages from "@/src/components/app/event/EventPackages";
import EventReviews from "@/src/components/app/event/EventReviews";
import StickyFooter from "@/src/components/app/StickyFooter";
import Divider from "@/src/components/ui/Divider";
import Loading from "@/src/components/ui/Loading";
import { EVENT_DETAIL } from "@/src/constants/eventdetail";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useEventDetails } from "@/src/services/request/useEvent";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function EventDetailsPage() {
  const params = useLocalSearchParams<{ id: string }>();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: dining, isLoading } = useEventDetails({
    id: idParam ?? "",
  });

  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screenContainer}>
        <ScrollView
          style={styles.scrollView}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {isLoading || !dining ? (
            <View style={styles.loadingContainer}>
              <Loading />
            </View>
          ) : (
            <>
              <EventImages images={EVENT_DETAIL.images} />

              <View style={styles.contentContainer}>
                <EventHeader
                  name={EVENT_DETAIL.name}
                  rating={EVENT_DETAIL.rating}
                  reviews={EVENT_DETAIL.reviews}
                  books={EVENT_DETAIL.books}
                  tags={EVENT_DETAIL.tags}
                  location={EVENT_DETAIL.location}
                  description={EVENT_DETAIL.description}
                />

                <EventHotlines hotlines={EVENT_DETAIL.hotlines} />

                <EventPackages packages={EVENT_DETAIL.packages} />

                <Divider />

                <EventGeneralInformation />

                <Divider />

                <EventConditions />

                <Divider />

                <EventForums forums={EVENT_DETAIL.forums} />

                <EventReviews reviews={EVENT_DETAIL.reviewsData} />
              </View>
            </>
          )}
        </ScrollView>

        <StickyFooter price={EVENT_DETAIL.price} />
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
