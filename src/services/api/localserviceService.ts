import PHILIPPINE_LOCAL_SERVICE from "@/src/constants/localServiceList";
import { QueryParams } from "@/src/types/filter";
import { Service } from "@/src/types/service";

export type ServiceResponse = {
  data: {
    listings: Service[];
    pagination: {
      count: number;
      currentPage: number;
      limit: number;
      total: number;
    };
  };
};

export const localserviceService = {
  getAvailableServices: async (
    params: QueryParams,
  ): Promise<ServiceResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { search, sort, page, limit } = params;
    let list = [...(PHILIPPINE_LOCAL_SERVICE ?? [])];

    if (search) {
      const query = search.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query),
      );
    }

    const currentPage = Math.max(1, page ?? 1);
    const limitPerPage = limit ?? 5;
    const total = list.length;
    const start = (currentPage - 1) * limitPerPage;
    const end = start + limitPerPage;
    const listings = list.slice(start, end);

    return {
      data: {
        listings,
        pagination: {
          count: listings.length,
          currentPage,
          limit: limitPerPage,
          total,
        },
      },
    };
  },
};
