import { ForumType } from "@/src/constants/forumTypes";
import type { BookmarkPayload } from "@/src/services/api/bookmarkService";
import { bookmarkService } from "@/src/services/api/bookmarkService";
import type { ForumPost } from "@/src/types/forum";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { ForumResponse, forumService } from "../api/forumService";
import { bookmarkKeys } from "./useBookmark";

export const forumKeys = {
  all: () => ["forum"] as const,
  lists: (type?: ForumType) => [...forumKeys.all(), "list", type] as const,
  detail: (postId: string | number) =>
    [...forumKeys.all(), "detail", postId] as const,
};

type OptimisticForumContext = {
  previousDetail?: ForumPost;
  previousListQueries: [unknown, unknown][];
};

const getPreviousForumListQueries = (
  queryClient: ReturnType<typeof useQueryClient>,
) => queryClient.getQueriesData({ queryKey: ["forum", "list"], exact: false });

const patchForumCache = (
  queryClient: ReturnType<typeof useQueryClient>,
  postId: string | number,
  patchFn: (forum: ForumPost) => ForumPost,
) => {
  queryClient.setQueryData<ForumPost>(forumKeys.detail(postId), (oldData) =>
    oldData ? patchFn(oldData) : oldData,
  );

  queryClient.setQueriesData<ForumResponse>(
    { queryKey: ["forum", "list"], exact: false },
    (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        data: {
          ...oldData.data,
          listings: oldData.data.listings.map((forum) =>
            String(forum.id) === String(postId) ? patchFn(forum) : forum,
          ),
        },
      };
    },
  );
};

export const useGetAllForums = (type?: ForumType) => {
  return useQuery({
    queryKey: forumKeys.lists(type),
    queryFn: () => forumService.getAllForums(type),
    // staleTime: 1000 * 60 * 5,
    // select: (data) => ({
    //   ...data,
    //   data: {
    //     ...data.data,
    //     listings: data.data.listings.map((forumItem: any) => ({
    //       ...forumItem,
    //       id: String(forumItem.id),
    //     })),
    //   },
    // }),
  });
};

export const useGetForumDetails = (postId: string | number) => {
  return useQuery<ForumPost | undefined, Error>({
    queryKey: forumKeys.detail(postId),
    queryFn: () => forumService.getForumDetails(postId),
    enabled: !!postId,
    // staleTime: 1000 * 60 * 5,
  });
};

type PostIdPayload = { postId: string | number };
type CommentPayload = {
  postId: string | number;
  comment: string;
  parentId?: number | null;
};

const handleActionError = (error: any, actionName: string) => {
  Alert.alert(
    `${actionName} Failed`,
    error?.response?.data?.message ||
      `Unable to ${actionName.toLowerCase()} right now.`,
  );
  console.error(`${actionName} error:`, error);
};

export const useLikeForum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: PostIdPayload) => forumService.likePost(postId),
    onMutate: async ({ postId }: PostIdPayload) => {
      await queryClient.cancelQueries({ queryKey: forumKeys.detail(postId) });
      await queryClient.cancelQueries({
        queryKey: ["forum", "list"],
        exact: false,
      });

      const previousDetail = queryClient.getQueryData<ForumPost>(
        forumKeys.detail(postId),
      );
      const previousListQueries = getPreviousForumListQueries(queryClient);

      patchForumCache(queryClient, postId, (forum) => {
        const hadLiked = forum.userInteractions?.hasLiked ?? false;
        const hadDisliked = forum.userInteractions?.hasDisliked ?? false;

        return {
          ...forum,
          stats: {
            ...forum.stats,
            likes: hadLiked ? forum.stats.likes : forum.stats.likes + 1,
            dislikes: hadDisliked
              ? Math.max(forum.stats.dislikes - 1, 0)
              : forum.stats.dislikes,
          },
          userInteractions: {
            ...forum.userInteractions,
            hasLiked: true,
            hasDisliked: false,
          },
        };
      });

      return { previousDetail, previousListQueries };
    },
    onError: (error, variables, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(
          forumKeys.detail(variables.postId),
          context.previousDetail,
        );
      }
      context?.previousListQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      // handleActionError(error, "Like");
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: forumKeys.detail(variables.postId),
      });
      queryClient.invalidateQueries({
        queryKey: ["forum", "list"],
        exact: false,
      });
    },
  });
};

export const useDislikeForum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: PostIdPayload) => forumService.dislikePost(postId),
    onMutate: async ({ postId }: PostIdPayload) => {
      await queryClient.cancelQueries({ queryKey: forumKeys.detail(postId) });
      await queryClient.cancelQueries({
        queryKey: ["forum", "list"],
        exact: false,
      });

      const previousDetail = queryClient.getQueryData<ForumPost>(
        forumKeys.detail(postId),
      );
      const previousListQueries = getPreviousForumListQueries(queryClient);

      patchForumCache(queryClient, postId, (forum) => {
        const hadLiked = forum.userInteractions?.hasLiked ?? false;
        const hadDisliked = forum.userInteractions?.hasDisliked ?? false;

        return {
          ...forum,
          stats: {
            ...forum.stats,
            likes: hadLiked
              ? Math.max(forum.stats.likes - 1, 0)
              : forum.stats.likes,
            dislikes: hadDisliked
              ? forum.stats.dislikes
              : forum.stats.dislikes + 1,
          },
          userInteractions: {
            ...forum.userInteractions,
            hasLiked: false,
            hasDisliked: true,
          },
        };
      });

      return { previousDetail, previousListQueries };
    },
    onError: (error, variables, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(
          forumKeys.detail(variables.postId),
          context.previousDetail,
        );
      }
      context?.previousListQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      handleActionError(error, "Dislike");
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: forumKeys.detail(variables.postId),
      });
      queryClient.invalidateQueries({
        queryKey: ["forum", "list"],
        exact: false,
      });
    },
  });
};

export const useCommentForum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, comment }: CommentPayload) =>
      forumService.commentPost(postId, comment),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: forumKeys.detail(variables.postId),
      });
      // Alert.alert("Comment Posted", "Your comment is now visible.");
    },
    onError: (error) => handleActionError(error, "Comment"),
  });
};

export const useBookmarkForum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookmarkableId, bookmarkableType }: BookmarkPayload) =>
      bookmarkService.addBookmark({ bookmarkableId, bookmarkableType }),
    onMutate: async ({ bookmarkableId }: BookmarkPayload) => {
      await queryClient.cancelQueries({
        queryKey: forumKeys.detail(bookmarkableId),
      });
      await queryClient.cancelQueries({
        queryKey: ["forum", "list"],
        exact: false,
      });

      const previousDetail = queryClient.getQueryData<ForumPost>(
        forumKeys.detail(bookmarkableId),
      );
      const previousListQueries = getPreviousForumListQueries(queryClient);

      patchForumCache(queryClient, bookmarkableId, (forum) => ({
        ...forum,
        userInteractions: {
          ...forum.userInteractions,
          hasBookmarked: !(forum.userInteractions?.hasBookmarked ?? false),
        },
      }));

      return { previousDetail, previousListQueries };
    },
    onError: (error, variables, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(
          forumKeys.detail(variables.bookmarkableId),
          context.previousDetail,
        );
      }
      context?.previousListQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      // handleActionError(error, "Bookmark");
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: forumKeys.detail(variables.bookmarkableId),
      });
      queryClient.invalidateQueries({
        queryKey: ["forum", "list"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
        exact: false,
      });
    },
  });
};

export const useShareForum = () => {
  return useMutation({
    mutationFn: ({ postId }: PostIdPayload) => forumService.sharePost(postId),
    onSuccess: () => {
      // Alert.alert("Shared", "The post was shared successfully.");
    },
    onError: (error) => handleActionError(error, "Share"),
  });
};

export const useJoinForum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: PostIdPayload) => forumService.joinPost(postId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: forumKeys.detail(variables.postId),
      });
      Alert.alert("Joined", "You have joined this discussion group.");
    },
    onError: (error) => handleActionError(error, "Join"),
  });
};
