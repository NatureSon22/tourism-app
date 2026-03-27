import { Review } from "./accommodationdetail";
import forumData, { ForumPost } from "./forum";

export type HotlineEntry = {
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
  price: number;
  discount?: number;
};

export const FOOD_DETAIL: FoodDetail = {
  id: "localservice-ph-001",
  images: [
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkvyJ87cMdqb7I6h0e_TMfO9N9OGC5vrRnhRJourg1phzN_Ku5aqKQhAPDF56eDOcHo9xxITbdILUMtkKJ3eR-x4rm3vGkcvrKbwTNg_ELcT4aLTPqjYVcRIOVAxAUva_pHXPoK8Pl-otpNQGzPX4aITa3VKUpaRUEweGgq4gWAgp8KDQeT2DfDOThNA/s1600/20230212-BGCSEDA-P30-0170.jpg",
    "https://grandhyattmanilaresidences.ph/wp-content/uploads/2021/10/shutterstock_484771681.jpg",
    "https://kubo.com.ph/wp-content/uploads/2023/09/bgc-borough-1.jpg.webp",
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
  price: 1138,
};
