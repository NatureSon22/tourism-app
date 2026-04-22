import { Colors, Typography } from "@/src/constants/styles";
import { ForumComment } from "@/src/types/forum";

import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";
import AppVideoPlayer from "./AppVideoPlayer";

type ThreadReply = ForumComment & {
  depth: number;
  replyTo?: string;
  childCount?: number;
  isExpanded?: boolean;
};

type ReplyItemProps = {
  reply: ThreadReply;
  isLiked?: boolean;
  onToggleLike: (replyId: string) => void;
  onReplyPress: (reply: ThreadReply) => void;
  onToggleReplies: (reply: ThreadReply) => void;
};

function ReplyItem({
  reply,
  isLiked,
  onToggleLike,
  onReplyPress,
  onToggleReplies,
}: ReplyItemProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const likedCount = reply.stats.likes + (isLiked ? 1 : 0);
  const mediaItems = reply.media ?? [];

  return (
    <View style={[styles.card, { marginLeft: reply.depth * 14 }]}>
      <View style={styles.headline}>
        <Image source={{ uri: reply.author?.avatar }} style={styles.avatar} />
        <View style={styles.meta}>
          <Text style={styles.author}>{reply.author?.name ?? "Anonymous"}</Text>
          <Text style={styles.timestamp}>
            {new Date(reply.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </Text>
        </View>
      </View>

      <Text style={styles.content}>{reply.content}</Text>

      {mediaItems.length > 0 ? (
        <View style={styles.mediaCard}>
          <PagerView
            style={styles.mediaPager}
            onPageSelected={(event) =>
              setCurrentMediaIndex(event.nativeEvent.position)
            }
            initialPage={0}
          >
            {mediaItems.map((item, index) => (
              <View key={item.id} style={styles.mediaPage}>
                {item.type === "video" ? (
                  <AppVideoPlayer
                    url={item.url ?? item.src ?? ""}
                    isActive={currentMediaIndex === index}
                  />
                ) : (
                  <Image
                    source={{ uri: item.url ?? item.src ?? "" }}
                    style={styles.mediaImage}
                    contentFit="cover"
                  />
                )}
              </View>
            ))}
          </PagerView>

          {mediaItems.length > 1 ? (
            <View style={styles.mediaPagination}>
              {mediaItems.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentMediaIndex
                      ? styles.activeDot
                      : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>
          ) : null}
        </View>
      ) : null}

      {reply.replyTo ? (
        <Text style={styles.replyTo}>Replying to @{reply.replyTo}</Text>
      ) : null}

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onToggleLike(reply.id)}
        >
          <AntDesign
            name="like"
            size={14}
            color={isLiked ? Colors.primary : Colors.textMuted}
          />
          <Text style={[styles.actionText, isLiked && styles.activeText]}>
            {likedCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onReplyPress(reply)}
        >
          <MaterialIcons name="reply" size={14} color={Colors.textMuted} />
          <Text style={styles.actionText}>Reply</Text>
        </TouchableOpacity>

        {/* button to toggle replies if there are any */}
        {reply.childCount ? (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => onToggleReplies(reply)}
          >
            <Text style={styles.toggleButtonText}>
              {reply.isExpanded
                ? "Hide Replies"
                : `View ${reply.childCount} Replies`}
            </Text>
            <AntDesign
              name={reply.isExpanded ? "down" : "right"}
              size={14}
              color={Colors.primary}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {reply.depth > 0 && (
        <MaterialCommunityIcons
          name="arrow-right-bottom"
          size={24}
          color="black"
          style={styles.replyIcon}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 12,
    position: "relative",
    paddingHorizontal: 12,
  },
  headline: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.border,
    marginRight: 10,
  },
  meta: {
    flex: 1,
  },
  author: {
    fontSize: 13,
    fontFamily: Typography.family.bold,
    color: Colors.text,
  },
  timestamp: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  content: {
    color: Colors.text,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 10,
    fontFamily: Typography.family.regular,
  },
  mediaCard: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.border,
    marginBottom: 10,
  },
  mediaPager: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  mediaPage: {
    width: "100%",
    height: "100%",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
  },
  mediaPagination: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    backgroundColor: Colors.surface,
    width: 14,
  },
  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  replyTo: {
    color: Colors.primary,
    fontSize: 11,
    marginBottom: 10,
    fontFamily: Typography.family.regular,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  toggleButtonText: {
    color: Colors.primary,
    fontSize: 11,
    fontFamily: Typography.family.medium,
  },
  actionText: {
    color: Colors.textMuted,
    fontSize: 11,
    fontFamily: Typography.family.medium,
  },
  activeText: {
    color: Colors.primary,
  },
  replyIcon: {
    position: "absolute",
    top: -6,
    left: -20,
  },
});

export default React.memo(ReplyItem);
