import { URL_API_CITIES } from "@/constants/url-apis.constants";
import useFetch from "./useFetch";
import { IDepartments } from "@/features/customers/models/Customers.type";

export default function useGetDepartaments() {
  const { request, loading } = useFetch();

  const getDepartaments = () => {
    return request<IDepartments[]>({ url: URL_API_CITIES });
  };

  return { getDepartaments, loading };
}
