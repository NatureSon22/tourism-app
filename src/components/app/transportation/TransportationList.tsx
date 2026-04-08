import { Transportation } from "@/src/constants/transportationList";
import { useTransportation } from "@/src/services/request/useTransportation";
import { QueryParams } from "@/src/types/filter";
import createSkeletons, { Skeleton } from "@/src/utils/createSkeletons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import ListEmptyState from "../ListEmptyState";
import TransportationCardSkeleton from "./TransportaionCardSkeleton";
import TransportationCard from "./TransportationCard";

type TransportationListProps = {
  params: QueryParams;
};

export default function TransportationList({
  params,
}: TransportationListProps) {
  const {
    data,
    isLoading,
    isFetched,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useTransportation(params);
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
    () => (isLoading ? createSkeletons(6) : listings),
    [isLoading, listings],
  );

  const isEmpty = useMemo(
    () => isFetched && !isLoading && listings.length === 0,
    [isFetched, isLoading, listings],
  );

  const renderItem = useCallback<ListRenderItem<Skeleton | Transportation>>(
    ({ item }) => {
      if ("isSkeleton" in item) {
        return (
          <View style={styles.itemWrapper}>
            <TransportationCardSkeleton />
          </View>
        );
      }

      return (
        <View style={styles.itemWrapper}>
          <TransportationCard {...item} />
        </View>
      );
    },
    [],
  );

  const handleEndReached = useCallback(() => {
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

  const emptyComponent = useMemo(
    () => (
      <ListEmptyState
        isLoading={isLoading}
        isConnected={isConnected}
        isError={isError}
        onRetry={refetch}
        resourceName="transportation"
        customNoResultsMessage="Oh no! There's no transportation option that matches the search or filter criteria."
        isEmpty={isEmpty}
      />
    ),
    [isConnected, isEmpty, isError, isLoading, refetch],
  );

  const refreshControl = useMemo(
    () => (
      <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
    ),
    [handleRefresh, isRefetching],
  );

  return (
    <FlatList<Skeleton | Transportation>
      data={listData}
      keyExtractor={(item) => item.id}
      key="two-column-list"
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={listFooterComponent}
      initialNumToRender={6}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={Platform.OS === "android"}
      updateCellsBatchingPeriod={50}
      refreshControl={refreshControl}
      ListEmptyComponent={emptyComponent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemWrapper: {
    flex: 1,
    paddingHorizontal: 6,
    maxWidth: "50%",
  },
  footerLoader: {
    marginVertical: 20,
  },
});
