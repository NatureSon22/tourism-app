import { ThreadReply } from "@/src/utils/forumReplies";
import { tokenStorage } from "@/src/utils/tokenStorage";
import { io, Socket } from "socket.io-client";

const BASE_URL =
  process.env.EXPO_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

const SOCKET_EVENT_REPLY_CREATED = "forum:replyCreated";
const SOCKET_EVENT_REPLY_TYPING = "forum:replyTyping";
const SOCKET_EVENT_JOIN_ROOM = "forum:joinRoom";
const SOCKET_EVENT_LEAVE_ROOM = "forum:leaveRoom";
const SOCKET_EVENT_SEND_REPLY = "forum:sendReply";

let socket: Socket | null = null;

const createSocket = async (): Promise<Socket> => {
  if (socket) {
    return socket;
  }

  const tokens = await tokenStorage.getTokens();

  socket = io(BASE_URL, {
    autoConnect: false,
    transports: ["websocket"],
    auth: {
      token: tokens?.accessToken,
    },
  });

  socket.on("connect_error", (error) => {
    console.warn("forumSocket connect_error", error);
  });

  socket.on("error", (error) => {
    console.warn("forumSocket error", error);
  });

  return socket;
};

export const connectForumSocket = async () => {
  const socketClient = await createSocket();
  if (!socketClient.connected) {
    socketClient.connect();
  }
  return socketClient;
};

export const disconnectForumSocket = () => {
  if (!socket) {
    return;
  }

  socket.off();
  socket.disconnect();
  socket = null;
};

export const joinForumRoom = async (postId: string | number) => {
  const socketClient = await connectForumSocket();
  socketClient.emit(SOCKET_EVENT_JOIN_ROOM, { postId: String(postId) });
};

export const leaveForumRoom = async (postId: string | number) => {
  if (!socket) {
    return;
  }

  socket.emit(SOCKET_EVENT_LEAVE_ROOM, { postId: String(postId) });
};

type ForumReplyPayload = ThreadReply & {
  postId: string | number;
};

export const onForumReply = async (
  postId: string | number,
  handler: (reply: ThreadReply) => void,
) => {
  const socketClient = await connectForumSocket();

  const wrappedHandler = (payload: ForumReplyPayload) => {
    if (String(payload.postId) !== String(postId)) {
      return;
    }
    handler(payload);
  };

  socketClient.on(SOCKET_EVENT_REPLY_CREATED, wrappedHandler);

  return () => {
    socketClient.off(SOCKET_EVENT_REPLY_CREATED, wrappedHandler);
  };
};

export type ForumReplyTypingPayload = {
  postId: string | number;
  userId: string;
  userName: string;
  clientId?: string | number;
};

export const onForumReplyTyping = async (
  postId: string | number,
  handler: (payload: ForumReplyTypingPayload) => void,
) => {
  const socketClient = await connectForumSocket();

  const wrappedHandler = (payload: ForumReplyTypingPayload) => {
    if (String(payload.postId) !== String(postId)) {
      return;
    }
    handler(payload);
  };

  socketClient.on(SOCKET_EVENT_REPLY_TYPING, wrappedHandler);

  return () => {
    socketClient.off(SOCKET_EVENT_REPLY_TYPING, wrappedHandler);
  };
};

export const emitForumReplyTyping = async (
  payload: ForumReplyTypingPayload,
) => {
  const socketClient = await connectForumSocket();
  socketClient.emit(SOCKET_EVENT_REPLY_TYPING, payload);
};

export type SendReplyPayload = {
  postId: string | number;
  comment: string;
  parentId?: number | null;
  clientId?: string | number;
};

export const emitForumReply = async (payload: SendReplyPayload) => {
  const socketClient = await connectForumSocket();
  socketClient.emit(SOCKET_EVENT_SEND_REPLY, payload);
};
