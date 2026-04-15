import ReplyComposer from "@/src/components/app/forum/ReplyComposer";
import ReplyItem from "@/src/components/app/forum/ReplyItem";
import HeaderWithBack from "@/src/components/app/HeaderWithBack";
import { Colors, Typography } from "@/src/constants/styles";
import SafeArea from "@/src/layouts/SafeArea";
import {
  useCommentForum,
  useGetForumDetails,
} from "@/src/services/request/useForum";
import {
  connectForumSocket,
  disconnectForumSocket,
  emitForumReply,
  emitForumReplyTyping,
  joinForumRoom,
  leaveForumRoom,
  onForumReply,
  onForumReplyTyping,
  type ForumReplyTypingPayload,
} from "@/src/services/socket/forumSocket";
import useAuthStore from "@/src/stores/authStore";
import {
  buildThreadedReplies,
  getVisibleReplies,
  groupRepliesByParent,
  insertReply as insertThreadReply,
  ThreadReply,
} from "@/src/utils/forumReplies";
import { Stack, useLocalSearchParams } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ForumReplies() {
  const params = useLocalSearchParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: forum, isLoading } = useGetForumDetails(idParam ?? "");
  const [replies, setReplies] = useState<ThreadReply[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [activeReplyParentId, setActiveReplyParentId] = useState<number | null>(
    null,
  );
  const [activeReplyTarget, setActiveReplyTarget] = useState<string | null>(
    null,
  );
  const [likedReplies, setLikedReplies] = useState<Record<number, boolean>>({});
  const [expandedReplies, setExpandedReplies] = useState<Set<number>>(
    new Set(),
  );
  const currentUser = useAuthStore((state) => state.user);
  const replyMutation = useCommentForum();
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const typingTimeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {},
  );
  const typingDebounceTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    if (forum) {
      setReplies(buildThreadedReplies(forum.comments || []));
    }
  }, [forum]);

  const handleSocketReply = useCallback((incomingReply: ThreadReply) => {
    setReplies((current) => {
      if (current.some((reply) => reply.id === incomingReply.id)) {
        return current;
      }

      const parentDepth = incomingReply.parentId
        ? (current.find((reply) => reply.id === incomingReply.parentId)
            ?.depth ?? 0)
        : 0;

      return insertThreadReply(
        {
          ...incomingReply,
          depth: incomingReply.parentId ? parentDepth + 1 : 0,
        },
        incomingReply.parentId ?? null,
        current,
      );
    });
  }, []);

  const handleRemoteTyping = useCallback(
    (payload: ForumReplyTypingPayload) => {
      if (payload.userId === currentUser?.id) return;

      setTypingUsers((current) => {
        if (current.includes(payload.userName)) return current;
        return [...current, payload.userName];
      });

      const timeoutKey = String(payload.userId);
      if (typingTimeouts.current[timeoutKey]) {
        clearTimeout(typingTimeouts.current[timeoutKey]);
      }

      typingTimeouts.current[timeoutKey] = setTimeout(() => {
        setTypingUsers((current) =>
          current.filter((name) => name !== payload.userName),
        );
        delete typingTimeouts.current[timeoutKey];
      }, 3000);
    },
    [currentUser?.id],
  );

  const handleTyping = useCallback(() => {
    if (!forum || !currentUser) return;

    if (typingDebounceTimer.current) {
      clearTimeout(typingDebounceTimer.current);
    }

    typingDebounceTimer.current = setTimeout(() => {
      emitForumReplyTyping({
        postId: forum.id,
        userId: currentUser.id,
        userName: currentUser.userName,
        clientId: Date.now(),
      }).catch((error: unknown) => {
        console.warn("Failed to emit typing event", error);
      });
      typingDebounceTimer.current = null;
    }, 300);
  }, [currentUser, forum]);

  useEffect(() => {
    if (!idParam) {
      return;
    }

    const timeouts = typingTimeouts.current;
    let unsubscribe: (() => void) | undefined;
    let typingUnsubscribe: (() => void) | undefined;
    const roomId = String(idParam);

    const setupSocket = async () => {
      try {
        await connectForumSocket();
        await joinForumRoom(roomId);
        unsubscribe = await onForumReply(roomId, handleSocketReply);
        typingUnsubscribe = await onForumReplyTyping(
          roomId,
          handleRemoteTyping,
        );
      } catch (error) {
        console.warn("Forum socket setup failed", error);
      }
    };

    setupSocket();

    return () => {
      unsubscribe?.();
      typingUnsubscribe?.();
      Object.values(timeouts).forEach(clearTimeout);
      if (typingDebounceTimer.current) {
        clearTimeout(typingDebounceTimer.current);
        typingDebounceTimer.current = null;
      }
      leaveForumRoom(roomId);
      disconnectForumSocket();
    };
  }, [handleRemoteTyping, handleSocketReply, idParam]);

  const replyChildrenMap = useMemo(
    () => groupRepliesByParent(replies),
    [replies],
  );

  const visibleReplies = useMemo(
    () => getVisibleReplies(replies, expandedReplies),
    [replies, expandedReplies],
  );

  const replyChildCountMap = useMemo(() => {
    const map = new Map<number, number>();
    replyChildrenMap.forEach((children, parentId) => {
      map.set(parentId, children.length);
    });
    return map;
  }, [replyChildrenMap]);

  const handleToggleLike = useCallback((replyId: number) => {
    setLikedReplies((prev) => ({
      ...prev,
      [replyId]: !prev[replyId],
    }));
  }, []);

  const handleReplyPress = useCallback((reply: ThreadReply) => {
    setActiveReplyParentId(reply.id);
    setActiveReplyTarget(reply.author?.userName ?? "user");
  }, []);

  const handleClearReplyTarget = useCallback(() => {
    setActiveReplyParentId(null);
    setActiveReplyTarget(null);
  }, []);

  const handleToggleReplies = useCallback((reply: ThreadReply) => {
    setExpandedReplies((prev) => {
      const next = new Set(prev);
      if (next.has(reply.id)) {
        next.delete(reply.id);
      } else {
        next.add(reply.id);
      }
      return next;
    });
  }, []);

  const handleSubmitReply = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed || !forum) return;

    const parentReply = activeReplyParentId
      ? replies.find((reply) => reply.id === activeReplyParentId)
      : undefined;

    const newReply: ThreadReply = {
      id: Date.now(),
      content: trimmed,
      author: currentUser ?? {
        id: "0",
        userName: "You",
        profilePictureUrl: "",
        email: "",
        firstName: "",
        lastName: "",
      },
      createdAt: new Date(),
      likes: 0,
      dislikes: 0,
      viewers: 0,
      parentId: activeReplyParentId,
      depth: parentReply ? parentReply.depth + 1 : 0,
      replyTo: activeReplyTarget || undefined,
    };

    setReplies((current) =>
      insertThreadReply(newReply, activeReplyParentId, current),
    );
    setInputValue("");
    handleClearReplyTarget();

    replyMutation.mutate(
      {
        postId: forum.id,
        comment: trimmed,
        parentId: activeReplyParentId,
      },
      {
        onError: () => {
          // Keep the optimistic reply in the UI and alert if needed.
        },
      },
    );

    emitForumReply({
      postId: forum.id,
      comment: trimmed,
      parentId: activeReplyParentId,
      clientId: newReply.id,
    }).catch((error) => {
      console.warn("Failed to emit forum reply", error);
    });
  }, [
    activeReplyParentId,
    activeReplyTarget,
    currentUser,
    forum,
    handleClearReplyTarget,
    inputValue,
    replyMutation,
    replies,
  ]);

  const renderedReplies = visibleReplies;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!forum) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Forum post not found.</Text>
      </View>
    );
  }

  return (
    <SafeArea edges={["top", "bottom"]}>
      <Stack.Screen options={{ contentStyle: { backgroundColor: "white" } }} />

      <KeyboardAvoidingView
        style={styles.container}
        contentContainerStyle={{ backgroundColor: "yellow" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.wrapper}>
          <HeaderWithBack
            suffix={
              <Text
                style={{
                  fontFamily: Typography.family.medium,
                  color: Colors.textMuted,
                }}
              >{`${forum.comments?.length} replies`}</Text>
            }
            suffixContainerStyle={{ flex: 0.4 }}
          />
          {typingUsers.length > 0 ? (
            <Text style={styles.typingIndicator}>
              {typingUsers.length === 1
                ? `${typingUsers[0]} is replying...`
                : `${typingUsers.join(", ")} are replying...`}
            </Text>
          ) : null}
          <FlatList
            data={renderedReplies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ReplyItem
                reply={{
                  ...item,
                  childCount: replyChildCountMap.get(item.id) ?? 0,
                  isExpanded: expandedReplies.has(item.id),
                }}
                isLiked={Boolean(likedReplies[item.id])}
                onToggleLike={handleToggleLike}
                onReplyPress={handleReplyPress}
                onToggleReplies={handleToggleReplies}
              />
            )}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
          />
        </View>

        <ReplyComposer
          value={inputValue}
          onChangeText={setInputValue}
          onTyping={handleTyping}
          onSubmit={handleSubmitReply}
          placeholder={
            activeReplyTarget
              ? `Replying to @${activeReplyTarget}`
              : "Write a reply..."
          }
          isLoading={replyMutation.isPending}
          disabled={!inputValue.trim() || replyMutation.isPending}
          activeReplyTarget={activeReplyTarget}
          onCancelReply={handleClearReplyTarget}
        />
      </KeyboardAvoidingView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontFamily: Typography.family.medium,
  },
  listContent: {
    padding: 16,
    paddingBottom: 50,
  },
  postContainer: {
    marginBottom: 24,
    backgroundColor: "white",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  postTitle: {
    fontSize: 16,
    fontFamily: Typography.family.bold,
    color: Colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    fontFamily: Typography.family.regular,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 14,
  },
  repliesHeadline: {
    fontSize: 13,
    fontFamily: Typography.family.medium,
    color: Colors.textMuted,
    marginTop: 12,
  },
  typingIndicator: {
    fontSize: 12,
    color: Colors.primary,
    fontFamily: Typography.family.medium,
    marginBottom: 12,
  },
  footer: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 24 : 16,
  },
  replyTargetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  replyTargetText: {
    color: Colors.text,
    fontFamily: Typography.family.medium,
    fontSize: 12,
  },
  cancelText: {
    color: Colors.primary,
    fontFamily: Typography.family.medium,
    fontSize: 12,
  },
  composerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  inputContainer: {
    flex: 1,
    minHeight: 54,
    marginRight: 12,
  },
  input: {
    fontSize: 14,
    paddingVertical: 12,
  },
  sendButton: {
    minWidth: 80,
    paddingVertical: 14,
    borderRadius: 14,
  },
});
