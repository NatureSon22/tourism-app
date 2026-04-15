import type { Address } from "../types/baseListing";
import type { EVENT } from "../types/listingTypes";

type EventFixture = {
  id: number;
  title: string;
  location: string;
  imageUrl: string;
  categories: string[];
  formattedDate: string;
  distanceFromCityCenter?: number;
  rating?: number;
  reviews?: number;
  books?: number;
  base_price?: number;
  prevPrice?: number;
};

const createAddress = (id: number, location: string): Address => ({
  id,
  listing_id: id,
  lat: 0,
  lng: 0,
  formatted: location,
  region: "",
  region_code: "",
  province: "",
  province_code: "",
  city: location,
  city_code: "",
  barangay: "",
  street: "",
  postal_code: "",
  is_primary: true,
});

const createEvent = (
  fixture: EventFixture,
): EVENT & { formattedDate: string } => ({
  id: fixture.id,
  title: fixture.title,
  thumbnail: fixture.imageUrl,
  base_price: fixture.base_price ?? 0,
  merchant_id: 0,
  module_id: 0,
  main_category_id: 0,
  status: "Active",
  highlights: fixture.categories.join(", "),
  email: "events@tourism.local",
  addresses: [createAddress(fixture.id, fixture.location)],
  categories: fixture.categories.map((name, index) => ({
    id: fixture.id * 10 + index,
    name,
    type: index === 0 ? "PRIMARY" : "SECONDARY",
  })),
  distanceFromCityCenter: fixture.distanceFromCityCenter,
  rating: fixture.rating,
  reviews: fixture.reviews,
  books: fixture.books,
  prevPrice: fixture.prevPrice,
  formattedDate: fixture.formattedDate,
});

const EVENT_FIXTURES: EventFixture[] = [
  {
    id: 1,
    title: "Panagbenga Flower Festival",
    location: "Burnham Park, Baguio City",
    imageUrl: "https://images.unsplash.com/photo-1597211833712-46637372338c",
    categories: ["Festival", "Culture", "Outdoor", "Parade", "Flowers"],
    formattedDate: "February 24, 2026",
    distanceFromCityCenter: 2.1,
    rating: 4.8,
    reviews: 241,
    books: 12,
    base_price: 0,
  },
  {
    id: 2,
    title: "Tech Summit Philippines 2026",
    location: "SMX Convention Center, Manila",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    categories: ["Conference", "Technology", "Networking", "AI", "Business"],
    formattedDate: "May 15, 2026",
    distanceFromCityCenter: 1.4,
    rating: 4.6,
    reviews: 188,
    books: 19,
    base_price: 1499,
    prevPrice: 1999,
  },
  {
    id: 3,
    title: "Sinulog Grand Parade",
    location: "Cebu City Sports Complex",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
    categories: ["Festival", "Religious", "Tradition", "Dance", "Tourism"],
    formattedDate: "January 18, 2026",
    distanceFromCityCenter: 3.2,
    rating: 4.9,
    reviews: 320,
    books: 25,
    base_price: 0,
  },
  {
    id: 4,
    title: "Acoustic Night: OPM Classics",
    location: "Social House, Makati",
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    categories: ["Music", "Nightlife", "Acoustic", "Social"],
    formattedDate: "April 12, 2026",
    distanceFromCityCenter: 0.8,
    rating: 4.4,
    reviews: 92,
    books: 7,
    base_price: 699,
    prevPrice: 899,
  },
  {
    id: 5,
    title: "Mt. Pulag Sunrise Hike",
    location: "Kabayan, Benguet",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    categories: ["Adventure", "Hiking", "Nature", "Photography", "Eco-Tourism"],
    formattedDate: "March 20, 2026",
    distanceFromCityCenter: 5.6,
    rating: 4.7,
    reviews: 156,
    books: 31,
    base_price: 1299,
  },
  {
    id: 6,
    title: "Manila Food & Wine Expo",
    location: "World Trade Center, Pasay",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    categories: ["Food", "Exhibition", "Lifestyle", "Wine", "Networking"],
    formattedDate: "July 8, 2026",
    distanceFromCityCenter: 1.9,
    rating: 4.5,
    reviews: 143,
    books: 14,
    base_price: 899,
  },
  {
    id: 7,
    title: "Cebu Startup Weekend",
    location: "IT Park, Cebu City",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
    categories: ["Workshop", "Business", "Tech", "Education", "Competition"],
    formattedDate: "August 14, 2026",
    distanceFromCityCenter: 2.7,
    rating: 4.3,
    reviews: 76,
    books: 11,
    base_price: 499,
    prevPrice: 699,
  },
  {
    id: 8,
    title: "Art in the Park",
    location: "Salcedo Village, Makati",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4ce186860d",
    categories: ["Art", "Family", "Community", "Outdoor", "Market"],
    formattedDate: "March 15, 2026",
    distanceFromCityCenter: 0.6,
    rating: 4.2,
    reviews: 67,
    books: 5,
    base_price: 0,
  },
  {
    id: 9,
    title: "Siargao International Surfing Cup",
    location: "Cloud 9, Siargao Island",
    imageUrl: "https://images.unsplash.com/photo-1502680399488-2a65838d981a",
    categories: ["Sports", "Beach", "Competition", "Extreme", "Travel"],
    formattedDate: "October 5, 2026",
    distanceFromCityCenter: 8.9,
    rating: 4.9,
    reviews: 204,
    books: 22,
    base_price: 0,
  },
  {
    id: 10,
    title: "Indie Film Night",
    location: "Cinematheque Centre Manila",
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
    categories: ["Movie", "Culture", "Indie", "Education"],
    formattedDate: "June 21, 2026",
    distanceFromCityCenter: 1.1,
    rating: 4.1,
    reviews: 54,
    books: 4,
    base_price: 350,
  },
];

export const REALISTIC_EVENTS: EVENT[] = EVENT_FIXTURES.map(createEvent);
