export type Media = {
  id: number;
  src: string;
  alt: string;
  type: string;
};

export type Address = {
  id: number;
  listing_id: number;
  lat: number;
  lng: number;
  formatted: string;
  region: string;
  region_code: string;
  province: string;
  province_code: string;
  city: string;
  city_code: string;
  barangay: string;
  street: string;
  postal_code: string;
  is_primary: boolean;
};

export type Contact = {
  id: number;
  listing_id: number;
  type: string;
  label: string;
  number: string;
};

export type BlockMedia = {
  id: number;
  content_block_id: number;
  media_id: number;
  media?: Media; // Joined from media table
};

export type ContentBlock = {
  id: number;
  listing_info_id: number;
  type: string;
  body_text: string | null;
  body_html: string | null;
  order: number;
  media?: BlockMedia[]; // Joined via block_media
};

export type ListingInfo = {
  id: number;
  listing_id: number;
  key: string;
  title: string;
  content_blocks: ContentBlock[];
};

export type Category = {
  id: number;
  name: string;
  type: string; // e.g., "PRIMARY" | "SECONDARY"
};

export type Listing = {
  id: number;
  title: string;
  thumbnail: string;
  base_price: number;
  merchant_id: number;
  module_id: number;
  main_category_id: number;
  status: string; // e.g., "Active" | "Inactive"
  highlights: string;
  email: string;
  media?: Media[]; // Joined from media table (if you want to include all media directly)

  // Related Data (Omitted from base table but part of the listing object)
  addresses?: Address[];
  contacts?: Contact[];
  listing_info?: ListingInfo[];
  categories?: Category[];
};

export type ListingDetailed = {
  id: number;
  title: string;
  thumbnail: string;
  base_price: number;
  module_id: number;
  main_category_id: number;
  status: string;
  highlights: string;
  email: string;

  // From 'categories' table (Primary)
  main_category?: {
    id: number;
    name: string;
    type: string;
  };

  // From 'listing_categories' junction
  // Allows the listing to have multiple secondary categories
  categories?: {
    id: number;
    name: string;
    type: string;
  }[];

  // From 'addresses' table
  addresses: Address[];

  // From 'contacts' table
  contacts: Contact[];

  // From 'listing_info' -> 'content_blocks' -> 'block_media'
  // This represents the CMS/Dynamic content sections
  additional_info: (ListingInfo & {
    content_blocks: (ContentBlock & {
      media?: Media[];
    })[];
  })[];

  // From 'bookings' table
  bookings?: Booking[];

  // From 'bookmarks' table
  // (Assuming you'd want to know if the current user has bookmarked it)
  is_bookmarked?: boolean;
};

export type Booking = {
  id: number;
  listing_id: number;
  user_id: number;
  booked_price: number;
};
