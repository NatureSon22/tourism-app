import PHILIPPINE_LOCAL_SERVICE from "@/src/constants/localServiceList";
import { QueryParams } from "@/src/types/filter";
import { Service } from "@/src/types/service";

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
    // const qs = buildQueryString(params);
    // const response = await api.get(`/consumer/listings?${qs.toString()}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { data: PHILIPPINE_LOCAL_SERVICE };
  },
};
