import { useGetServices } from "@/src/services/request/useService";
import { QueryParams } from "@/src/types/filter";
import { Service } from "@/src/types/service";
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
import ServiceCard from "./ServiceCard";
import ServiceCardSkeleton from "./ServiceCardSkeleton";

type ServiceListProps = {
  params: QueryParams;
};

export default function ServiceList({ params }: ServiceListProps) {
  const {
    data,
    isLoading,
    isFetched,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetServices(params);
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

  const renderItem = useCallback<ListRenderItem<Skeleton | Service>>(
    ({ item }) => {
      if ("isSkeleton" in item) {
        return <ServiceCardSkeleton />;
      }

      return <ServiceCard {...item} />;
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
        isEmpty={isEmpty}
        resourceName="service"
        customNoResultsMessage="Oh no! There's no service option that matches the search or filter criteria."
        onRetry={refetch}
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
    <FlatList<Skeleton | Service>
      data={listData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={listFooterComponent}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={10}
      removeClippedSubviews={Platform.OS === "android"}
      updateCellsBatchingPeriod={50}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={Separator}
      showsVerticalScrollIndicator={false}
      refreshControl={refreshControl}
      ListEmptyComponent={emptyComponent}
    />
  );
}

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  separator: {
    height: 10,
  },
  footerLoader: {
    marginVertical: 20,
  },
});
