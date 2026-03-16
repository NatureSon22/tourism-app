import ActivityCard from "@/src/components/app/ActivityCard";
import ListEmptyState from "@/src/components/app/ListEmptyState";
import ActivityCardSkeleton from "@/src/components/app/activity/ActivityCardSkeleton";
import type { Activity } from "@/src/constants/activity";
import { useActivity } from "@/src/hooks/activity/useActivity";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { memo } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

type Props = {
  search: string;
  isRefetching: boolean;
  onRefresh: () => void;
};

function ActivityList({ search, isRefetching, onRefresh }: Props) {
  const { isConnected } = useNetInfo();
  const {
    data = [],
    isLoading,
    isFetched,
    refetch,
  } = useActivity({
    search,
  });

  if (isLoading) {
    return (
      <View style={styles.loadingWrap}>
        {Array.from({ length: 5 }).map((_, i) => (
          <ActivityCardSkeleton key={i} />
        ))}
      </View>
    );
  }

  return (
    <FlatList
      data={data as Activity[]}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ActivityCard {...item} />}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <ListEmptyState
          isLoading={isLoading}
          isConnected={isConnected}
          onRetry={() => refetch()}
          resourceName="activities"
          customNoResultsMessage="Oh no! There’s no activity that matches the search or filter criteria."
          isEmpty={isFetched && data.length === 0}
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
