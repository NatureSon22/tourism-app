type Accommodation = {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  category_id: string;
  longitude: number;
  latitude: number;
  created_at: string;
  updated_at: string;
  category_names: string[];
  category_types: ("PRIMARY" | "SECONDARY")[];
  imageUrl?: string;
  location?: string;
  pricePerNight?: number;
  rating?: number;
  reviews: number;
  distanceFromCityCenter?: number;
};

const IMAGE_URL =
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/21866833.jpg?k=1b237330d5606ffba7470a57eae7500c79232c81a2a3a618eee01442611ad2bc&o=";

const DEFAULT_ACCOMMODATION: Accommodation = {
  id: "0",
  creator_id: "default",
  title: "Default Hotel",
  description: "This is a default accommodation.",
  category_id: "cat-default",
  longitude: 0.0,
  latitude: 0.0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  category_names: ["Default"],
  location: "Default Location",
  category_types: ["PRIMARY"],
  pricePerNight: 0.0,
  rating: 0.0,
  reviews: 0,
  imageUrl: IMAGE_URL,
  distanceFromCityCenter: 0.0,
};

const SAMPLE_ACCOMMODATIONS: Accommodation[] = [
  {
    id: "1",
    creator_id: "user-admin-01",
    title: "Diamond Hotel Philippines",
    description:
      "A luxury 5-star hotel situated along the golden stretch of Roxas Boulevard, offering world-class amenities and stunning views of the famous Manila Bay sunset.",
    category_id: "cat-luxury",
    longitude: 120.9802,
    latitude: 14.5694,
    created_at: "2026-03-25T10:00:00Z",
    updated_at: "2026-03-25T10:00:00Z",
    category_names: ["Luxury", "Bayview", "Business"],
    category_types: ["PRIMARY", "SECONDARY", "SECONDARY"],
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    location: "Roxas Boulevard, Manila",
    pricePerNight: 8500.0,
    rating: 4.5,
    reviews: 1500,
    distanceFromCityCenter: 2.5,
  },
  {
    id: "2",
    creator_id: "user-admin-01",
    title: "The Manila Hotel",
    description:
      "The historic 'Grand Dame' of the Philippines. Built in 1912, this hotel blends colonial charm with modern elegance right next to Rizal Park.",
    category_id: "cat-heritage",
    longitude: 120.9754,
    latitude: 14.5894,
    created_at: "2026-03-20T08:30:00Z",
    updated_at: "2026-03-20T08:30:00Z",
    category_names: ["Heritage", "Iconic", "Luxury"],
    category_types: ["PRIMARY", "SECONDARY", "SECONDARY"],
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
    location: "One Rizal Park, Manila",
    pricePerNight: 7200.0,
    rating: 4.7,
    reviews: 2840,
    distanceFromCityCenter: 1.2,
  },
  {
    id: "3",
    creator_id: "user-admin-02",
    title: "Conrad Manila",
    description:
      "A striking architecture inspired by luxury cruise liners. Features an infinity pool and direct access to SM Mall of Asia.",
    category_id: "cat-modern-luxury",
    longitude: 120.9818,
    latitude: 14.5351,
    created_at: "2026-02-15T12:00:00Z",
    updated_at: "2026-03-01T09:45:00Z",
    category_names: ["Modern", "Shopping", "Bayview"],
    category_types: ["PRIMARY", "SECONDARY", "SECONDARY"],
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    location: "Seaside Blvd, Pasay City",
    pricePerNight: 14500.0,
    rating: 4.8,
    reviews: 1120,
    distanceFromCityCenter: 6.8,
  },
  {
    id: "4",
    creator_id: "user-admin-03",
    title: "Sheraton Manila Bay",
    description:
      "Known for personalized service and located in the vibrant Malate district. A perfect choice for business and leisure travelers alike.",
    category_id: "cat-business",
    longitude: 120.9856,
    latitude: 14.5732,
    created_at: "2026-01-10T14:20:00Z",
    updated_at: "2026-01-10T14:20:00Z",
    category_names: ["Business", "Urban", "Malate"],
    category_types: ["PRIMARY", "SECONDARY", "SECONDARY"],
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff43c63efe5c",
    location: "M. Adriatico St, Manila",
    pricePerNight: 9800.0,
    rating: 4.4,
    reviews: 670,
    distanceFromCityCenter: 2.1,
  },
  {
    id: "5",
    creator_id: "user-admin-01",
    title: "New Coast Hotel Manila",
    description:
      "Located in the heart of Malate, offering contemporary luxury and one of the best breakfast buffets in the city.",
    category_id: "cat-luxury",
    longitude: 120.9839,
    latitude: 14.5714,
    created_at: "2026-03-24T16:00:00Z",
    updated_at: "2026-03-25T10:15:00Z",
    category_names: ["Luxury", "Casino", "Nightlife"],
    category_types: ["PRIMARY", "SECONDARY", "SECONDARY"],
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    location: "Pedro Gil St, Manila",
    pricePerNight: 6500.0,
    rating: 4.3,
    reviews: 950,
    distanceFromCityCenter: 2.8,
  },
];

export { DEFAULT_ACCOMMODATION, SAMPLE_ACCOMMODATIONS };
