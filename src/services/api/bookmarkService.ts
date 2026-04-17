import axios from "@/src/config/axios";
import { Listing } from "@/src/constants/listings";

export type BookmarkPayload = {
  bookmarkableId: string | number;
  bookmarkableType: "Listing" | "Forum";
};

export const bookmarkService = {
  fetchBookmarks: async (): Promise<Listing[]> => {
    const { data } = await axios.get<Listing[]>("/bookmarks");
    return data;
  },

  addBookmark: async (
    payload: BookmarkPayload,
  ): Promise<{ success: boolean; bookmarked?: boolean; message: string }> => {
    const normalizedId = String(payload.bookmarkableId);

    const { data } = await axios.post<{
      success: boolean;
      bookmarked?: boolean;
      message: string;
    }>("/bookmarks", {
      bookmarkableId: normalizedId,
      bookmarkableType: payload.bookmarkableType,
    });

    return data;
  },
};
