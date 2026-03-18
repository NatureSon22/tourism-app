import { Dining, PHILIPPINE_DINING_DATA } from "../../constants/dining";

export type GetDiningParams = {
  filter?: string;
  search?: string;
};

export type DiningResponse = {
  data: Dining[];
  total: number;
};

const diningService = {
  getDiningData: async ({
    filter,
    search,
  }: GetDiningParams): Promise<DiningResponse> => {
    await new Promise((r) => setTimeout(r, 1000));

    const list = (PHILIPPINE_DINING_DATA ?? []) as Dining[];

    const text = (search ?? "").trim().toLowerCase();
    let result = list.filter((item) => {
      if (!text) return true;
      return (
        (item.name || "").toLowerCase().includes(text) ||
        (item.location || "").toLowerCase().includes(text)
      );
    });

    if (filter === "Nearby") {
      result = [...result].sort(
        (a, b) =>
          (a.distanceFromCityCenter ?? 0) - (b.distanceFromCityCenter ?? 0),
      );
    } else if (filter === "Recommended") {
      result = [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return {
      data: result,
      total: result.length,
    };
  },

  getDiningById: async (id: string): Promise<Dining | undefined> => {
    await new Promise((r) => setTimeout(r, 500));
    return PHILIPPINE_DINING_DATA.find((item) => item.id === id);
  },
};

export default diningService;
