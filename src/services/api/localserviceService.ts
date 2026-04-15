import PHILIPPINE_LOCAL_SERVICE, {
  LocalServiceList,
} from "@/src/constants/localServiceList";
import { QueryParams } from "@/src/types/filter";
import { SERVICE } from "@/src/types/listingTypes";

export type ServiceResponse = {
  data: {
    listings: SERVICE[];
    pagination: {
      count: number;
      currentPage: number;
      limit: number;
      total: number;
    };
  };
};

const mapLocalService = (item: LocalServiceList): SERVICE => ({
  id: item.id,
  title: item.name,
  thumbnail: item.imageUrl,
  base_price: 0,
  merchant_id: 0,
  module_id: 0,
  main_category_id: 0,
  status: "Active",
  highlights: item.location,
  email: "service@tourism.local",
  addresses: [
    {
      id: Number(item.id) || 0,
      listing_id: Number(item.id) || 0,
      lat: 0,
      lng: 0,
      formatted: item.location,
      region: "",
      region_code: "",
      province: item.province,
      province_code: "",
      city: item.location,
      city_code: "",
      barangay: "",
      street: "",
      postal_code: "",
      is_primary: true,
    },
  ],
  categories: [
    {
      id: Number(item.id) * 10 + 1,
      name: "Service",
      type: "PRIMARY",
    },
  ],
  distanceFromCityCenter: item.distanceFromCityCenter,
});

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
    const listings = list.slice(start, end).map(mapLocalService);

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
