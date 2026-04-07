import { Comment, Reply } from "@/src/types/forum";

export type ThreadReply = Reply & {
  depth: number;
  replyTo?: string;
  parentId?: number | null;
};

export const buildThreadedReplies = (
  comments: Comment[] = [],
): ThreadReply[] => {
  const result: ThreadReply[] = [];

  const walkReplies = (
    item: Reply & { replies?: Reply[] },
    parentId: number | null,
    depth: number,
    replyTo?: string,
  ) => {
    result.push({
      ...item,
      parentId,
      depth,
      replyTo,
    });

    if (item.replies && item.replies.length > 0) {
      item.replies.forEach((child) =>
        walkReplies(
          child as Reply & { replies?: Reply[] },
          item.id,
          depth + 1,
          item.author?.userName,
        ),
      );
    }
  };

  comments.forEach((comment) =>
    walkReplies(comment as Reply & { replies?: Reply[] }, null, 0),
  );

  return result;
};

export const groupRepliesByParent = (
  replies: ThreadReply[],
): Map<number, ThreadReply[]> => {
  return replies.reduce((map, reply) => {
    if (reply.parentId != null) {
      const children = map.get(reply.parentId) ?? [];
      map.set(reply.parentId, [...children, reply]);
    }
    return map;
  }, new Map<number, ThreadReply[]>());
};

export const getVisibleReplies = (
  replies: ThreadReply[],
  expandedReplies: Set<number>,
): ThreadReply[] => {
  if (expandedReplies.size === 0) {
    return replies.filter((reply) => reply.parentId == null);
  }

  return replies.filter((reply) => {
    if (reply.parentId == null) {
      return true;
    }

    let currentParent: number | null = reply.parentId;
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
  parentId: number | null,
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
