export type Dining = {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  books: number;
  distanceFromCityCenter: number;
  types: string[];
  images: string[];
};

export const PHILIPPINE_DINING_DATA: Dining[] = [
  {
    id: "1",
    name: "Mang Larry's Isawan",
    location: "UP Diliman, Quezon City",
    price: 150, // Average cost per person
    rating: 4.8,
    reviews: 1250,
    books: 0,
    distanceFromCityCenter: 12.4,
    types: ["Street Food", "Filipino", "Grilled"],
    images: [
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=1000",
    ],
  },
  {
    id: "2",
    name: "Balay Dako",
    location: "Tagaytay, Cavite",
    price: 850,
    rating: 4.6,
    reviews: 3420,
    books: 150,
    distanceFromCityCenter: 55.0,
    types: ["Filipino", "Breakfast", "View"],
    images: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000",
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=1000",
    ],
  },
  {
    id: "3",
    name: "Lantaw Floating Native Restaurant",
    price: 600,
    location: "Cordova, Cebu",
    rating: 4.4,
    reviews: 2100,
    books: 45,
    distanceFromCityCenter: 15.2,
    types: ["Seafood", "Filipino", "Outdoor"],
    images: Array(12).fill(
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000",
    ),
  },
  {
    id: "4",
    name: "Antonio's Garden",
    price: 2500,
    location: "Tagaytay, Cavite",
    rating: 4.9,
    reviews: 890,
    books: 300,
    distanceFromCityCenter: 62.1,
    types: ["Fine Dining", "European", "Steakhouse"],
    images: Array(16).fill(
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000",
    ),
  },
  {
    id: "5",
    name: "Dampa Seafood Market",
    price: 1200,
    location: "Macapagal Blvd, Pasay",
    rating: 4.5,
    reviews: 5600,
    books: 120,
    distanceFromCityCenter: 8.5,
    types: ["Seafood", "Filipino", "Paluto"],
    images: Array(20).fill(
      "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=1000",
    ),
  },
];
