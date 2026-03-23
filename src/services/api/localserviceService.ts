import api from "@/src/config/axios";
import PHILIPPINE_LOCAL_SERVICE from "@/src/constants/localServiceList";
import { QueryParams } from "@/src/types/filter";
import { Service } from "@/src/types/service";
import { buildQueryString } from "@/src/utils/buildQueryString";

export type ServiceResponse = {
  data: Service[];
  total?: number;
  page?: number;
  limit?: number;
};

export const localserviceService = {
  getAvailableServices: async (
    params: QueryParams,
  ): Promise<ServiceResponse> => {
    console.log("params: ", params);
    const qs = buildQueryString(params);
    const response = await api.get(`/consumer/listings?${qs.toString()}`);
    return { data: PHILIPPINE_LOCAL_SERVICE };
  },
};
