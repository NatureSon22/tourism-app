export type ListingImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

export type ListingAddress = {
  region: string;
  regionCode: string;
  province: string;
  provinceCode: string;
  city: string;
  cityCode: string;
  barangay: string;
  street: string;
  postalCode: string;
};

export type InfoBlock = {
  id: string;
  type: "subheading" | "text" | "image";
  content: {
    text?: string;
    html?: string;
    src?: string;
    alt?: string;
  };
};

export type AdditionalInfoSection = {
  key: string;
  title: string;
  children: InfoBlock[];
};

export type BaseListing = {
  id: number;
  name: string;
  thumbnail: {
    data: string;
  };
  images: ListingImage[];
  basePrice: number;
  type: string;
  status: "Active" | "Inactive" | "Pending";

  // Merchant/Owner Info
  merchantId: number;
  merchantName: string;

  // Categorization & Filtering
  mainCategoryId: number;
  subCategoryIds: number[];
  amenities: number[];

  // Contact & Content
  highlights: string;
  phone: string;
  email: string;

  // Geographic Data
  location: {
    lat: number;
    lng: number;
  };
  address: ListingAddress;

  // Dynamic Content (CMS-style)
  additional_information: AdditionalInfoSection[];
};
