export type Media = {
  id: string;
  src: string;
  alt: string;
  type: "image" | "video";
};

export type Address = {
  id: string;
  listing_id: string;
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
  id: string;
  listing_id: string;
  type: "phone" | "landline";
  label?: string;
  number: string;
};

export type BlockMedia = {
  id: string;
  content_block_id: string;
  media: Media;
};

export type ContentBlock = {
  id: string;
  listing_info_id: string;
  type: "subheading" | "paragraph" | "list" | "table"; // Example types
  body_text: string | null;
  body_html: string | null;
  order: number;
  media?: BlockMedia[]; // Joined via block_media
};

export type ListingInfo = {
  id: string;
  listing_id: string;
  key: string;
  title: string;
  content_blocks: ContentBlock[];
};

export type Category = {
  id: number;
  name: string;
  type: string; // e.g., "PRIMARY" | "SECONDARY"
};

// FOR LISTING PREVIEW (e.g., listing cards)
export type Listing = {
  id: number;
  title: string;
  thumbnail: string;
  base_price: number;
  merchant_id: string;
  module_id: string;
  main_category_id: number;
  status: string; // e.g., "Active" | "Inactive"
  highlights: string;
  email: string;
  images?: Media[]; // Joined from media table (if you want to include all media directly)

  // Related Data (Omitted from base table but part of the listing object)
  addresses?: Address;
  contacts?: Contact[];
  listing_info?: ListingInfo[];
  categories?: Category[];
};

// FOR DETAILED LISTING VIEW (e.g., listing details page)
export type ListingDetailed = {
  id: string;
  title: string;
  thumbnail: string;
  base_price: number;
  module_id: string;
  main_category_id: string;
  status: string;
  highlights: string;
  email: string;
  images?: Media[];

  rating?: number; // Average rating from reviews
  reviews?: number; // Total number of reviews
  books?: number; // Total number of bookings

  forums?: [];

  // From 'categories' table (Primary)
  main_category?: {
    id: string;
    name: string;
    type: string;
  };

  // From 'listing_categories' junction
  // Allows the listing to have multiple secondary categories
  categories?: {
    id: string;
    name: string;
    type: string;
  }[];

  // From 'addresses' table
  addresses: Address;

  // From 'contacts' table
  contacts: Contact[];

  // From 'listing_info' -> 'content_blocks' -> 'block_media'
  // This represents the CMS/Dynamic content sections
  additional_info: (ListingInfo & {
    content_blocks: ContentBlock[];
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
