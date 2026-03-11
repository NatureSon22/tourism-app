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
  author: Author;
  createdAt: Date;
  likes: number;
  dislikes: number;
  viewers: number;
  media?: Attachment[]; // Media can now be added to replies
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
  author: Author;
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
    title: "Best React Native Calendar for 2026?",
    content:
      "I'm struggling with the Wix library. Check out this screen recording of the lag I'm seeing.",
    category: "Development",
    place: "Ilocos Norte",
    author: {
      id: 1,
      name: "DevDan",
      avatarUrl: "https://ui-avatars.com/api/?name=Dev+Dan",
    },
    viewers: 1250,
    likes: 45,
    dislikes: 2,
    createdAt: new Date("2026-03-01T10:00:00Z"),
    commentCount: 4,
    media: [
      {
        id: "m1",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    ],
    comments: [
      {
        id: 1001,
        content:
          "Check out Flash Calendar. Look at how smooth the range selection is in my app:",
        author: {
          id: 2,
          name: "MarcR",
          avatarUrl: "https://ui-avatars.com/api/?name=Marc+R",
        },
        createdAt: new Date("2026-03-01T11:30:00Z"),
        likes: 12,
        dislikes: 0,
        viewers: 200,
        media: [
          {
            id: "m2",
            type: "image",
            url: "https://example.com/images/flash-calendar-demo.png",
          },
        ],
        replies: [
          {
            id: 5001,
            content: "Does it support range selection out of the box?",
            author: {
              id: 1,
              name: "DevDan",
              avatarUrl: "https://ui-avatars.com/api/?name=Dev+Dan",
            },
            createdAt: new Date("2026-03-01T12:00:00Z"),
            likes: 2,
            dislikes: 0,
            viewers: 50,
          },
        ],
      },
    ],
  },
  {
    id: 102,
    title: "Best React Native Calendar for 2026?",
    content:
      "I'm struggling with the Wix library. Check out this screen recording of the lag I'm seeing.",
    category: "Development",
    place: "Ilocos Norte",
    author: {
      id: 1,
      name: "DevDan",
      avatarUrl: "https://ui-avatars.com/api/?name=Dev+Dan",
    },
    viewers: 1250,
    likes: 45,
    dislikes: 2,
    createdAt: new Date("2026-03-01T10:00:00Z"),
    commentCount: 4,
    media: [
      {
        id: "m1",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    ],
    comments: [
      {
        id: 1001,
        content:
          "Check out Flash Calendar. Look at how smooth the range selection is in my app:",
        author: {
          id: 2,
          name: "MarcR",
          avatarUrl: "https://ui-avatars.com/api/?name=Marc+R",
        },
        createdAt: new Date("2026-03-01T11:30:00Z"),
        likes: 12,
        dislikes: 0,
        viewers: 200,
        media: [
          {
            id: "m2",
            type: "image",
            url: "https://example.com/images/flash-calendar-demo.png",
          },
        ],
        replies: [
          {
            id: 5001,
            content: "Does it support range selection out of the box?",
            author: {
              id: 1,
              name: "DevDan",
              avatarUrl: "https://ui-avatars.com/api/?name=Dev+Dan",
            },
            createdAt: new Date("2026-03-01T12:00:00Z"),
            likes: 2,
            dislikes: 0,
            viewers: 50,
          },
        ],
      },
    ],
  },
  {
    id: 103,
    title: "Best React Native Calendar for 2026?",
    content:
      "I'm struggling with the Wix library. Check out this screen recording of the lag I'm seeing.",
    category: "Development",
    place: "Ilocos Norte",
    author: {
      id: 1,
      name: "DevDan",
      avatarUrl: "https://ui-avatars.com/api/?name=Dev+Dan",
    },
    viewers: 1250,
    likes: 45,
    dislikes: 2,
    createdAt: new Date("2026-03-01T10:00:00Z"),
    commentCount: 4,
    media: [
      {
        id: "m1",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    ],
    comments: [
      {
        id: 1001,
        content:
          "Check out Flash Calendar. Look at how smooth the range selection is in my app:",
        author: {
          id: 2,
          name: "MarcR",
          avatarUrl: "https://ui-avatars.com/api/?name=Marc+R",
        },
        createdAt: new Date("2026-03-01T11:30:00Z"),
        likes: 12,
        dislikes: 0,
        viewers: 200,
        media: [
          {
            id: "m2",
            type: "image",
            url: "https://example.com/images/flash-calendar-demo.png",
          },
        ],
        replies: [
          {
            id: 5001,
            content: "Does it support range selection out of the box?",
            author: {
              id: 1,
              name: "DevDan",
              avatarUrl: "https://ui-avatars.com/api/?name=Dev+Dan",
            },
            createdAt: new Date("2026-03-01T12:00:00Z"),
            likes: 2,
            dislikes: 0,
            viewers: 50,
          },
        ],
      },
    ],
  },
  {
    id: 104,
    title: "Best React Native Calendar for 2026?",
    content:
      "I'm struggling with the Wix library. Check out this screen recording of the lag I'm seeing.",
    category: "Development",
    place: "Ilocos Norte",
    author: {
      id: 1,
      name: "DevDan",
      avatarUrl: "https://ui-avatars.com/api/?name=Dev+Dan",
    },
    viewers: 1250,
    likes: 45,
    dislikes: 2,
    createdAt: new Date("2026-03-01T10:00:00Z"),
    commentCount: 4,
    media: [
      {
        id: "m1",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    ],
    comments: [
      {
        id: 1001,
        content:
          "Check out Flash Calendar. Look at how smooth the range selection is in my app:",
        author: {
          id: 2,
          name: "MarcR",
          avatarUrl: "https://ui-avatars.com/api/?name=Marc+R",
        },
        createdAt: new Date("2026-03-01T11:30:00Z"),
        likes: 12,
        dislikes: 0,
        viewers: 200,
        media: [
          {
            id: "m2",
            type: "image",
            url: "https://example.com/images/flash-calendar-demo.png",
          },
        ],
        replies: [
          {
            id: 5001,
            content: "Does it support range selection out of the box?",
            author: {
              id: 1,
              name: "DevDan",
              avatarUrl: "https://ui-avatars.com/api/?name=Dev+Dan",
            },
            createdAt: new Date("2026-03-01T12:00:00Z"),
            likes: 2,
            dislikes: 0,
            viewers: 50,
          },
        ],
      },
    ],
  },
];

export default forumData;
