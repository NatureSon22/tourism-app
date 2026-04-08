import { Dining } from "@/src/constants/dining";
import { useDining } from "@/src/services/request/useDining";
import { QueryParams } from "@/src/types/filter";
import createSkeletons, { Skeleton } from "@/src/utils/createSkeletons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import ListEmptyState from "../ListEmptyState";
import DiningCard from "./DiningCard";
import DiningCardSkeleton from "./DiningCardSkeleton";

type DiningListProps = {
  params: QueryParams;
};

const renderDiningItem = ({ item }: { item: Skeleton | Dining }) =>
  "isSkeleton" in item ? <DiningCardSkeleton /> : <DiningCard {...item} />;

const diningKeyExtractor = (item: Skeleton | Dining) => item.id;

const DiningList = ({ params }: DiningListProps) => {
  const {
    data,
    isLoading,
    isFetched,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useDining(params);
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

  const emptyComponent = useMemo(
    () => (
      <ListEmptyState
        isLoading={isLoading}
        isConnected={isConnected}
        isError={isError}
        onRetry={refetch}
        resourceName="dining"
        customNoResultsMessage="Oh no! There's no dining option that matches the search or filter criteria."
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

  return (
    <FlatList<Skeleton | Dining>
      data={listData}
      keyExtractor={diningKeyExtractor}
      renderItem={renderDiningItem}
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
