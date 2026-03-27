import { Review } from "./accommodationdetail";
import forumData, { ForumPost } from "./forum";

// Referencing your existing types to avoid re-declaration conflicts
export type HotlineEntry = {
  label: string;
  phone: string;
};

export type Package = {
  id: string;
  title: string;
  subTitle?: string;
  price: number;
};

// Using the standard FoodDetail structure but named for Events
export type EventDetail = {
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

export const EVENT_DETAIL: EventDetail = {
  id: "event-ph-001",
  images: [
    "https://images.unsplash.com/photo-1559135197-8a45ea74d367", // Massive crab feast
    "https://images.unsplash.com/photo-1533900298318-6b8da08a523e", // Street festivities
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7", // Cultural performers
  ],
  name: "Alimango Festival (Lala, Lanao del Norte)",
  rating: 4.8,
  reviews: 2150,
  books: 142, // 142k + participants/interested
  tags: [
    "Cultural Festival",
    "Seafood Feast",
    "Street Dancing",
    "Local Tradition",
    "Family Friendly",
  ],
  location: "Lala Municipal Grounds, Lanao del Norte",
  description:
    "Join the 'Crab Capital of the Philippines' in a vibrant celebration of bounty. Witness the famous 'Alimango Mountain,' join the street dancing competitions, and indulge in unlimited crab feasts prepared with traditional local spices.",
  packages: [
    {
      id: "ev-pkg-001",
      title: "Festival Day Pass",
      subTitle: "Access to all street events",
      price: 0,
    },
    {
      id: "ev-pkg-002",
      title: "Crab Buffet Ticket",
      subTitle: "Unlimited Mud Crabs & Sides",
      price: 950,
    },
    {
      id: "ev-pkg-003",
      title: "VIP Viewing Deck",
      subTitle: "Best view of Street Dancing",
      price: 500,
    },
  ],
  forums: forumData,
  reviewsData: [
    {
      id: "ev-rev-01",
      author: {
        id: 201,
        name: "Carlos Agassi",
        avatarUrl: "https://ui-avatars.com/api/?name=Carlos+Agassi",
      },
      rating: 5,
      comment:
        "The crab mountain was breathtaking! Make sure to bring extra clothes because the seafood feast gets messy (and delicious)!",
    },
    {
      id: "ev-rev-02",
      author: {
        id: 202,
        name: "Bianca Gonzalez",
        avatarUrl: "https://ui-avatars.com/api/?name=Bianca+Gonzalez",
      },
      rating: 4,
      comment:
        "Loved the energy of the street dancers. The garlic butter crabs are a must-try at the food stalls.",
    },
  ],
  hotlines: [
    { label: "Tourism Desk", phone: "0917-555-LALA" },
    { label: "Festival Security", phone: "(063) 222-9911" },
  ],
  price: 0, // Free base entry
  discount: 20, // 20% early bird discount for Buffet Tickets
};