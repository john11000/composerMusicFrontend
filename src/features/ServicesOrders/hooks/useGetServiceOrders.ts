import { URL_API_SERVICE_ORDERS } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { IServiceOrders } from "../models/ServiceOrders.type";

export default function useGetServiceOrders() {
  const { request, loading } = useFetch();

  const getServiceOrders = () => {
    return request<IServiceOrders[]>({ url: URL_API_SERVICE_ORDERS });
  };

  return {
    getServiceOrders,
    loading,
  };
}
