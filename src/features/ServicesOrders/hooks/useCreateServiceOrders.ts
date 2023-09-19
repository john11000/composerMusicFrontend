import { URL_API_SERVICE_ORDERS } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { POSTServiceOrders } from "../models/ServiceOrders.type";

export default function useCreateServiceOrder() {
  const { request, loading } = useFetch();

  const createServiceOrder = (data: POSTServiceOrders) => {
    return request({ method: "POST", url: URL_API_SERVICE_ORDERS, data });
  };

  return {
    createServiceOrder,
    loading,
  };
}
