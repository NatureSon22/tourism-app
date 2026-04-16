import AccommodationHeader from "@/src/components/app/accomodation/AccommodationHeader";
import AccommodationHotlines from "@/src/components/app/accomodation/AccommodationHotlines";
import AccomodationImages from "@/src/components/app/accomodation/AccomodationImages";
import AccomodationNavHeader from "@/src/components/app/accomodation/AccomodationNavHeader";
import NavigationRow from "@/src/components/app/NavigationRow";
import StickyFooter from "@/src/components/app/StickyFooter";
import Divider from "@/src/components/ui/Divider";
import Loading from "@/src/components/ui/Loading";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useAccommodationDetails } from "@/src/services/request/useAccomodation";
import { formatListingAddress } from "@/src/utils/formatListingAddress";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useMemo, useState } from "react";
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
  const params = useLocalSearchParams<{ id: string }>();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: accommodation, isLoading } = useAccommodationDetails({
    id: idParam ?? "",
  });

  const imageUrls = useMemo(
    () => accommodation?.images?.map((img) => img.src) ?? [],
    [accommodation?.images],
  );

  const address = useMemo(
    () => formatListingAddress(accommodation?.addresses),
    [accommodation?.addresses],
  );

  const categories = useMemo(
    () => accommodation?.categories?.map((category) => category.name) ?? [],
    [accommodation?.categories],
  );

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
        {isLoading || !accommodation ? (
          <View style={styles.loadingContainer}>
            <Loading />
          </View>
        ) : (
          <>
            <ScrollView
              style={styles.scrollView}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              stickyHeaderIndices={[1]}
            >
              {imageUrls && <AccomodationImages images={imageUrls} />}

              <AccomodationNavHeader showHeader={showHeader} />

              <View style={styles.contentContainer}>
                <AccommodationHeader
                  name={accommodation.title}
                  rating={accommodation?.rating ?? 0}
                  reviews={accommodation?.reviews ?? 0}
                  location={address}
                  description={accommodation.highlights}
                  books={accommodation?.books ?? 0}
                  tags={categories}
                />

                <AccommodationHotlines hotlines={accommodation.contacts} />

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
                {/* <AccomodationForums forums={accommodation.forums} /> */}

                <Divider />

                {/* Reviews */}
                {/* <AccomodationReviews reviews={accommodation.reviewsData} /> */}

                <Divider />

                {/* <AccomodationExpectations
                  expectations={accommodation.expects}
                /> */}
              </View>
            </ScrollView>

            <StickyFooter price={accommodation.base_price} />
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
