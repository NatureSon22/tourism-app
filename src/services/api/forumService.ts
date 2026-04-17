import axios from "@/src/config/axios";
import forumData from "@/src/constants/forum";
import type { ForumPost } from "@/src/types/forum";

export type ForumResponse = {
  data: {
    listings: ForumPost[];
    pagination?: {
      count: number;
      currentPage: number;
      limit: number;
      total: number;
    };
  };
};

export type ForumActionResponse = {
  success: boolean;
  message: string;
  liked?: boolean;
  disliked?: boolean;
  bookmarked?: boolean;
  joined?: boolean;
  shared?: boolean;
  commentCount?: number;
};

const simulateApiDelay = async (ms = 100) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const forumService = {
  getAllForums: async (type?: string): Promise<ForumResponse> => {
    await simulateApiDelay(1000);
    return { data: { listings: forumData as unknown as ForumPost[] } };

    // try {
    //   const response = await axios.get(
    //     `/forums?type=${encodeURIComponent(type ?? "")}`,
    //   );
    //   return response.data;
    // } catch (error) {
    //   await simulateApiDelay();
    //   return { data: { listings: forumData } };
    // }
  },

  getForumDetails: async (
    postId: string | number,
  ): Promise<ForumPost | undefined> => {
    const normalizedId = String(postId);

    await simulateApiDelay(1000);
    return forumData.find(
      (forum) => String(forum.id) === normalizedId,
    ) as unknown as ForumPost | undefined;

    // const normalizedId = String(postId);

    // try {
    //   const response = await axios.get<ForumPost>(`/forums/${normalizedId}`);
    //   return response.data;
    // } catch (error) {
    //   await simulateApiDelay();
    //   return forumData.find((forum) => String(forum.id) === normalizedId);
    // }
  },

  likePost: async (postId: string | number): Promise<ForumActionResponse> => {
    const normalizedId = String(postId);

    try {
      const { data } = await axios.post<ForumActionResponse>(
        `/forums/${normalizedId}/like`,
      );
      return data;
    } catch {
      await simulateApiDelay(100);
      return { success: true, message: "Post liked", liked: true };
    }
  },

  dislikePost: async (
    postId: string | number,
  ): Promise<ForumActionResponse> => {
    const normalizedId = String(postId);

    try {
      const { data } = await axios.post<ForumActionResponse>(
        `/forums/${normalizedId}/dislike`,
      );
      return data;
    } catch {
      await simulateApiDelay();
      return { success: true, message: "Post disliked", disliked: true };
    }
  },

  commentPost: async (
    postId: string | number,
    comment: string,
    parentId?: number | null,
  ): Promise<ForumActionResponse> => {
    await simulateApiDelay();
    return {
      success: true,
      message: "Comment posted",
      commentCount: 1,
    };

    // try {
    //   const { data } = await axios.post<ForumActionResponse>(
    //     `/forums/${String(postId)}/comments`,
    //     {
    //       comment,
    //       parentId,
    //     },
    //   );
    //   return data;
    // } catch (error) {
    //   await simulateApiDelay();
    //   return {
    //     success: true,
    //     message: "Comment posted",
    //     commentCount: 1,
    //   };
    // }
  },

  bookmarkPost: async (payload: {
    bookmarkableId: string | number;
    bookmarkableType: "Listing" | "Forum";
  }): Promise<ForumActionResponse> => {
    const normalizedId = String(payload.bookmarkableId);

    try {
      const { data } = await axios.post<ForumActionResponse>(`/bookmarks`, {
        bookmarkableId: normalizedId,
        bookmarkableType: payload.bookmarkableType,
      });
      return data;
    } catch {
      await simulateApiDelay();
      return {
        success: true,
        message: "Item bookmarked",
        bookmarked: true,
      };
    }
  },

  sharePost: async (postId: string | number): Promise<ForumActionResponse> => {
    const normalizedId = String(postId);

    try {
      const { data } = await axios.post<ForumActionResponse>(
        `/forums/${normalizedId}/share`,
      );
      return data;
    } catch {
      await simulateApiDelay();
      return { success: true, message: "Post shared", shared: true };
    }
  },

  joinPost: async (postId: string | number): Promise<ForumActionResponse> => {
    const normalizedId = String(postId);

    try {
      const { data } = await axios.post<ForumActionResponse>(
        `/forums/${normalizedId}/join`,
      );
      return data;
    } catch {
      await simulateApiDelay();
      return { success: true, message: "Joined post community", joined: true };
    }
  },
};

export default forumService;
