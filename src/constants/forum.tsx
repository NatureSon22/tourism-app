import type { ForumPost } from "@/src/types/forum";

export type { ForumPost };

const forumData: ForumPost[] = [
  {
    id: "101",
    title: "Hidden Gem: The Blue Lagoon in Coron",
    content:
      "Just found this spot that isn't on most maps. The water is crystal clear! Check the video for the exact entry point.",
    community: { id: "community-101", title: "Travel Tips" },
    category: "Travel Tips",
    place: "Coron, Palawan",
    author: {
      id: "10",
      name: "IslandHopper",
      userName: "IslandHopper",
      profilePictureUrl: "https://ui-avatars.com/api/?name=Island+Hopper",
    },
    stats: {
      viewers: 3420,
      likes: 156,
      dislikes: 3,
      commentCount: 2,
    },
    userInteractions: {
      hasLiked: false,
      hasDisliked: false,
      hasBookmarked: false,
    },
    createdAt: new Date("2026-03-05T08:20:00Z"),
    updatedAt: new Date("2026-03-05T08:20:00Z"),
    type: "Food & Dining",
    media: [],
    comments: [
      {
        id: "2001",
        parentId: null,
        content:
          "Is it accessible by a standard tricycle or do I need a private boat?",
        author: {
          id: "11",
          userName: "BackpackerPhil",
          profilePictureUrl: "https://ui-avatars.com/api/?name=Phil",
        },
        createdAt: new Date("2026-03-05T09:45:00Z"),
        stats: {
          likes: 8,
          dislikes: 0,
        },
        userInteractions: {
          hasLiked: false,
          hasDisliked: false,
        },
        replies: [
          {
            id: "3001",
            parentId: "2001",
            content: "Private boat is best, ask for the 'Secret Lagoon' route!",
            author: {
              id: "10",
              userName: "IslandHopper",
              profilePictureUrl:
                "https://ui-avatars.com/api/?name=Island+Hopper",
            },
            createdAt: new Date("2026-03-05T10:15:00Z"),
            stats: {
              likes: 12,
              dislikes: 0,
            },
            userInteractions: {
              hasLiked: false,
              hasDisliked: false,
            },
          },
        ],
      },
    ],
  },
  {
    id: "102",
    title: "Avoid the crowds at Calle Crisologo",
    content:
      "If you want the best photos without 100 people in the background, go at 5:15 AM. Here is the lighting at that hour.",
    community: { id: "community-102", title: "Photography" },
    category: "Photography",
    place: "Vigan, Ilocos Sur",
    author: {
      id: "15",
      name: "LensMaster",
      userName: "LensMaster",
      profilePictureUrl: "https://ui-avatars.com/api/?name=Lens+Master",
    },
    stats: {
      viewers: 890,
      likes: 67,
      dislikes: 1,
      commentCount: 1,
    },
    userInteractions: {
      hasLiked: false,
      hasDisliked: false,
      hasBookmarked: false,
    },
    createdAt: new Date("2026-03-08T14:10:00Z"),
    updatedAt: new Date("2026-03-08T14:10:00Z"),
    type: "Accommodation & Lodging",
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
    id: "103",
    title: "Best Surf Instructor in Cloud 9?",
    content:
      "Hey guys, I'm a total beginner. Looking for someone patient who won't just leave me in the white water.",
    community: { id: "community-103", title: "Sports" },
    category: "Sports",
    place: "Siargao",
    author: {
      id: "22",
      name: "SurferWannabe",
      userName: "SurferWannabe",
      profilePictureUrl: "https://ui-avatars.com/api/?name=Surfer+W",
    },
    stats: {
      viewers: 1100,
      likes: 24,
      dislikes: 0,
      commentCount: 5,
    },
    userInteractions: {
      hasLiked: false,
      hasDisliked: false,
      hasBookmarked: false,
    },
    createdAt: new Date("2026-03-10T11:00:00Z"),
    updatedAt: new Date("2026-03-10T11:00:00Z"),
    type: "Tourist Spots & Attractions",
    comments: [
      {
        id: "2005",
        parentId: null,
        content:
          "Look for 'Kuya Jun' near the boardwalk. He's the legend of Cloud 9.",
        author: {
          id: "25",
          userName: "LocalGuide",
          profilePictureUrl: "https://ui-avatars.com/api/?name=Local+G",
        },
        createdAt: new Date("2026-03-10T12:30:00Z"),
        stats: {
          likes: 45,
          dislikes: 0,
        },
        userInteractions: {
          hasLiked: false,
          hasDisliked: false,
        },
      },
    ],
  },
  {
    id: "104",
    title: "Current Road Conditions to Sagada",
    content:
      "Thinking of driving up this weekend. Any landslides reported after the rain yesterday?",
    community: { id: "community-104", title: "Safety" },
    category: "Safety",
    place: "Mountain Province",
    author: {
      id: "30",
      name: "RoadTripper",
      userName: "RoadTripper",
      profilePictureUrl: "https://ui-avatars.com/api/?name=Road+Tripper",
    },
    stats: {
      viewers: 5600,
      likes: 89,
      dislikes: 4,
      commentCount: 12,
    },
    userInteractions: {
      hasLiked: false,
      hasDisliked: false,
      hasBookmarked: false,
    },
    createdAt: new Date("2026-03-11T09:00:00Z"),
    updatedAt: new Date("2026-03-11T09:00:00Z"),
    type: "Transportation & Travel Tips",
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
    id: "105",
    title: "Expo SDK 54 - Native Menu Performance",
    content:
      "Testing out the new Link.Menu API for my tourism app. The performance on Android is surprisingly snappy.",
    community: { id: "community-105", title: "Development" },
    category: "Development",
    place: "Cainta, Rizal",
    author: {
      id: "1",
      name: "DevUser",
      userName: "DevUser",
      profilePictureUrl: "https://ui-avatars.com/api/?name=Dev+User",
    },
    stats: {
      viewers: 450,
      likes: 33,
      dislikes: 0,
      commentCount: 0,
    },
    userInteractions: {
      hasLiked: false,
      hasDisliked: false,
      hasBookmarked: false,
    },
    createdAt: new Date("2026-03-11T16:00:00Z"),
    updatedAt: new Date("2026-03-11T16:00:00Z"),
    type: "Food & Dining",
    comments: [],
  },
];

export default forumData;
