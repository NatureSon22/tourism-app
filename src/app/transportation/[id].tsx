import NavigationRow from "@/src/components/app/NavigationRow";
import TranportationForum from "@/src/components/app/transportation/TransportationForum";
import TransportationHotlines from "@/src/components/app/transportation/TransportationHotlines";
import TransportationImages from "@/src/components/app/transportation/TransportationImages";
import Divider from "@/src/components/ui/Divider";
import Loading from "@/src/components/ui/Loading";
import { Colors, Typography } from "@/src/constants/styles";
import { TRANSPORTATION_DETAIL } from "@/src/constants/transportationdetail";
import HStack from "@/src/layouts/HStack";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import VStack from "@/src/layouts/VStack";
import { useTransportationDetails } from "@/src/services/request/useTransportation";
import { formatListingAddress } from "@/src/utils/formatListingAddress";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function TransportationDetailsPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: transportation, isLoading } = useTransportationDetails({
    id: idParam ?? "",
  });

  const imageUrls = useMemo(
    () => transportation?.images?.map((img) => img.src) ?? [],
    [transportation?.images],
  );

  const address = useMemo(
    () => formatListingAddress(transportation?.addresses),
    [transportation?.addresses],
  );

  const categories = useMemo(
    () => transportation?.categories?.map((category) => category.name) ?? [],
    [transportation?.categories],
  );

  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screenContainer}>
        {isLoading || !transportation ? (
          <View style={styles.loadingContainer}>
            <Loading />
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {imageUrls && imageUrls.length > 0 && (
              <TransportationImages images={imageUrls} />
            )}

            {/* Content card overlaps the image by pulling it up */}
            <View style={styles.contentContainer}>
              <VStack gap={8} style={{ alignItems: "flex-start" }}>
                <Text style={styles.title} numberOfLines={2}>
                  {transportation?.title}
                </Text>

                {/* Tags */}
                <View style={styles.tagsWrapper}>
                  <FlatList
                    data={categories}
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
              </VStack>

              {/* Location */}
              <HStack
                gap={8}
                alignItems="center"
                justifyContent="space-between"
                style={{ width: "100%" }}
              >
                <HStack gap={4}>
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color={Colors.textMuted}
                  />
                  <Pressable onPress={() => {}}>
                    <Text style={styles.locationText} numberOfLines={1}>
                      {address}
                    </Text>
                  </Pressable>
                </HStack>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={Colors.textMuted}
                />
              </HStack>

              {/* Hotlines */}
              <TransportationHotlines />

              {transportation?.additional_info.map((info) => (
                <View key={info.id} style={styles.infoContainer}>
                  <NavigationRow
                    label={info.title}
                    onPress={() => {
                      router.push({
                        pathname: "/transportation/about",
                        params: { id: transportation.id, sectionId: info.id },
                      });
                    }}
                  />

                  <Divider />
                </View>
              ))}

              <TranportationForum forums={TRANSPORTATION_DETAIL.forums} />
            </View>
          </ScrollView>
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
  title: {
    fontSize: 20,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
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
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    gap: 12,
  },
});
