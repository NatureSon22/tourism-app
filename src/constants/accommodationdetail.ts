import forumData, { Author, ForumPost } from "./forum";

type Package = {
  name: string;
  price: number;
};

export type HotlineEntry = {
  label: string;
  phone: string;
};

export type Review = {
  id: string;
  author: Author;
  rating: number;
  comment: string;
};

export type Expectation = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type AccommodationListing = {
  id: string;
  images: string[];
  name: string;
  rating: number;
  reviews: number;
  books: number;
  tags: string[];
  location: string;
  description: string;
  packages: Package[];
  forums: ForumPost[]; // dont put data
  reviewsData: Review[];
  expects: Expectation[];
  hotlines: HotlineEntry[];
};

export const LISTING_INFO: AccommodationListing = {
  id: "listing-en-001",
  images: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000",
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000",
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000",
  ],
  name: "Bacuit Bay Eco-Sanctuary",
  rating: 4.9,
  reviews: 1240,
  books: 85,
  tags: [
    "Resort",
    "Water Spa",
    "Private Resort",
    "Free WI-FI",
    "Spa",
    "Elevator",
    "Parking Space",
  ],
  location: "Ace Water Spa Quezon City 399 Del Monte Avenue, Quezon City",
  description:
    "Experience sustainable luxury at the heart of Bacuit Bay. Our eco-sanctuary offers over-water villas with direct lagoon access, powered entirely by solar energy. Enjoy private dining under the stars and wake up to the sound of limestone cliffs meeting the sea.",
  packages: [
    { name: "Full-Board Eco Escape", price: 18500 },
    { name: "Honeymoon Sunset Suite", price: 25000 },
    { name: "Adventure & Dive Special", price: 21000 },
  ],
  forums: forumData,
  reviewsData: [
    {
      id: "rev-01",
      author: {
        id: 10,
        name: "Kiara Son",
        avatarUrl: "https://ui-avatars.com/api/?name=Kiara+Son",
      },
      rating: 5,
      comment:
        "The most magical place I've ever stayed. The staff truly cares about the environment and the service is impeccable.",
    },
    {
      id: "rev-02",
      author: {
        id: 10,
        name: "Sam Ajinomoto",
        avatarUrl: "https://ui-avatars.com/api/?name=Sam+Ajinomoto",
      },
      rating: 4,
      comment:
        "Incredible views. The boat transfer was a bit long, but absolutely worth it once you see the lagoon.",
    },
    {
      id: "rev-03",
      author: {
        id: 10,
        name: "Grace Templanza",
        avatarUrl: "https://ui-avatars.com/api/?name=Grace+Templanza",
      },
      rating: 5,
      comment:
        "The kayaking tour included in the stay was the highlight of our trip!",
    },
  ],
  hotlines: [
    { label: "Reservations", phone: "(02) 1234-5678" },
    { label: "Customer Service", phone: "(02) 8765-4321" },
  ],
  expects: [
    {
      id: "exp-01",
      name: "Private Lagoon Access",
      description:
        "Step directly from your balcony into the turquoise waters of a private protected lagoon.",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000",
    },
    {
      id: "exp-02",
      name: "Farm-to-Table Dining",
      description:
        "Enjoy organic meals prepared with ingredients sourced from our own island garden and local fishermen.",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000",
    },
    {
      id: "exp-03",
      name: "Solar-Powered Comfort",
      description:
        "State-of-the-art air conditioning and amenities powered 100% by renewable energy.",
      image:
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1000",
    },
  ],
};
