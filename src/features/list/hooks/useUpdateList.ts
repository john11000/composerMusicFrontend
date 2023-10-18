import useFetch from "@/hooks/useFetch";
import { ILists } from "../models/List.type";
import { URL_API_LIST } from "@/constants/url-apis.constants";

export const urlEditList = URL_API_LIST;

export default function useUpdateList() {
  const { request, loading } = useFetch();

  const updateList = (data: ILists) => {
    return request({ method: "PUT", url: urlEditList + "/" + data.id, data });
  };

  return {
    urlEditList,
    updateList,
    loading,
  };
}
