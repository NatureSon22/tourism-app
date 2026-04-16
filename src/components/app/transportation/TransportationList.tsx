import { useTransportation } from "@/src/services/request/useTransportation";
import { QueryParams } from "@/src/types/filter";
import { TRANSPORTATION } from "@/src/types/listingTypes";
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
import ReloadPage from "../ReloadPage";
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
    isSuccess,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useTransportation(params);
  const { isConnected, isInternetReachable } = useNetInfo();
  const online = isConnected && isInternetReachable;
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
    () => isSuccess && !isLoading && listings.length === 0,
    [isSuccess, isLoading, listings],
  );

  const renderItem = useCallback<ListRenderItem<Skeleton | TRANSPORTATION>>(
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
        isConnected={online}
        isError={isError}
        onRetry={refetch}
        resourceName="transportation"
        isEmpty={isEmpty}
        disableOfflineReload={true}
      />
    ),
    [isEmpty, isError, isLoading, online, refetch],
  );

  const refreshControl = useMemo(
    () => (
      <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
    ),
    [handleRefresh, isRefetching],
  );

  if (!online && !isLoading) {
    return (
      <ReloadPage
        refetch={refetch}
        message="It looks like you're offline. Please check your connection and try again."
      />
    );
  }

  return (
    <FlatList<Skeleton | TRANSPORTATION>
      data={listData}
      keyExtractor={(item) => item.id.toString()}
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
