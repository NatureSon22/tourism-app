import { Community } from "../types/forum";

export type Forum = {
  selectedCommunity: Community | null;
  location: string;
  listing: string;
};
