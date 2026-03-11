const imagePlaceholder = require("../assets/images/imagecontainer.png");

export type PlaceList = {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
};

const PLACE_LIST: PlaceList[] = [
  {
    id: 1,
    name: "Lions Head",
    location: "Baguio",
    price: 1234,
    rating: 4.5,
    reviews: 782,
    imageUrl: imagePlaceholder,
  },
  {
    id: 2,
    name: "Camp John Hay",
    location: "Baguio",
    price: 850,
    rating: 4.3,
    reviews: 412,
    imageUrl: imagePlaceholder,
  },
  {
    id: 3,
    name: "Burnham Park",
    location: "Baguio",
    price: 0,
    rating: 4.1,
    reviews: 1024,
    imageUrl: imagePlaceholder,
  },
  {
    id: 4,
    name: "Mines View",
    location: "Baguio",
    price: 300,
    rating: 4.4,
    reviews: 658,
    imageUrl: imagePlaceholder,
  },
  {
    id: 5,
    name: "Botanical Garden",
    location: "Baguio",
    price: 150,
    rating: 4.0,
    reviews: 287,
    imageUrl: imagePlaceholder,
  },
  {
    id: 6,
    name: "Session Road Cafe",
    location: "Baguio",
    price: 450,
    rating: 4.2,
    reviews: 199,
    imageUrl: imagePlaceholder,
  },
  {
    id: 7,
    name: "BenCab Museum",
    location: "Tuba",
    price: 600,
    rating: 4.6,
    reviews: 341,
    imageUrl: imagePlaceholder,
  },
  {
    id: 8,
    name: "Wright Park",
    location: "Baguio",
    price: 120,
    rating: 3.9,
    reviews: 88,
    imageUrl: imagePlaceholder,
  },
  {
    id: 9,
    name: "Tam-Awan Village",
    location: "Baguio",
    price: 200,
    rating: 4.5,
    reviews: 215,
    imageUrl: imagePlaceholder,
  },
  {
    id: 10,
    name: "Strawberry Farm",
    location: "La Trinidad",
    price: 250,
    rating: 4.4,
    reviews: 476,
    imageUrl: imagePlaceholder,
  },
];

export default PLACE_LIST;
