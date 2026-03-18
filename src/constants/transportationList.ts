export type Transportation = {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
};

export const PHILIPPINE_TRANSPORTATION_DATA: Transportation[] = [
  {
    id: "1",
    name: "Cebu - Bohol Ferry by OceanJet",
    location: "Tagbilaran, Bohol",
    price: 1200,
    rating: 4.5,
    reviews: 782,
    imageUrl:
      "https://images.unsplash.com/photo-1516939814614-77443a027964?q=80&w=400",
  },
  {
    id: "2",
    name: "Boracay Shared Speedboat Transfer",
    location: "Caticlan, Aklan",
    price: 650,
    rating: 4.8,
    reviews: 1240,
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400",
  },
  {
    id: "3",
    name: "Premium P2P Bus (Makati - BGC)",
    location: "Metro Manila",
    price: 150,
    rating: 4.3,
    reviews: 420,
    imageUrl:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400",
  },
  {
    id: "4",
    name: "El Nido to Coron Expedition Boat",
    location: "Palawan",
    price: 2800,
    rating: 4.9,
    reviews: 315,
    imageUrl:
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=400",
  },
  {
    id: "5",
    name: "Private Van Transfer (PPS - El Nido)",
    location: "Puerto Princesa",
    price: 700,
    rating: 4.1,
    reviews: 2105,
    imageUrl:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400",
  },
  {
    id: "6",
    name: "Siargao Island Habal-Habal Rental",
    location: "General Luna",
    price: 450,
    rating: 4.7,
    reviews: 890,
    imageUrl:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=400",
  },
  {
    id: "7",
    name: "Manila City Tour via Jeepney",
    location: "Intramuros, Manila",
    price: 120,
    rating: 4.4,
    reviews: 562,
    imageUrl:
      "https://images.unsplash.com/photo-1518413922312-70b094896797?q=80&w=400",
  },
  {
    id: "8",
    name: "Clark Airport P2P to NAIA",
    location: "Pampanga",
    price: 450,
    rating: 4.6,
    reviews: 112,
    imageUrl:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=400",
  },
];
