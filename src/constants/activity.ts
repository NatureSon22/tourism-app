export type Activity = {
  id: number;
  name: string;
  location: string;
  price: number;
  prevPrice?: number;
  rating: number;
  reviews: number;
  books: number;
  distanceFromCityCenter: number;
  types: string[];
  image: string;
};

export const PHILIPPINE_ACTIVITY_DATA: Activity[] = [
  {
    id: 1,
    name: "Intramuros Walking Tour",
    location: "Intramuros, Manila",
    price: 500,
    prevPrice: 600,
    rating: 4.5,
    reviews: 100,
    books: 50,
    distanceFromCityCenter: 2,
    types: ["cultural", "historical"],
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1000",
  },
  {
    id: 2,
    name: "El Nido Island Hopping",
    location: "El Nido, Palawan",
    price: 1200,
    prevPrice: 1500,
    rating: 4.9,
    reviews: 2400,
    books: 850,
    distanceFromCityCenter: 3.5,
    types: ["beach", "adventure"],
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1000",
  },
  {
    id: 3,
    name: "Oslob Whale Shark Swim",
    location: "Oslob, Cebu",
    price: 2500,
    prevPrice: 3000,
    rating: 4.7,
    reviews: 5100,
    books: 1200,
    distanceFromCityCenter: 120,
    types: ["marine life", "adventure"],
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000",
  },
  {
    id: 4,
    name: "Banaue Rice Terraces Trek",
    location: "Banaue, Ifugao",
    price: 800,
    prevPrice: 1000,
    rating: 4.6,
    reviews: 430,
    books: 90,
    distanceFromCityCenter: 5,
    types: ["nature", "cultural"],
    image:
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1000",
  },
  {
    id: 5,
    name: "Chocolate Hills Sightseeing",
    location: "Carmen, Bohol",
    price: 450,
    rating: 4.8,
    reviews: 3200,
    books: 1500,
    distanceFromCityCenter: 55,
    types: ["nature", "landmark"],
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000",
  },
  {
    id: 6,
    name: "Boracay Sunset Sailing",
    location: "White Beach, Boracay",
    price: 900,
    prevPrice: 1100,
    rating: 4.9,
    reviews: 1850,
    books: 600,
    distanceFromCityCenter: 1,
    types: ["romantic", "water sports"],
    image:
      "https://images.unsplash.com/photo-1502759683299-cdcd6974244f?q=80&w=1000",
  },
  {
    id: 7,
    name: "Hinatuan Enchanted River",
    location: "Hinatuan, Surigao",
    price: 300,
    prevPrice: 400,
    rating: 4.8,
    reviews: 740,
    books: 200,
    distanceFromCityCenter: 14,
    types: ["nature", "swimming"],
    image:
      "https://images.unsplash.com/photo-1502759683299-cdcd6974244f?q=80&w=1000",
  },
];
