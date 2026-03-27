import AccommodationHeader from "@/src/components/app/accomodation/AccommodationHeader";
import AccommodationHotlines from "@/src/components/app/accomodation/AccommodationHotlines";
import AccomodationExpectations from "@/src/components/app/accomodation/AccomodationExpectations";
import AccomodationForums from "@/src/components/app/accomodation/AccomodationForums";
import AccomodationImages from "@/src/components/app/accomodation/AccomodationImages";
import AccomodationNavHeader from "@/src/components/app/accomodation/AccomodationNavHeader";
import AccomodationReviews from "@/src/components/app/accomodation/AccomodationReviews";
import NavigationRow from "@/src/components/app/NavigationRow";
import StickyFooter from "@/src/components/app/StickyFooter";
import Divider from "@/src/components/ui/Divider";
import { LISTING_INFO } from "@/src/constants/accommodationdetail";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

export default function AccomodationDetailsPage() {
  const { width } = useWindowDimensions();
  const [showHeader, setShowHeader] = useState(false);
  const imageHeight = width / (16 / 9);
  const router = useRouter();

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY >= imageHeight) {
      if (!showHeader) setShowHeader(true);
    } else {
      if (showHeader) setShowHeader(false);
    }
  };

  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screenContainer}>
        <ScrollView
          style={styles.scrollView}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
        >
          <AccomodationImages images={LISTING_INFO.images} />

          <AccomodationNavHeader showHeader={showHeader} />

          <View style={styles.contentContainer}>
            <AccommodationHeader
              name={LISTING_INFO.name}
              rating={LISTING_INFO.rating}
              reviews={LISTING_INFO.reviews}
              location={LISTING_INFO.location}
              description={LISTING_INFO.description}
              books={LISTING_INFO.books}
              tags={LISTING_INFO.tags}
            />

            <AccommodationHotlines hotlines={LISTING_INFO.hotlines} />

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

            {/* From Community Forums */}
            <AccomodationForums forums={LISTING_INFO.forums} />

            <Divider />

            {/* Reviews */}
            <AccomodationReviews reviews={LISTING_INFO.reviewsData} />

            <Divider />

            <AccomodationExpectations expectations={LISTING_INFO.expects} />
          </View>
        </ScrollView>

        <StickyFooter price={LISTING_INFO.packages[0].price} />
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
