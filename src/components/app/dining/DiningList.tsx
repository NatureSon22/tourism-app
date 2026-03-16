import { useGetDining } from "@/src/hooks/request/useGetDining";
import { useOnRefresh } from "@/src/hooks/useOnRefresh";
import { getSkeletonCount } from "@/src/utils/getSkeletonCount";
import { useNetInfo } from "@react-native-community/netinfo";
import React from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import DiningCard from "../DiningCard";
import ListEmptyState from "../ListEmptyState";
import DiningCardSkeleton from "./DiningCardSkeleton";

type DiningListProps = {
  filter: string;
  search: string;
};

const DiningList = ({ filter, search }: DiningListProps) => {
  const { data, isLoading, isFetched } = useGetDining(filter, search);
  const { refreshing, onRefresh } = useOnRefresh();
  const netInfo = useNetInfo();
  const isConnected = netInfo.isConnected;
  const isEmpty = isFetched && !isLoading && data?.length === 0;

  return (
    <FlatList
      data={isLoading ? getSkeletonCount() : data}
      keyExtractor={(item, index) =>
        isLoading ? `place-skel-${index}` : item.id.toString()
      }
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        if (isLoading) {
          return <DiningCardSkeleton />;
        }

        return <DiningCard {...item} />;
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <ListEmptyState
          isLoading={isLoading}
          isConnected={isConnected}
          onRetry={onRefresh}
          resourceName="dining options"
          customNoResultsMessage="No dining options found."
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
