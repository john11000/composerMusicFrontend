import { URL_API_GROUPS } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { IGroups } from "../models/Groups.type";

export default function useCreateGroup() {
  const { request, loading } = useFetch();

  const createGroup = (data: any, token: string) => {
    return request({ method: "POST", url: URL_API_GROUPS + '/' + token, data });
  };

  return {
    createGroup,
    loading,
  };
}
