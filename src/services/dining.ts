import { PHILIPPINE_DINING_DATA } from "../constants/dining";

type GetDiningArgs = {
  filter?: string;
  search?: string;
};

const diningService = {
  getDiningData: async ({ filter, search }: GetDiningArgs) => {
    // simulate small network delay for development/testing
    await new Promise((r) => setTimeout(r, 1000));

    const list = (PHILIPPINE_DINING_DATA ?? []) as any[];

    // basic text search (name or location)
    const text = (search ?? "").trim().toLowerCase();
    let result = list.filter((item) => {
      if (!text) return true;
      return (
        (item.name || "").toLowerCase().includes(text) ||
        (item.location || "").toLowerCase().includes(text)
      );
    });

    // basic filter examples (Recommended / Nearby etc.)
    if (filter === "Nearby") {
      result = result.sort(
        (a, b) =>
          (a.distanceFromCityCenter ?? 0) - (b.distanceFromCityCenter ?? 0),
      );
    } else if (filter === "Recommended") {
      result = result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return result;
  },
};

export default diningService;
