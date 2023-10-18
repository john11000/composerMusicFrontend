import { URL_API_GROUPS } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { IGroups } from "../models/Groups.type";

export const urlEditGroup = URL_API_GROUPS;

export default function useUpdateGroup() {
  const { request, loading } = useFetch();

  const updateGroup = (data: IGroups) => {
    return request({ method: "PUT", url: urlEditGroup + "/" + data.id, data });
  };

  return {
    urlEditGroup,
    updateGroup,
    loading,
  };
}
