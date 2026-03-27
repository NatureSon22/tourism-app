import forumData, { ForumPost } from "./forum";

export type ActivityReview = {
  id: string;
  author: {
    id: number;
    name: string;
    avatarUrl: string;
  };
  rating: number;
  comment: string;
};

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

export type ActivityExpectation = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type ActivityDetail = {
  id: string;
  name: string;
  images: string[];
  rating: number;
  reviews: number;
  participants: number;
  packages: Package[];
  duration: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  tags: string[];
  location: string;
  description: string;
  highlights: string[];
  forums: ForumPost[];
  reviewsData: ActivityReview[];
  expectations: ActivityExpectation[];
  price: number;
  discount?: number;
  books: number;
  hotlines: HotlineEntry[];
};

export const ACTIVITY_DETAIL: ActivityDetail = {
  id: "activity-ph-001",
  name: "Sunset MTB Trail Adventure",
  images: [
    "https://i0.wp.com/blog.education.nationalgeographic.org/wp-content/uploads/2013/10/29598.jpg",
    "https://www.abc4.com/wp-content/uploads/sites/4/2023/03/Sunset_Utah2023_DaylightSavingsTime.jpeg?w=2560&h=1440&crop=1",
    "https://cms.accuweather.com/wp-content/uploads/2017/05/sunset.jpg",
  ],
  rating: 4.8,
  reviews: 920,
  books: 120,
  participants: 214,
  duration: "4 hours",
  difficulty: "Moderate",
  tags: ["Mountain biking", "Sunset", "Group tour", "Nature"],
  location: "Mount Makiling Trailhead, Calamba City, Laguna",
  description:
    "Experience breathtaking sunset views on two wheels while riding through lush trails and rustic landscapes. This guided mountain biking activity is ideal for intermediate riders seeking a memorable outdoor adventure.",
  highlights: [
    "Guided off-road tour",
    "Safety briefing and helmet provided",
    "Energy snacks and hydration pack",
    "Photo stop at overlooks",
  ],
  packages: [
    {
      id: "pkg-001",
      title: "Weekday Promo (Mon-Fri)",
      subTitle: "Express Ride (No Snacks)",
      price: 1138,
    },
    {
      id: "pkg-002",
      title: "Weekend Promo (Sat-Sun)",
      subTitle: "Full Experience (Snacks Included)",
      price: 1288,
    },
  ],
  forums: forumData,
  reviewsData: [
    {
      id: "activity-rev-01",
      author: {
        id: 11,
        name: "Alden Cruz",
        avatarUrl: "https://ui-avatars.com/api/?name=Alden+Cruz",
      },
      rating: 5,
      comment:
        "The route was challenging but so rewarding. Great guides and very safe.",
    },
    {
      id: "activity-rev-02",
      author: {
        id: 12,
        name: "Marina Lopez",
        avatarUrl: "https://ui-avatars.com/api/?name=Marina+Lopez",
      },
      rating: 4,
      comment:
        "Fantastic sunset scenery. I would have loved more downhill sections!",
    },
    {
      id: "activity-rev-03",
      author: {
        id: 13,
        name: "Joey Ramos",
        avatarUrl: "https://ui-avatars.com/api/?name=Joey+Ramos",
      },
      rating: 5,
      comment: "Absolutely worth it. The guides were super supportive and fun.",
    },
  ],
  expectations: [
    {
      id: "exp-act-01",
      name: "Pre-ride Safety Briefing",
      description:
        "Settle in with professional instructors and learn key trail techniques before you start.",
      image:
        "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1000",
    },
    {
      id: "exp-act-02",
      name: "Sunset Overlook",
      description:
        "Pause at a stunning viewpoint to watch the sun dip behind the mountains.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000",
    },
    {
      id: "exp-act-03",
      name: "Local Flavors",
      description:
        "Enjoy light local snacks and drinks during a mid-ride break at the base camp.",
      image:
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1000",
    },
  ],
  hotlines: [
    { label: "Reservations", phone: "(02) 1234-5678" },
    { label: "Customer Service", phone: "(02) 8765-4321" },
  ],
  price: 1800,
  discount: 12,
};
