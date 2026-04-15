import ListEmptyState from "@/src/components/app/ListEmptyState";
import ReloadPage from "@/src/components/app/ReloadPage";
import { ForumPost } from "@/src/constants/forum";
import { ForumType } from "@/src/constants/forumTypes";
import { useGetAllForums } from "@/src/services/request/useForum";
import createSkeletons, { Skeleton } from "@/src/utils/createSkeletons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useCallback, useMemo } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import ForumCard from "./ForumCard";
import ForumSkeletonCard from "./ForumSkeletonCard";

type ForumListProps = {
  type?: ForumType;
};

export default function ForumList({ type }: ForumListProps) {
  const selectedType = useMemo(() => type, [type]);
  const { data, isLoading, isError, refetch } = useGetAllForums(selectedType);
  const { isConnected, isInternetReachable } = useNetInfo();
  const online = isConnected && isInternetReachable;

  const forums = data?.data.listings ?? [];
  const isEmpty = !isLoading && forums.length === 0;

  const renderItem = useCallback<ListRenderItem<Skeleton | ForumPost>>(
    ({ item }) => {
      if ("isSkeleton" in item) {
        return <ForumSkeletonCard />;
      }
      return <ForumCard {...item} />;
    },
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
    <FlatList<Skeleton | ForumPost>
      data={isLoading ? createSkeletons(3) : forums}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading && !!data} onRefresh={refetch} />
      }
      ListEmptyComponent={
        <ListEmptyState
          isLoading={isLoading}
          isConnected={online}
          isError={isError}
          isEmpty={isEmpty}
          resourceName="forums"
          onRetry={refetch}
          disableOfflineReload={true}
        />
      }
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  loader: {
    marginVertical: 16,
  },
});
