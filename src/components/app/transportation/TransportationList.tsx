import { Transportation } from "@/src/constants/transportationList";
import { useTransportation } from "@/src/services/request/useTransportation";
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
import { FilterType } from "../main/PlaceFilterTabs";
import TransportationCardSkeleton from "./TransportaionCardSkeleton";
import TransportationCard from "./TransportationCard";

type TransportationListProps = {
  filter?: string;
  search: string;
};

export default function TransportationList({
  search,
}: TransportationListProps) {
  const { data, isLoading, isFetched, refetch } = useTransportation({ search });
  const [filter, setFilter] = useState<FilterType>("Recommended");
  const { isConnected } = useNetInfo();
  const isEmpty = isFetched && !isLoading && data?.data.length === 0;
  const [isRefetching, setIsRefetching] = useState(false);

  const handleRefresh = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

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

  return (
    <FlatList<Skeleton | Transportation>
      data={isLoading ? createSkeletons(6) : data?.data || []}
      keyExtractor={(item) => item.id}
      key="two-column-list"
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
      }
      ListEmptyComponent={
        <ListEmptyState
          isLoading={isLoading}
          isConnected={isConnected}
          onRetry={refetch}
          resourceName="dining"
          customNoResultsMessage="Oh no! There's no dining option that matches the search or filter criteria."
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
});
