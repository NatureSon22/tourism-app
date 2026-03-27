import CarouselImages from "@/src/components/app/CarouselImages";
import ForumPreviewCard from "@/src/components/app/ForumPreviewCard";
import ReviewPreviewCard from "@/src/components/app/ReviewPreviewCard";
import StickyFooter from "@/src/components/app/StickyFooter";
import Accordion from "@/src/components/ui/Accordion";
import CustomButton from "@/src/components/ui/CustomButton";
import DetailSection from "@/src/components/ui/DetailsSection";
import Divider from "@/src/components/ui/Divider";
import { Review } from "@/src/constants/accommodationdetail";
import {
  EVENT_DETAIL,
  HotlineEntry,
  Package,
} from "@/src/constants/eventdetail";
import { ForumPost } from "@/src/constants/forum";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import VStack from "@/src/layouts/VStack";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type EventHeaderProps = {
  name: string;
  rating: number;
  reviews: number;
  books: number;
  tags: string[];
  location: string;
  description: string;
};

function EventHeader({
  name,
  rating,
  reviews,
  books,
  tags,
  location,
  description,
}: EventHeaderProps) {
  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <>
      <VStack gap={8} style={{ alignItems: "flex-start" }}>
        <Text style={styles.title}>{name}</Text>

        <HStack gap={8} alignItems="center">
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingValue}>{rating.toFixed(1)}</Text>
            <Text style={styles.ratingSlash}>/</Text>
            <Text style={styles.ratingMax}>5</Text>
          </View>
          <Pressable>
            <Text style={styles.reviewsLink}>
              {reviews.toLocaleString()} reviews
            </Text>
          </Pressable>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.booksText}>{books}k + booked</Text>
        </HStack>
      </VStack>

      <View style={styles.tagsWrapper}>
        <FlatList
          data={tags}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.tagsContainer}
          renderItem={({ item: tag }) => (
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          )}
        />
      </View>

      <HStack
        gap={8}
        alignItems="center"
        justifyContent="space-between"
        style={{ width: "100%" }}
      >
        <HStack gap={4}>
          <Text style={styles.locationText}>📍</Text>
          <Pressable onPress={() => {}}>
            <Text style={styles.locationText} numberOfLines={1}>
              {location}
            </Text>
          </Pressable>
        </HStack>

        <Text style={styles.locationText}>›</Text>
      </HStack>

      <View style={styles.descriptionBox}>
        <Text
          style={styles.descriptionText}
          numberOfLines={showFullDesc ? undefined : 3}
        >
          {description}
        </Text>

        <Pressable
          onPress={() => setShowFullDesc((s) => !s)}
          style={{ marginTop: 8, alignSelf: "flex-start" }}
        >
          <Text style={styles.seeAllLink}>
            {showFullDesc ? "See less" : "See all"}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

type EventImagesProps = {
  images: string[];
};

function EventImages({ images }: EventImagesProps) {
  return <CarouselImages images={images} />;
}

type EventHotlinesProps = {
  hotlines: HotlineEntry[];
};

function EventHotlines({ hotlines }: EventHotlinesProps) {
  return (
    <DetailSection title="Nearby Local Hotlines">
      <View style={styles.hotlinesContainer}>
        {hotlines.map((hotline, index) => (
          <HStack
            key={index}
            gap={8}
            justifyContent="flex-start"
            style={styles.hotlineEntry}
          >
            <Text style={styles.hotlineText}>
              <Text style={styles.hotlineLabel}>{hotline.label}: </Text>
              <Text style={styles.hotlinePhone}>{hotline.phone}</Text>
            </Text>
          </HStack>
        ))}
      </View>
    </DetailSection>
  );
}

type EventPackagesProps = {
  packages: Package[];
};

function EventPackages({ packages }: EventPackagesProps) {
  return (
    <DetailSection title="Package options">
      <View style={{ gap: 12 }}>
        {packages.map((pkg) => (
          <View key={pkg.id} style={styles.packageCard}>
            <Text style={styles.packageTitle}>{pkg.title}</Text>
            {pkg.subTitle ? (
              <Text style={styles.packageSubTitle}>{pkg.subTitle}</Text>
            ) : null}
            <Text style={styles.packagePrice}>
              ₱{pkg.price.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </DetailSection>
  );
}

type EventForumsProps = {
  forums: ForumPost[];
};

function EventForums({ forums }: EventForumsProps) {
  const router = useRouter();
  const handleSeeAllPress = () => router.push("/forum");

  return (
    <DetailSection title="From community forums">
      <View style={styles.container}>
        <FlatList
          data={forums}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ForumPreviewCard forum={item} />}
          ItemSeparatorComponent={() => <View style={styles.forumSeparator} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <CustomButton
          title="See all connected forums"
          variant="outlined"
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={handleSeeAllPress}
        />
      </View>
    </DetailSection>
  );
}

type EventReviewsProps = {
  reviews: Review[];
};

function EventReviews({ reviews }: EventReviewsProps) {
  const router = useRouter();
  const handleSeeAllPress = () => router.push("/forum");

  return (
    <DetailSection title="Reviews">
      <View style={styles.container}>
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ReviewPreviewCard review={item} />}
          ItemSeparatorComponent={() => <View style={styles.forumSeparator} />}
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

function EventGeneralInformation() {
  return (
    <Accordion title="General Information">
      <Text>This is general information</Text>
    </Accordion>
  );
}

function EventConditions() {
  return (
    <Accordion title="Terms & Conditions">
      <Text>This is the terms & conditions</Text>
    </Accordion>
  );
}

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
  title: {
    fontSize: 20,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
  ratingBadge: {
    backgroundColor: "#CEE9FF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  ratingValue: {
    fontSize: 11,
    fontFamily: Typography.family.medium,
    color: "#03518E",
  },
  ratingSlash: {
    fontSize: 12,
    fontFamily: Typography.family.medium,
    color: "#03518E",
  },
  ratingMax: {
    fontSize: 11,
    fontFamily: Typography.family.medium,
    color: "#03518E",
  },
  reviewsLink: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: Colors.textMuted,
    textDecorationLine: "underline",
  },
  separator: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  booksText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: Colors.textMuted,
  },
  tagsWrapper: {
    height: 30,
  },
  tagsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
  },
  tagBadge: {
    height: 24,
    backgroundColor: "#4C7799",
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  tagText: {
    fontSize: 9.5,
    fontFamily: "Poppins-Medium",
    color: Colors.textOnPrimary,
  },
  locationText: {
    fontSize: 10.5,
    fontFamily: Typography.family.regular,
    includeFontPadding: false,
    maxWidth: 220,
    padding: 4,
  },
  descriptionBox: {
    backgroundColor: "#E9F5FF",
    borderRadius: 10,
    padding: 14,
    position: "relative",
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
    lineHeight: 22,
  },
  seeAllLink: {
    fontSize: 12,
    fontFamily: Typography.family.medium,
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  hotlinesContainer: {
    flexDirection: "column",
    gap: 8,
  },
  hotlineEntry: {
    alignItems: "center",
  },
  hotlineText: {
    fontSize: 11.5,
    fontFamily: Typography.family.regular,
    color: Colors.text,
  },
  hotlineLabel: {
    fontFamily: Typography.family.medium,
  },
  hotlinePhone: {
    fontFamily: Typography.family.regular,
    textDecorationLine: "underline",
  },
  packageCard: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  packageTitle: {
    fontSize: 12,
    fontFamily: Typography.family.medium,
    color: Colors.text,
  },
  packageSubTitle: {
    fontSize: 11,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
  },
  packagePrice: {
    fontSize: 14,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
    marginTop: 6,
  },
  container: {
    gap: 12,
  },
  pagination: {
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
  forumSeparator: {
    width: 12,
  },
});
