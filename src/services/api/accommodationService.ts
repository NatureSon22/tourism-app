import accomodations, { Accommodation } from "@/src/constants/accomodations";

export type GetAvailableAccommodationsParams = {
  search?: string;
  area?: string | null;
  sort?: string | null;
  filters?: Record<string, any> | null;
};

export type AccommodationResponse = {
  data: Accommodation[];
  total: number;
};

export const accommodationService = {
  getAvailableAccommodations: async (
    params: GetAvailableAccommodationsParams,
  ): Promise<AccommodationResponse> => {
    // 1. Simulate network delay (longer for bookings/availability)
    await new Promise((r) => setTimeout(r, 1500));

    const search = (params.search ?? "").trim().toLowerCase();
    let result = [...(accomodations ?? [])];

    // 2. Filter by Search (Name or Location)
    if (search) {
      result = result.filter((a) => {
        const name = (a.name ?? "").toLowerCase();
        const location = (a.location ?? "").toLowerCase();
        return name.includes(search) || location.includes(search);
      });
    }

    // 3. Filter by Area
    if (params.area && params.area !== "all") {
      result = result.filter((a) =>
        a.location.toLowerCase().includes(params.area!.toLowerCase()),
      );
    }

    return {
      data: result,
      total: result.length,
    };
  },

  getAccommodationById: async (
    id: string,
  ): Promise<Accommodation | undefined> => {
    await new Promise((r) => setTimeout(r, 500));
    return accomodations.find((a) => a.id === id);
  },
};
