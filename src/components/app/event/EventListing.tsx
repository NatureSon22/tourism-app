import type { Event } from "@/src/constants/eventListing";
import { useOnRefresh } from "@/src/hooks/useOnRefresh";
import { useEvents } from "@/src/services/request/useEvent";
import createSkeletons, { Skeleton } from "@/src/utils/createSkeletons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet, ListRenderItem } from "react-native";
import ItemSeparator from "../../ItemSeparator";
import ListEmptyState from "../ListEmptyState";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";

type EventListingProps = {
  search: string;
};

export default function EventListing({ search }: EventListingProps) {
  const { data, isLoading, isFetched } = useEvents({ search });
  const { refreshing, onRefresh } = useOnRefresh();
  const { isConnected } = useNetInfo();
  const isEmpty = isFetched && !isLoading && data?.data.length === 0;

  const renderItem = useCallback<ListRenderItem<Skeleton | Event>>(({ item }) => {
    if ("isSkeleton" in item) return <EventCardSkeleton />;
    return <EventCard {...item} />;
  }, []);

  return (
    <FlatList<Skeleton | Event>
      data={isLoading ? createSkeletons(5) : data?.data || []}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      initialNumToRender={8}
      maxToRenderPerBatch={10}
      windowSize={11}
      removeClippedSubviews
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={ItemSeparator}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <ListEmptyState
          isLoading={isLoading}
          isConnected={isConnected}
          onRetry={onRefresh}
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
});
