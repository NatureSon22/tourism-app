import { Colors } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ForumFooterProps = {
  viewers?: number;
  likes: number;
  dislikes: number;
  commentCount: number;
  liked?: boolean;
  disliked?: boolean;
  bookmarked?: boolean;
  isLiking?: boolean;
  isDisliking?: boolean;
  isCommenting?: boolean;
  isBookmarking?: boolean;
  isSharing?: boolean;
  onLike: () => void;
  onDislike: () => void;
  onComment: () => void;
  onBookmark: () => void;
  onShare: () => void;
};

export const ForumFooter = ({
  viewers,
  likes,
  dislikes,
  commentCount,
  liked,
  disliked,
  bookmarked,
  onLike,
  onDislike,
  onComment,
  onBookmark,
  onShare,
  isLiking,
  isDisliking,
  isCommenting,
  isBookmarking,
  isSharing,
}: ForumFooterProps) => (
  <View style={footerStyles.container}>
    <HStack gap={6}>
      <ActionButton
        icon={
          <AntDesign
            name="like"
            size={13}
            color={liked ? Colors.primary : Colors.textMuted}
          />
        }
        title={likes.toString()}
        onPress={onLike}
        isLoading={isLiking}
        active={liked}
      />

      <ActionButton
        icon={
          <AntDesign
            name="like"
            size={13}
            style={{ transform: [{ scaleY: -1 }] }}
            color={disliked ? Colors.primary : Colors.textMuted}
          />
        }
        onPress={onDislike}
        isLoading={isDisliking}
        active={disliked}
      />

      <ActionButton
        icon={<AntDesign name="comment" size={13} color={Colors.textMuted} />}
        title={commentCount.toString()}
        onPress={onComment}
        isLoading={isCommenting}
      />
    </HStack>

    <HStack gap={4}>
      <Ionicons name="eye-outline" size={15} color={Colors.text} />
      <Text style={footerStyles.statsText}>{viewers}</Text>
    </HStack>

    <HStack gap={2}>
      <ActionButton
        icon={
          <MaterialIcons
            name={bookmarked ? "bookmark" : "bookmark-border"}
            size={15}
            color={bookmarked ? Colors.primary : Colors.textMuted}
          />
        }
        onPress={onBookmark}
        isLoading={isBookmarking}
        active={bookmarked}
      />
      <ActionButton
        icon={
          <Feather
            name="share-2"
            size={14}
            color={isSharing ? Colors.primary : Colors.textMuted}
          />
        }
        onPress={onShare}
        isLoading={isSharing}
      />
    </HStack>
  </View>
);

type ActionButtonProps = {
  icon: React.ReactNode;
  title?: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  active?: boolean;
};

const ActionButton = ({
  icon,
  title,
  onPress,
  isLoading = false,
  disabled = false,
  active = false,
}: ActionButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        footerStyles.btn,
        active && footerStyles.activeBtn,
        isDisabled && footerStyles.disabledBtn,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={active ? Colors.primary : Colors.textMuted}
        />
      ) : (
        <View style={footerStyles.buttonContent}>
          {icon}
          {title ? (
            <Text
              style={[footerStyles.btnText, active && footerStyles.activeText]}
            >
              {title}
            </Text>
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

const footerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: "white",
    borderColor: "white",
  },
  activeBtn: {
    backgroundColor: "#eef3ff",
    borderColor: Colors.primary,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  btnText: { fontSize: 10, color: Colors.textMuted },
  activeText: {
    color: Colors.primary,
  },
  statsText: { fontSize: 10, color: Colors.text },
});
