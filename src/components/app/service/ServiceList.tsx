import { useGetServices } from "@/src/services/request/useService";
import { useFilterStore } from "@/src/stores/filterStore";
import { Service } from "@/src/types/service";
import createSkeletons, { Skeleton } from "@/src/utils/createSkeletons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import ListEmptyState from "../ListEmptyState";
import ServiceCard from "./ServiceCard";
import ServiceCardSkeleton from "./ServiceCardSkeleton";

type ServiceListProps = {
  search: string;
};

export default function ServiceList({ search }: ServiceListProps) {
  const categories = useFilterStore((state) => state.categories);
  const { data, isLoading, isFetched, isError, refetch } = useGetServices({
    search,
  });
  const { isConnected } = useNetInfo();
  const isEmpty = isFetched && !isLoading && (data?.data.length ?? 0) === 0;
  const [isRefetching, setIsRefetching] = useState(false);

  const handleRefresh = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  const renderItem = useCallback<ListRenderItem<Skeleton | Service>>(
    ({ item }) => {
      if ("isSkeleton" in item) {
        return <ServiceCardSkeleton />;
      }

      return <ServiceCard {...item} />;
    },
    [],
  );

  return (
    <FlatList<Skeleton | Service>
      data={isLoading ? createSkeletons(6) : data?.data || []}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={10}
      removeClippedSubviews
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
      }
      ListEmptyComponent={
        <ListEmptyState
          isLoading={isLoading}
          isConnected={isConnected}
          isError={isError}
          isEmpty={isEmpty}
          resourceName="service"
          customNoResultsMessage="Oh no! There's no service option that matches the search or filter criteria."
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
    height: 10,
  },
});
