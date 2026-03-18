import ActivityCard from "@/src/components/app/activity/ActivityCard";
import ListEmptyState from "@/src/components/app/ListEmptyState";
import { Activity } from "@/src/constants/activity";
import { useActivities } from "@/src/services/request/useActivity";
import createSkeletons, { Skeleton } from "@/src/utils/createSkeletons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { memo, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import ActivityCardSkeleton from "./ActivityCardSkeleton";

type Props = {
  search: string;
};

function ActivityList({ search }: Props) {
  const { data, isLoading, isFetched, refetch } = useActivities({
    search,
  });
  const { isConnected } = useNetInfo();
  const isEmpty = isFetched && !isLoading && data?.data.length === 0;
  const [isRefetching, setIsRefetching] = useState(false);

  const handleRefresh = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  return (
    <FlatList<Skeleton | Activity>
      data={isLoading ? createSkeletons(6) : data?.data || []}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        if ("isSkeleton" in item) {
          return <ActivityCardSkeleton />;
        }

        return <ActivityCard {...item} />;
      }}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
      }
      ListEmptyComponent={
        <ListEmptyState
          isLoading={isLoading}
          isConnected={isConnected}
          onRetry={() => refetch()}
          resourceName="activities"
          customNoResultsMessage="Oh no! There's no activity that matches the search or filter criteria."
          isEmpty={isEmpty}
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
  loadingWrap: {
    paddingHorizontal: 10,
    gap: 20,
  },
});
