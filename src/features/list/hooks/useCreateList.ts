import useFetch from "@/hooks/useFetch";
import { ILists } from "../models/List.type";
import { URL_API_LIST } from "@/constants/url-apis.constants";

export default function useCreateList() {
  const { request, loading } = useFetch();

  const createList = (data: ILists) => {
    return request({ method: "POST", url: URL_API_LIST, data });
  };

  return {
    createList,
    loading,
  };
}
