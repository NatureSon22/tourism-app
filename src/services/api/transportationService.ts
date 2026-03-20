import {
  PHILIPPINE_TRANSPORTATION_DATA,
  Transportation,
} from "@/src/constants/transportationList";

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

    let list = PHILIPPINE_TRANSPORTATION_DATA;
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
    return PHILIPPINE_TRANSPORTATION_DATA.find((item) => item.id === id);
  },
};

export default transportationService;
