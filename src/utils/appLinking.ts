import * as Linking from "expo-linking";

export const createForumLink = (postId: string | number) => {
  try {
    return Linking.createURL(`forum/${postId}`);
  } catch (error) {
    console.error("Failed to generate forum URL:", error);
    return `tourism://forum/${postId}`;
  }
};
