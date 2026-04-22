import { Address } from "./baseListing";

export type Bookmark = {
  id: string;
  bookmarkable_id: string;
  bookmarkable_type: "Listing" | "Forum";
  title: string;
  thumbnail?: string;
  module_id: string;
  address: Address;
  moduleName: string;
  created_at: string;
  updated_at: string;
};
