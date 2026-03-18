import { Dining } from "@/src/constants/dining";
import { useDining } from "@/src/services/request/useDining";
import createSkeletons, { Skeleton } from "@/src/utils/createSkeletons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import ListEmptyState from "../ListEmptyState";
import DiningCard from "./DiningCard";
import DiningCardSkeleton from "./DiningCardSkeleton";

type DiningListProps = {
  filter: string;
  search: string;
};

const DiningList = ({ filter, search }: DiningListProps) => {
  const { data, isLoading, isFetched, refetch } = useDining({ filter, search });
  const { isConnected } = useNetInfo();
  const isEmpty = isFetched && !isLoading && data?.data.length === 0;
  const [isRefetching, setIsRefetching] = useState(false);

  const handleRefresh = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  return (
    <FlatList<Skeleton | Dining>
      data={isLoading ? createSkeletons(6) : data?.data || []}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        if ("isSkeleton" in item) {
          return <DiningCardSkeleton />;
        }

        return <DiningCard {...item} />;
      }}
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
};

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  separator: { height: 20 },
});

export default DiningList;
