import { ForumComment } from "@/src/types/forum";

export type ThreadReply = ForumComment & {
  depth: number;
  replyTo?: string;
  parentId?: string | null;
};

export const buildThreadedReplies = (
  comments: {
    id: string | number;
    content: string;
    author?: {
      id?: string | number;
      name?: string;
      userName?: string;
      avatarUrl?: string;
      profilePictureUrl?: string;
    };
    createdAt: string | Date;
    likes: number;
    dislikes: number;
    viewers?: number;
    media?: any[];
    replies?: any[];
  }[] = [],
): ThreadReply[] => {
  const result: ThreadReply[] = [];

  const normalizeReply = (
    item: any,
    parentId: string | null,
    depth: number,
    replyTo?: string,
  ): ThreadReply => ({
    id: String(item.id),
    content: item.content,
    author: {
      id: String(item.author?.id ?? "0"),
      name: item.author?.name || item.author?.userName || "Anonymous",
      avatar: item.author?.avatarUrl || item.author?.profilePictureUrl,
    },
    createdAt:
      typeof item.createdAt === "string"
        ? item.createdAt
        : (item.createdAt?.toISOString?.() ?? String(item.createdAt)),
    stats: {
      likes: item.likes ?? 0,
      dislikes: item.dislikes ?? 0,
    },
    userInteractions: {
      hasLiked: false,
      hasDisliked: false,
    },
    replies: [],
    media: item.media,
    parentId,
    depth,
    replyTo,
  });

  const walkReplies = (
    item: any,
    parentId: string | null,
    depth: number,
    replyTo?: string,
  ) => {
    result.push(normalizeReply(item, parentId, depth, replyTo));

    if (item.replies && item.replies.length > 0) {
      item.replies.forEach((child: any) =>
        walkReplies(
          child,
          String(item.id),
          depth + 1,
          item.author?.name || item.author?.userName,
        ),
      );
    }
  };

  comments.forEach((comment) => walkReplies(comment, null, 0));

  return result;
};

export const groupRepliesByParent = (
  replies: ThreadReply[],
): Map<string, ThreadReply[]> => {
  return replies.reduce((map, reply) => {
    if (reply.parentId != null) {
      const children = map.get(reply.parentId) ?? [];
      map.set(reply.parentId, [...children, reply]);
    }
    return map;
  }, new Map<string, ThreadReply[]>());
};

export const getVisibleReplies = (
  replies: ThreadReply[],
  expandedReplies: Set<string>,
): ThreadReply[] => {
  if (expandedReplies.size === 0) {
    return replies.filter((reply) => reply.parentId == null);
  }

  return replies.filter((reply) => {
    if (reply.parentId == null) {
      return true;
    }

    let currentParent: string | null = reply.parentId;
    while (currentParent != null) {
      if (!expandedReplies.has(currentParent)) {
        return false;
      }
      const parent = replies.find((item) => item.id === currentParent);
      currentParent = parent?.parentId ?? null;
    }

    return true;
  });
};

export const insertReply = (
  reply: ThreadReply,
  parentId: string | null,
  currentReplies: ThreadReply[],
) => {
  if (!parentId) {
    return [...currentReplies, reply];
  }

  const parentIndex = currentReplies.findIndex((item) => item.id === parentId);
  if (parentIndex === -1) {
    return [...currentReplies, reply];
  }

  const parentDepth = currentReplies[parentIndex].depth;
  let insertAt = parentIndex + 1;

  while (
    insertAt < currentReplies.length &&
    currentReplies[insertAt].depth > parentDepth
  ) {
    insertAt += 1;
  }

  return [
    ...currentReplies.slice(0, insertAt),
    reply,
    ...currentReplies.slice(insertAt),
  ];
};
