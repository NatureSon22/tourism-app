import {
  useBookmarkForum,
  useDislikeForum,
  useJoinForum,
  useLikeForum,
  useShareForum,
} from "@/src/services/request/useForum";
import type { ForumPost } from "@/src/types/forum";
import { createForumLink } from "@/src/utils/appLinking";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Share, StyleSheet } from "react-native";
import { ForumContent } from "./ForumContent";
import { ForumFooter } from "./ForumFooter";
import { ForumHeader } from "./ForumHeader";

type ForumCardProps = ForumPost;

export default function ForumCard({
  id,
  author,
  category,
  place,
  content,
  media,
  location,
  stats,
  userInteractions,
}: ForumCardProps) {
  const {
    likes = 0,
    dislikes = 0,
    viewers = 0,
    commentCount = 0,
  } = stats ?? {};
  const displayPlace = location?.formatted ?? place ?? "Location not available";
  const displayCategory = category ?? "";
  const {
    hasLiked = false,
    hasDisliked = false,
    hasBookmarked = false,
  } = userInteractions ?? {};
  const [likesCount, setLikesCount] = useState(likes);
  const [dislikesCount, setDislikesCount] = useState(dislikes);
  const [liked, setLiked] = useState(hasLiked);
  const [disliked, setDisliked] = useState(hasDisliked);
  const [bookmarked, setBookmarked] = useState(hasBookmarked);
  const [joined, setJoined] = useState(false);
  const router = useRouter();

  const likeMutation = useLikeForum();
  const dislikeMutation = useDislikeForum();
  const bookmarkMutation = useBookmarkForum();
  const shareMutation = useShareForum();
  const joinMutation = useJoinForum();

  const handleLike = () => {
    if (!id || likeMutation.isPending || liked) return;

    const wasDisliked = disliked;
    setLiked(true);
    setLikesCount((prev) => prev + 1);

    if (wasDisliked) {
      setDisliked(false);
      setDislikesCount((prev) => Math.max(prev - 1, 0));
    }

    likeMutation.mutate(
      { postId: id },
      {
        onError: () => {
          setLiked(false);
          setLikesCount((prev) => Math.max(prev - 1, 0));
          if (wasDisliked) {
            setDisliked(true);
            setDislikesCount((prev) => prev + 1);
          }
        },
      },
    );
  };

  const handleDislike = () => {
    if (!id || dislikeMutation.isPending || disliked) return;

    const wasLiked = liked;
    setDisliked(true);
    setDislikesCount((prev) => prev + 1);

    if (wasLiked) {
      setLiked(false);
      setLikesCount((prev) => Math.max(prev - 1, 0));
    }

    dislikeMutation.mutate(
      { postId: id },
      {
        onError: () => {
          setDisliked(false);
          setDislikesCount((prev) => Math.max(prev - 1, 0));
          if (wasLiked) {
            setLiked(true);
            setLikesCount((prev) => prev + 1);
          }
        },
      },
    );
  };

  const handleComment = () => {
    if (!id) return;
    router.push({ pathname: `/forum/[id]/replies`, params: { id } });
  };

  const handleBookmark = () => {
    if (!id || bookmarkMutation.isPending) return;

    const wasBookmarked = bookmarked;
    setBookmarked(!wasBookmarked);

    bookmarkMutation.mutate(
      {
        bookmarkableId: id,
        bookmarkableType: "Forum",
      },
      {
        onError: () => {
          setBookmarked(wasBookmarked);
        },
      },
    );
  };

  const handleShare = async () => {
    if (!id || shareMutation.isPending) return;

    const url = createForumLink(id);

    try {
      await Share.share({
        title: "Check out this forum post",
        message: url,
        url,
      });
    } catch (error) {
      console.error("Failed to open share sheet:", error);
    }

    shareMutation.mutate({ postId: id });
  };

  const handleJoin = () => {
    console.log("Join forum with id:", id);
    if (!id || joinMutation.isPending || joined) return;

    setJoined(true);
    joinMutation.mutate(
      { postId: id },
      {
        onError: () => {
          setJoined(false);
        },
      },
    );
  };

  return (
    <Pressable
      style={cardStyles.wrapper}
      android_ripple={{ color: "#efefef" }}
      onPress={handleComment}
    >
      <ForumHeader
        author={author}
        category={displayCategory}
        place={displayPlace}
        joined={joined}
        isJoining={joinMutation.isPending}
        onJoinPress={handleJoin}
      />

      <ForumContent content={content} media={media} />

      <ForumFooter
        viewers={viewers}
        likes={likesCount}
        dislikes={dislikesCount}
        commentCount={commentCount}
        liked={liked}
        disliked={disliked}
        bookmarked={bookmarked}
        onLike={handleLike}
        onDislike={handleDislike}
        onComment={handleComment}
        onBookmark={handleBookmark}
        onShare={handleShare}
        isSharing={shareMutation.isPending}
      />
    </Pressable>
  );
}

const cardStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderColor: "#c4c3c380",
    paddingVertical: 20,
    paddingHorizontal: 15,
    gap: 20,
  },
});
