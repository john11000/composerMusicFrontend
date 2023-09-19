import { URL_API_CUSTOMERS } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { ICustomers } from "../models/Customers.type";

export default function useCreateCustomer() {
  const { request, loading } = useFetch();

  const createCustomer = (data: Partial<ICustomers>) => {
    return request({ method: "POST", url: URL_API_CUSTOMERS, data });
  };

  return {
    createCustomer,
    loading,
  };
}
