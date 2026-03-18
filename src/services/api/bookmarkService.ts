import axios from "@/src/config/axios";
import { Listing } from "@/src/constants/listings";

export const bookmarkService = {
  fetchBookmarks: async (): Promise<Listing[]> => {
    const { data } = await axios.get<Listing[]>("/bookmarks");
    return data;
  },
};