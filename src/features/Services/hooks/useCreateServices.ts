import { URL_API_SERVICES } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { IServices } from "../models/Services.type";

export default function useCreateService() {
  const { request, loading } = useFetch();

  const createService = (data: IServices) => {
    return request({ method: "POST", url: URL_API_SERVICES, data });
  };

  return {
    createService,
    loading,
  };
}
