export type Listing = {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  imageUrl: string;
};

const IMAGE_URL =
  "https://img.freepik.com/free-photo/beautiful_1203-2633.jpg?semt=ais_hybrid&w=740&q=80";

export const listings: Listing[] = [
  {
    id: 1,
    name: "Sumaguing Cave Lodge",
    imageUrl: IMAGE_URL,
    location: "South Rd, Sagada, Mountain Province",
    pricePerNight: 5750.0,
    rating: 4.8,
    reviews: 120,
  },
  {
    id: 2,
    name: "El Nido Overwater Villa",
    imageUrl: IMAGE_URL,
    location: "Miniloc Island, El Nido, Palawan",
    pricePerNight: 28400.0,
    rating: 4.9,
    reviews: 85,
  },
  {
    id: 3,
    name: "Vigan Heritage Mansion",
    imageUrl: IMAGE_URL,
    location: "Calle Crisologo, Vigan City, Ilocos Sur",
    pricePerNight: 4200.0,
    rating: 4.7,
    reviews: 210,
  },
  {
    id: 4,
    name: "Batanes Stone House",
    imageUrl: IMAGE_URL,
    location: "Basco, Batanes, Cagayan Valley",
    pricePerNight: 6800.0,
    rating: 5.0,
    reviews: 45,
  },
  {
    id: 5,
    name: "Siargao Surf Shack",
    imageUrl: IMAGE_URL,
    location: "Cloud 9, General Luna, Siargao",
    pricePerNight: 3500.0,
    rating: 4.6,
    reviews: 340,
  },
  {
    id: 6,
    name: "Chocolate Hills Eco-Resort",
    imageUrl: IMAGE_URL,
    location: "Carmen, Bohol, Central Visayas",
    pricePerNight: 5200.0,
    rating: 4.5,
    reviews: 156,
  },
  {
    id: 7,
    name: "Boracay White Sands Suite",
    imageUrl: IMAGE_URL,
    location: "Station 1, Boracay Island, Aklan",
    pricePerNight: 12500.0,
    rating: 4.8,
    reviews: 512,
  },
  {
    id: 8,
    name: "Banaue Rice Terrace View Inn",
    imageUrl: IMAGE_URL,
    location: "Banaue, Ifugao, Cordillera Region",
    pricePerNight: 2900.0,
    rating: 4.4,
    reviews: 89,
  },
  {
    id: 9,
    name: "Tagaytay Ridge Glasshouse",
    imageUrl: IMAGE_URL,
    location: "Aguinaldo Highway, Tagaytay, Cavite",
    pricePerNight: 9800.0,
    rating: 4.7,
    reviews: 175,
  },
  {
    id: 10,
    name: "Coron Island Hidden Lagoon",
    imageUrl: IMAGE_URL,
    location: "Busuanga Rd, Coron, Palawan",
    pricePerNight: 15400.0,
    rating: 4.9,
    reviews: 63,
  },
];
