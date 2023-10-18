import useFetch from "@/hooks/useFetch";
import { ILists } from "../models/List.type";
import { URL_API_LIST } from "@/constants/url-apis.constants";

export default function useGetLists() {
  const { request, loading } = useFetch();

  const getLists = () => {
    return request<ILists[]>({ url: URL_API_LIST });
  };

  return {
    getLists,
    loading,
  };
}
