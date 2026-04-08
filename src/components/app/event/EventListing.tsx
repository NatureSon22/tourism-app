import type { Event } from "@/src/constants/eventListing";
import { useEvents } from "@/src/services/request/useEvent";
import type { QueryParams } from "@/src/types/filter";
import createSkeletons, { Skeleton } from "@/src/utils/createSkeletons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
} from "react-native";
import ItemSeparator from "../../ui/ItemSeparator";
import ListEmptyState from "../ListEmptyState";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";

type EventListingProps = {
  params: QueryParams;
};

export default function EventListing({ params }: EventListingProps) {
  const {
    data,
    isLoading,
    isFetched,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useEvents(params);
  const { isConnected } = useNetInfo();
  const [isRefetching, setIsRefetching] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  }, [refetch]);

  const listings = useMemo(
    () => data?.pages.flatMap((page) => page.data.listings) ?? [],
    [data],
  );

  const listData = useMemo(
    () => (isLoading ? createSkeletons(5) : listings),
    [isLoading, listings],
  );

  const isEmpty = useMemo(
    () => isFetched && !isLoading && listings.length === 0,
    [isFetched, isLoading, listings],
  );

  const handleEndReached = useCallback(() => {
    console.log("End reached");
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const listFooterComponent = useMemo(
    () =>
      isFetchingNextPage ? (
        <ActivityIndicator style={styles.footerLoader} color="#000" />
      ) : null,
    [isFetchingNextPage],
  );

  const renderItem = useCallback<ListRenderItem<Skeleton | Event>>(
    ({ item }) => {
      if ("isSkeleton" in item) return <EventCardSkeleton />;
      return <EventCard {...item} />;
    },
    [],
  );

  return (
    <FlatList<Skeleton | Event>
      data={listData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={listFooterComponent}
      initialNumToRender={8}
      maxToRenderPerBatch={5}
      windowSize={11}
      removeClippedSubviews
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={ItemSeparator}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
      }
      ListEmptyComponent={
        <ListEmptyState
          isLoading={isLoading}
          isConnected={isConnected}
          isError={isError}
          onRetry={handleRefresh}
          resourceName="events"
          customNoResultsMessage="No events found."
          isEmpty={isEmpty}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  footerLoader: {
    marginVertical: 20,
  },
});
