import AccommodationCard from "@/src/components/app/accomodation/AccommodationCard";
import ListEmptyState from "@/src/components/app/ListEmptyState";
import { useAccommodations } from "@/src/services/request/useAccomodation";
import { Accommodation } from "@/src/types/accommodation";
import { QueryParams } from "@/src/types/filter";
import createSkeletons, { Skeleton } from "@/src/utils/createSkeletons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AccommodationCardSkeleton from "./AccommodationCardSkeleton";

type AccommodationListProps = {
  params: QueryParams;
};

export default function AccommodationList({ params }: AccommodationListProps) {
  const {
    data,
    isLoading,
    isFetched,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useAccommodations(
    useMemo(
      () => ({
        search: params.search,
        area: params.area,
        sort: params.sort,
        rating: params.rating,
        type: params.type,
        amenities: params.amenities,
        subtypes: params.subtypes,
        lat: params.lat,
        lng: params.lng,
        radius: params.radius,
        page: params.page ?? 1,
      }),
      [
        params.search,
        params.area,
        params.sort,
        params.rating,
        params.type,
        params.amenities,
        params.subtypes,
        params.lat,
        params.lng,
        params.radius,
        params.page,
      ],
    ),
  );
  const { isConnected, isInternetReachable } = useNetInfo();
  const online = isConnected && isInternetReachable;

  const listings = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.listings) ?? [];
  }, [data]);

  const isEmpty = isFetched && !isLoading && listings?.length === 0;

  const handleEndReached = () => {
    console.log("End reached. Has next page?", hasNextPage);
    console.log("Is fetching next page?", isFetchingNextPage);
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = useCallback<ListRenderItem<Skeleton | Accommodation>>(
    ({ item }) => {
      if ("isSkeleton" in item) {
        return <AccommodationCardSkeleton />;
      }

      return <AccommodationCard {...item} />;
    },
    [],
  );

  return (
    <FlatList<Skeleton | Accommodation>
      // Show skeletons only on first load, otherwise show listings
      data={isLoading ? createSkeletons(6) : listings}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      // Infinite Scroll Props
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5} // Trigger when 50% from the bottom
      ListFooterComponent={() =>
        isFetchingNextPage ? (
          <ActivityIndicator style={{ marginVertical: 20 }} color="#000" />
        ) : (
          <Text>Footer Area</Text>
        )
      }
      // Optimization Props
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={Platform.OS === "android"}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading && !!data} onRefresh={refetch} />
      }
      ListEmptyComponent={
        <ListEmptyState
          isLoading={isLoading}
          isConnected={online}
          isError={isError}
          isEmpty={isEmpty}
          resourceName="accommodations"
          onRetry={refetch}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  separator: {
    height: 20,
  },
});
