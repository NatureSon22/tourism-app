export type Event = {
  id: string;
  name: string;
  location: string;
  date: Date;
  imageUrl: string;
  types: string[];
};

export const REALISTIC_EVENTS: Event[] = [
  {
    id: "1",
    name: "Panagbenga Flower Festival",
    location: "Burnham Park, Baguio City",
    date: new Date("2026-02-24T08:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1597211833712-46637372338c",
    types: ["Festival", "Culture", "Outdoor", "Parade", "Flowers"], // 5 Types
  },
  {
    id: "2",
    name: "Tech Summit Philippines 2026",
    location: "SMX Convention Center, Manila",
    date: new Date("2026-05-15T09:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    types: ["Conference", "Technology", "Networking", "AI", "Business"], // 5 Types
  },
  {
    id: "3",
    name: "Sinulog Grand Parade",
    location: "Cebu City Sports Complex",
    date: new Date("2026-01-18T07:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
    types: ["Festival", "Religious", "Tradition", "Dance", "Tourism"], // 5 Types
  },
  {
    id: "4",
    name: "Acoustic Night: OPM Classics",
    location: "Social House, Makati",
    date: new Date("2026-04-12T20:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    types: ["Music", "Nightlife", "Acoustic", "Social"], // 4 Types
  },
  {
    id: "5",
    name: "Mt. Pulag Sunrise Hike",
    location: "Kabayan, Benguet",
    date: new Date("2026-03-20T02:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    types: ["Adventure", "Hiking", "Nature", "Photography", "Eco-Tourism"], // 5 Types
  },
  {
    id: "6",
    name: "Manila Food & Wine Expo",
    location: "World Trade Center, Pasay",
    date: new Date("2026-07-08T11:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    types: ["Food", "Exhibition", "Lifestyle", "Wine", "Networking"], // 5 Types
  },
  {
    id: "7",
    name: "Cebu Startup Weekend",
    location: "IT Park, Cebu City",
    date: new Date("2026-08-14T18:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
    types: ["Workshop", "Business", "Tech", "Education", "Competition"], // 5 Types
  },
  {
    id: "8",
    name: "Art in the Park",
    location: "Salcedo Village, Makati",
    date: new Date("2026-03-15T10:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4ce186860d",
    types: ["Art", "Family", "Community", "Outdoor", "Market"], // 5 Types
  },
  {
    id: "9",
    name: "Siargao International Surfing Cup",
    location: "Cloud 9, Siargao Island",
    date: new Date("2026-10-05T06:00:00"),
    imageUrl: "https://images.unsplash.com/photo-1502680399488-2a65838d981a",
    types: ["Sports", "Beach", "Competition", "Extreme", "Travel"], // 5 Types
  },
  {
    id: "10",
    name: "Indie Film Night",
    location: "Cinematheque Centre Manila",
    date: new Date("2026-06-21T19:30:00"),
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
    types: ["Movie", "Culture", "Indie", "Education"], // 4 Types
  },
];
