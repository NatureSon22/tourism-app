import { ForumPost } from "@/src/constants/forum";
import { ForumType } from "@/src/constants/forumTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { forumService } from "../api/forumService";

export type ForumResponse = {
  data: {
    listings: ForumPost[];
    pagination?: {
      count: number;
      currentPage: number;
      limit: number;
      total: number;
    };
  };
};

export const forumKeys = {
  all: () => ["forum"] as const,
  lists: (type?: ForumType) => [...forumKeys.all(), "list", type] as const,
  detail: (postId: string | number) =>
    [...forumKeys.all(), "detail", postId] as const,
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
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: forumKeys.detail(variables.postId),
      });
    },
    onError: (error) => handleActionError(error, "Like"),
  });
};

export const useDislikeForum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: PostIdPayload) => forumService.dislikePost(postId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: forumKeys.detail(variables.postId),
      });
    },
    onError: (error) => handleActionError(error, "Dislike"),
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
      Alert.alert("Comment Posted", "Your comment is now visible.");
    },
    onError: (error) => handleActionError(error, "Comment"),
  });
};

export const useBookmarkForum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: PostIdPayload) =>
      forumService.bookmarkPost(postId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: forumKeys.detail(variables.postId),
      });
    },
    onError: (error) => handleActionError(error, "Bookmark"),
  });
};

export const useShareForum = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: PostIdPayload) => forumService.sharePost(postId),
    onSuccess: () => {
      Alert.alert("Shared", "The post was shared successfully.");
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
