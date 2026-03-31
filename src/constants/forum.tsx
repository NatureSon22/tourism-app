import { User } from "../stores/authStore";

type MediaType = "image" | "video";

export type Attachment = {
  id: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string; // Essential for video previews
};

export type Author = {
  id: number;
  name: string;
  avatarUrl: string;
};

export type Reply = {
  id: number;
  content: string;
  author: Partial<User>;
  createdAt: Date;
  likes: number;
  dislikes: number;
  viewers: number;
  media?: Attachment[];
};

export type Comment = Reply & {
  replies?: Reply[];
};

export type ForumPost = {
  id: number;
  title: string;
  content: string;
  category: string;
  place: string;
  author: Partial<User>;
  viewers: number;
  likes: number;
  dislikes: number;
  createdAt: Date;
  comments: Comment[];
  commentCount: number;
  media?: Attachment[]; // Media added to the main post
};

const forumData: ForumPost[] = [
  {
    id: 101,
    title: "Hidden Gem: The Blue Lagoon in Coron",
    content:
      "Just found this spot that isn't on most maps. The water is crystal clear! Check the video for the exact entry point.",
    category: "Travel Tips",
    place: "Coron, Palawan",
    author: {
      id: "10",
      userName: "IslandHopper",
      profilePictureUrl: "https://ui-avatars.com/api/?name=Island+Hopper",
    },
    viewers: 3420,
    likes: 156,
    dislikes: 3,
    createdAt: new Date("2026-03-05T08:20:00Z"),
    commentCount: 2,
    media: [
      {
        id: "vid_01",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1544124499-58912cbddaad",
      },
      {
        id: "vid_02",
        type: "video",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1544124499-58912cbddaad",
      },
      {
        id: "vid_03",
        type: "video",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1544124499-58912cbddaad",
      },
    ],
    comments: [
      {
        id: 2001,
        content:
          "Is it accessible by a standard tricycle or do I need a private boat?",
        author: {
          id: "11",
          userName: "BackpackerPhil",
          profilePictureUrl: "https://ui-avatars.com/api/?name=Phil",
        },
        createdAt: new Date("2026-03-05T09:45:00Z"),
        likes: 8,
        dislikes: 0,
        viewers: 450,
        replies: [
          {
            id: 3001,
            content: "Private boat is best, ask for the 'Secret Lagoon' route!",
            author: {
              id: "10",
              userName: "IslandHopper",
              profilePictureUrl:
                "https://ui-avatars.com/api/?name=Island+Hopper",
            },
            createdAt: new Date("2026-03-05T10:15:00Z"),
            likes: 12,
            dislikes: 0,
            viewers: 120,
          },
        ],
      },
    ],
  },
  {
    id: 102,
    title: "Avoid the crowds at Calle Crisologo",
    content:
      "If you want the best photos without 100 people in the background, go at 5:15 AM. Here is the lighting at that hour.",
    category: "Photography",
    place: "Vigan, Ilocos Sur",
    author: {
      id: "15",
      userName: "LensMaster",
      profilePictureUrl: "https://ui-avatars.com/api/?name=Lens+Master",
    },
    viewers: 890,
    likes: 67,
    dislikes: 1,
    createdAt: new Date("2026-03-08T14:10:00Z"),
    commentCount: 1,
    media: [
      {
        id: "img_01",
        type: "image",
        url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      },
      {
        id: "img_02",
        type: "image",
        url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      },
      {
        id: "img_03",
        type: "image",
        url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      },
      {
        id: "img_04",
        type: "image",
        url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      },
    ],
    comments: [],
  },
  {
    id: 103,
    title: "Best Surf Instructor in Cloud 9?",
    content:
      "Hey guys, I'm a total beginner. Looking for someone patient who won't just leave me in the white water.",
    category: "Sports",
    place: "Siargao",
    author: {
      id: "22",
      userName: "SurferWannabe",
      profilePictureUrl: "https://ui-avatars.com/api/?name=Surfer+W",
    },
    viewers: 1100,
    likes: 24,
    dislikes: 0,
    createdAt: new Date("2026-03-10T11:00:00Z"),
    commentCount: 5,
    comments: [
      {
        id: 2005,
        content:
          "Look for 'Kuya Jun' near the boardwalk. He's the legend of Cloud 9.",
        author: {
          id: "25",
          userName: "LocalGuide",
          profilePictureUrl: "https://ui-avatars.com/api/?name=Local+G",
        },
        createdAt: new Date("2026-03-10T12:30:00Z"),
        likes: 45,
        dislikes: 0,
        viewers: 300,
      },
    ],
  },
  {
    id: 104,
    title: "Current Road Conditions to Sagada",
    content:
      "Thinking of driving up this weekend. Any landslides reported after the rain yesterday?",
    category: "Safety",
    place: "Mountain Province",
    author: {
      id: "30",
      userName: "RoadTripper",
      profilePictureUrl: "https://ui-avatars.com/api/?name=Road+Tripper",
    },
    viewers: 5600,
    likes: 89,
    dislikes: 4,
    createdAt: new Date("2026-03-11T09:00:00Z"),
    commentCount: 12,
    media: [
      {
        id: "img_02",
        type: "image",
        url: "https://images.unsplash.com/photo-1502164919789-3467b2a5868e",
      },
    ],
    comments: [],
  },
  {
    id: 105,
    title: "Expo SDK 54 - Native Menu Performance",
    content:
      "Testing out the new Link.Menu API for my tourism app. The performance on Android is surprisingly snappy.",
    category: "Development",
    place: "Cainta, Rizal",
    author: {
      id: "1",
      userName: "DevUser",
      profilePictureUrl: "https://ui-avatars.com/api/?name=Dev+User",
    },
    viewers: 450,
    likes: 33,
    dislikes: 0,
    createdAt: new Date("2026-03-11T16:00:00Z"),
    commentCount: 0,
    comments: [],
  },
];

export default forumData;
