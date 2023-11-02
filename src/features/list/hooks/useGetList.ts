import useFetch from "@/hooks/useFetch";
import { URL_API_LIST } from "@/constants/url-apis.constants";

export default function useGetLists() {
  const { request, loading } = useFetch();

  const getLists = () => {
    return request<any>({ url: URL_API_LIST + '/token' });
  };

  return {
    getLists,
    loading,
  };
}
