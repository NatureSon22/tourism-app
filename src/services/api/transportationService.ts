import { Transportation } from "@/src/constants/transportationList";

// Mock Data for Development
const MOCK_TRANSPORT: Transportation[] = [
  {
    id: "1",
    name: "Fast Ferry - Cebu to Bohol",
    location: "Cebu Pier 1",
    price: 800,
    rating: 4.8,
    reviews: 120,
    imageUrl: "...",
  },
  {
    id: "2",
    name: "Private Van - PPS to El Nido",
    location: "Puerto Princesa",
    price: 600,
    rating: 4.5,
    reviews: 85,
    imageUrl: "...",
  },
];

export type GetTransportationParams = {
  search?: string;
  type?: "Ferry" | "Van" | "Flight" | "All";
  sort?: "price_low" | "rating_high";
};

export type TransportationResponse = {
  data: Transportation[];
  total: number;
};

const transportationService = {
  getTransportation: async (
    params: GetTransportationParams,
  ): Promise<TransportationResponse> => {
    await new Promise((r) => setTimeout(r, 1000));

    let list = [...MOCK_TRANSPORT];
    const search = params.search?.toLowerCase().trim();

    // 1. Filter by Search
    if (search) {
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.location.toLowerCase().includes(search),
      );
    }

    // 2. Apply Sorting
    if (params.sort === "price_low") {
      list.sort((a, b) => a.price - b.price);
    } else if (params.sort === "rating_high") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return {
      data: list,
      total: list.length,
    };
  },

  getTransportationById: async (
    id: string,
  ): Promise<Transportation | undefined> => {
    await new Promise((r) => setTimeout(r, 500));
    return MOCK_TRANSPORT.find((item) => item.id === id);
  },
};

export default transportationService;
