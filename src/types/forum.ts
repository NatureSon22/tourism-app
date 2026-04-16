type MediaType = "image" | "video";

export type Media = {
  id: string;
  type: MediaType;
  alt?: string;
  src?: string;
  url?: string;
  thumbnailUrl?: string;
};

export type Author = {
  id: string;
  name: string;
  avatar?: string;
  avatarUrl?: string;
  profilePictureUrl?: string;
  userName?: string;
  isVerified?: boolean;
};

export type Location = {
  id: string;
  name: string;
  address: string;
  formatted?: string;
  lat: number;
  lng: number;
  region?: string;
  region_code?: string;
  province?: string;
  province_code?: string;
  city?: string;
  city_code?: string;
  barangay?: string;
  street?: string;
  postal_code?: string;
  is_primary?: boolean;
};

export type ForumComment = {
  id: string;
  parentId: string | null;
  content: string;
  author: Author;
  media?: Media[];
  stats: {
    likes: number;
    dislikes: number;
  };
  userInteractions: {
    hasLiked: boolean;
    hasDisliked: boolean;
  };
  replies?: ForumComment[];
  createdAt: string;
};

export type ForumPost = {
  id: string;
  title: string;
  content: string;

  community: {
    id: string;
    title: string;
  };

  listing_id?: string;
  type?: string;
  category?: string;
  place?: string;

  author: Author;
  location?: Location;
  media?: Media[];

  stats: {
    viewers: number;
    likes: number;
    dislikes: number;
    commentCount: number;
  };

  userInteractions: {
    hasLiked: boolean;
    hasDisliked: boolean;
    hasBookmarked: boolean; // Managed by your polymorphic 'bookmarks' table
  };

  comments: ForumComment[]; // Initial set of top-level comments
  createdAt: string;
  updatedAt: string;
};
