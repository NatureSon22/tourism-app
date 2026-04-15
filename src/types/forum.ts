type MediaType = "image" | "video";

export type Media = {
  id: string;
  type: MediaType;
  src: string;
  alt?: string;
};

export type Author = {
  id: string;
  name: string;
  avatar?: string;
  isVerified?: boolean;
};

export type Location = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
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

  // Link to your taxonomies table (e.g., 'Safety Tips', 'Review')
  category: string;

  // Link to the specific module (e.g., 'Accommodation')
  moduleId: string;

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
