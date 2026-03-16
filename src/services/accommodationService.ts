import type { Accommodation } from "@/src/constants/accomodations";
import accommodations from "@/src/constants/accomodations";

export type GetAvailableAccommodationsParams = {
  search?: string;
  area?: string | null;
  sort?: string | null;
  filters?: Record<string, any> | null;
};

export const accommodationService = {
  getAvailableAccommodations: async (
    params: GetAvailableAccommodationsParams,
  ): Promise<Accommodation[]> => {
    const search = (params.search ?? "").trim().toLowerCase();

    await new Promise((r) => setTimeout(r, 2000));

    const list = (accommodations ?? []) as Accommodation[];

    if (!search) return list;

    return list.filter((a) => {
      const name = (a.name ?? "").toLowerCase();
      const location = (a.location ?? "").toLowerCase();
      return name.includes(search) || location.includes(search);
    });
  },
};
