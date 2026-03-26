import { Review } from "./accommodationdetail";
import forumData, { ForumPost } from "./forum";

type HotlineEntry = {
  label: string;
  phone: string;
};

export type Package = {
  id: string;
  title: string; // "Weekday Promo (Mon-Fri)"
  subTitle?: string; // "Lunch & Dinner"
  price: number; // 1138 (Keep as number for calculations)
};

type FoodDetail = {
  id: string;
  images: string[];
  name: string;
  rating: number;
  reviews: number;
  books: number;
  tags: string[];
  location: string;
  description: string;
  packages: Package[];
  forums: ForumPost[];
  reviewsData: Review[];
  hotlines: HotlineEntry[];
};

export const FOOD_DETAIL: FoodDetail = {
  id: "localservice-ph-001",
  images: [
    "https://ocbarchitects.com/wp-content/uploads/2015/09/binangonan.jpg",
    "https://images.real.ph/real/uploads/listings/large/listing_66cd8e8a47a4f7_1724747402.jpg",
    "https://static.wixstatic.com/media/81e04c_184b0e2452b041cab44af36e8cf5c537~mv2.png/v1/fill/w_640,h_520,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/81e04c_184b0e2452b041cab44af36e8cf5c537~mv2.png",
  ],
  name: "BGC: The Alley by VIKINGS",
  rating: 4.9,
  reviews: 1240,
  books: 85,
  tags: [
    "Casual Dining",
    "Buffet",
    "Traditional Casual Dining",
    "Free Wi-Fi",
    "Parking Space",
  ],
  location:
    "Ground Floor, Uptown Mall, 38th St. cor. 9th Ave., BGC, Taguig City",
  description:
    "Feast on a wide selection of different cuisines from all around the world. Enjoy a range of food from Japanese, American, European, and more. No matter the craving, you can definitely find it here at The Alley.",
  packages: [
    {
      id: "pkg-001",
      title: "Weekday Promo (Mon-Fri)",
      subTitle: "Lunch & Dinner",
      price: 1138,
    },
    {
      id: "pkg-002",
      title: "Weekend Promo (Sat-Sun)",
      subTitle: "Lunch & Dinner",
      price: 1288,
    },
    {
      id: "pkg-003",
      title: "Kids Promo (Ages 4-10)",
      subTitle: "All Days",
      price: 599,
    },
  ],
  forums: forumData,
  reviewsData: [
    {
      id: "rev-01",
      author: {
        id: 10,
        name: "Kiara Son",
        avatarUrl: "https://ui-avatars.com/api/?name=Kiara+Son",
      },
      rating: 5,
      comment:
        "The most magical place I've ever stayed. The staff truly cares about the environment and the service is impeccable.",
    },
    {
      id: "rev-02",
      author: {
        id: 10,
        name: "Sam Ajinomoto",
        avatarUrl: "https://ui-avatars.com/api/?name=Sam+Ajinomoto",
      },
      rating: 4,
      comment:
        "Incredible views. The boat transfer was a bit long, but absolutely worth it once you see the lagoon.",
    },
    {
      id: "rev-03",
      author: {
        id: 10,
        name: "Grace Templanza",
        avatarUrl: "https://ui-avatars.com/api/?name=Grace+Templanza",
      },
      rating: 5,
      comment:
        "The kayaking tour included in the stay was the highlight of our trip!",
    },
  ],
  hotlines: [
    { label: "Reservations", phone: "(02) 1234-5678" },
    { label: "Customer Service", phone: "(02) 8765-4321" },
  ],
};
