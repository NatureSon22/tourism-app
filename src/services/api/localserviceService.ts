import api from "@/src/config/axios";
import { LocalServiceList } from "@/src/constants/localServiceList";
import { QueryParams } from "@/src/types/filter";
import { SERVICE } from "@/src/types/listingTypes";
import { buildQueryString } from "@/src/utils/buildQueryString";

export type ServiceResponse = {
  data: {
    listings: SERVICE[];
    pagination?: {
      count: number;
      currentPage: number;
      limit: number;
      total: number;
    };
  };
};

// const mapLocalService = (item: LocalServiceList): SERVICE => ({
//   id: item.id,
//   title: item.name,
//   thumbnail: item.imageUrl,
//   base_price: 0,
//   merchant_id: 0,
//   module_id: 0,
//   main_category_id: 0,
//   status: "Active",
//   highlights: item.location,
//   email: "service@tourism.local",
//   addresses: [
//     {
//       id: Number(item.id) || 0,
//       listing_id: Number(item.id) || 0,
//       lat: 0,
//       lng: 0,
//       formatted: item.location,
//       region: "",
//       region_code: "",
//       province: item.province,
//       province_code: "",
//       city: item.location,
//       city_code: "",
//       barangay: "",
//       street: "",
//       postal_code: "",
//       is_primary: true,
//     },
//   ],
//   categories: [
//     {
//       id: Number(item.id) * 10 + 1,
//       name: "Service",
//       type: "PRIMARY",
//     },
//   ],
//   distanceFromCityCenter: item.distanceFromCityCenter,
// });

export const localserviceService = {
  getAvailableServices: async (
    params: QueryParams,
  ): Promise<ServiceResponse> => {
    const qs = buildQueryString(params);

    const response = await api.get(`/consumer/listings?${qs.toString()}`);
    return response.data;
  },
  getLocalServiceDetails: async (id: string): Promise<SERVICE> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [] as unknown as SERVICE;
  },
};
