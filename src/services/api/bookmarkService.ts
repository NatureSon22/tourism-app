import api from "@/src/config/axios";
import { Bookmark } from "@/src/types/bookmark";
import { QueryParams } from "@/src/types/filter";
import { buildQueryString } from "@/src/utils/buildQueryString";

export type BookmarkResponse = {
  bookmarks: Bookmark[];
  pagination?: {
    count: number;
    currentPage: number;
    limit: number;
    total: number;
  };
};

export type BookmarkPayload = {
  bookmarkableId: string | number;
  bookmarkableType: "Listing" | "Forum";
};

export const bookmarkService = {
  fetchBookmarks: async (): Promise<Bookmark[]> => {
    const { data } = await api.get<Bookmark[]>("/bookmarks");
    return data;
  },

  fetchBookmarksPage: async (
    params: QueryParams,
  ): Promise<BookmarkResponse> => {
    const qs = buildQueryString(params);

    const { data } = await api.get<any>(`/consumer/bookmarks?${qs.toString()}`);

    if (Array.isArray(data)) {
      return { bookmarks: data };
    }

    // console.log("Bookmark API response:", data.data.bookmarks[0]);

    return {
      bookmarks: data?.data?.bookmarks ?? data.bookmarks ?? [],
      pagination: data?.data?.pagination ?? data.pagination,
    };
  },

  addBookmark: async (
    payload: BookmarkPayload,
  ): Promise<{ success: boolean; bookmarked?: boolean; message: string }> => {
    const normalizedId = String(payload.bookmarkableId);

    const { data } = await api.post<{
      success: boolean;
      bookmarked?: boolean;
      message: string;
    }>("/consumer/bookmarks", {
      bookmarkableId: normalizedId,
      bookmarkableType: payload.bookmarkableType,
    });

    return data;
  },

  removeBookmark: async (
    bookmarkableId: string,
  ): Promise<{ success: boolean; message: string; bookmarked?: boolean }> => {
    const normalizedId = String(bookmarkableId);

    console.log("Removing bookmark with ID:", normalizedId);

    const { data } = await api.delete<{
      success: boolean;
      message: string;
      bookmarked?: boolean;
    }>(`/consumer/bookmarks/${normalizedId}`);

    return data;
  },
};
