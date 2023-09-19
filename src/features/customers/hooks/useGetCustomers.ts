import { URL_API_CUSTOMERS } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { ICustomers } from "../models/Customers.type";

export default function useGetCustomers() {
  const { request, loading } = useFetch();

  const getCustomers = () => {
    return request<ICustomers[]>({ url: URL_API_CUSTOMERS });
  };

  return {
    getCustomers,
    loading,
  };
}
