import { User } from "../stores/authStore";
type MediaType = "image" | "video";

export type Attachment = {
  id: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string; // Essential for video previews
};

export type Author = {
  id: number;
  name: string;
  avatarUrl: string;
};

export type Reply = {
  id: number;
  content: string;
  author: Partial<User>;
  createdAt: Date;
  likes: number;
  dislikes: number;
  viewers: number;
  parentId?: number | null;
  media?: Attachment[];
};

export type Comment = Reply & {
  replies?: Reply[];
};

export type ForumPost = {
  id: number;
  title: string;
  content: string;
  category: string;
  place: string;
  author: Partial<User>;
  viewers: number;
  likes: number;
  dislikes: number;
  createdAt: Date;
  comments: Comment[];
  commentCount: number;
  media?: Attachment[]; // Media added to the main post
  type: string;
};

export type Community = {
  id: string;
  name: string;
};

export type Location = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

// example: My Current Location
// example: Bonifacio High Street, Central BGC
