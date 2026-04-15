import ActivityCard from "@/src/components/app/activity/ActivityCard";
import ListEmptyState from "@/src/components/app/ListEmptyState";
import { useActivities } from "@/src/services/request/useActivity";
import { QueryParams } from "@/src/types/filter";
import { ACTIVITY } from "@/src/types/listingTypes";
import createSkeletons, { Skeleton } from "@/src/utils/createSkeletons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { memo, useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import ReloadPage from "../ReloadPage";
import ActivityCardSkeleton from "./ActivityCardSkeleton";

type Props = {
  params: QueryParams;
};

function ActivityList({ params }: Props) {
  const {
    data,
    isLoading,
    isFetched,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useActivities(params);
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
    () => isFetched && !isLoading && listings.length === 0,
    [isFetched, isLoading, listings],
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

  const renderItem = useCallback<ListRenderItem<Skeleton | ACTIVITY>>(
    ({ item }) =>
      "isSkeleton" in item ? (
        <ActivityCardSkeleton />
      ) : (
        <ActivityCard {...item} />
      ),
    [],
  );

  const keyExtractor = useCallback(
    (item: Skeleton | ACTIVITY) => item.id.toString(),
    [],
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
    <FlatList<Skeleton | ACTIVITY>
      data={listData}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={listFooterComponent}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
      }
      ListEmptyComponent={
        <ListEmptyState
          isLoading={isLoading}
          isConnected={online}
          isError={isError}
          onRetry={refetch}
          resourceName="activities"
          customNoResultsMessage="Oh no! There's no activity that matches the search or filter criteria."
          isEmpty={isEmpty}
          disableOfflineReload={true}
        />
      }
    />
  );
}

export default memo(ActivityList);

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  separator: {
    height: 20,
  },
  footerLoader: {
    marginVertical: 20,
  },
});
