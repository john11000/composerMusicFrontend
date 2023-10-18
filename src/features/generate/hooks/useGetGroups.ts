import { URL_API_GROUPS } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { IGroups } from "../models/Groups.type";

export default function useGetGroups() {
  const { request, loading } = useFetch();

  const getGroups = () => {
    return request<IGroups[]>({ url: URL_API_GROUPS });
  };

  return {
    getGroups,
    loading,
  };
}
