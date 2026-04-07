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
import { EVENT_DETAIL } from "@/src/constants/eventdetail";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function EventDetailsPage() {
  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screenContainer}>
        <ScrollView
          style={styles.scrollView}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
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
});
