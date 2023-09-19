import { URL_API_SERVICES } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { IServices } from "../models/Services.type";

export default function useGetServices() {
  const { request, loading } = useFetch();

  const getServices = () => {
    return request<IServices[]>({
      url: URL_API_SERVICES,
    });
  };

  return {
    getServices,
    loading,
  };
}
