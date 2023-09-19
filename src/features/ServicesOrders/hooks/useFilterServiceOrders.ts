import { URL_API_INVOICES_SEARCH } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import {
  IFiltersFormState,
  IServiceOrders,
} from "../models/ServiceOrders.type";

export default function useFilterServiceOrders() {
  const { request, loading } = useFetch();

  const findServiceOrders = (data: IFiltersFormState) => {
    let filters = "?";
    if (data.state) {
      filters += "&state=" + data.state;
    }

    return request<IServiceOrders[]>({
      url: URL_API_INVOICES_SEARCH + filters,
    });
  };

  return {
    findServiceOrders,
    loading,
  };
}
