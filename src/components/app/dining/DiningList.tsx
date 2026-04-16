import { useDining } from "@/src/services/request/useDining";
import { QueryParams } from "@/src/types/filter";
import { DINING } from "@/src/types/listingTypes";
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
import DiningCard from "./DiningCard";
import DiningCardSkeleton from "./DiningCardSkeleton";

type DiningListProps = {
  params: QueryParams;
};

const diningKeyExtractor = (item: Skeleton | DINING) => item.id.toString();

const DiningList = ({ params }: DiningListProps) => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useDining(params);
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

  const renderItem = useCallback<ListRenderItem<Skeleton | DINING>>(
    ({ item }) =>
      "isSkeleton" in item ? <DiningCardSkeleton /> : <DiningCard {...item} />,
    [],
  );

  const emptyComponent = useMemo(
    () => (
      <ListEmptyState
        isLoading={isLoading}
        isConnected={online}
        isError={isError}
        onRetry={refetch}
        resourceName="dining"
        customNoResultsMessage="Oh no! There's no dining option that matches the search or filter criteria."
        isEmpty={isEmpty}
        disableOfflineReload={true}
      />
    ),
    [online, isEmpty, isError, isLoading, refetch],
  );

  const refreshControl = useMemo(
    () => (
      <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
    ),
    [handleRefresh, isRefetching],
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

  if (!online && !isLoading) {
    return (
      <ReloadPage
        refetch={refetch}
        message="It looks like you're offline. Please check your connection and try again."
      />
    );
  }

  return (
    <FlatList<Skeleton | DINING>
      data={listData}
      keyExtractor={diningKeyExtractor}
      renderItem={renderItem}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={listFooterComponent}
      initialNumToRender={6}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={Platform.OS === "android"}
      updateCellsBatchingPeriod={50}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={Separator}
      showsVerticalScrollIndicator={false}
      refreshControl={refreshControl}
      ListEmptyComponent={emptyComponent}
    />
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  separator: { height: 20 },
  footerLoader: {
    marginVertical: 20,
  },
});

export default DiningList;
