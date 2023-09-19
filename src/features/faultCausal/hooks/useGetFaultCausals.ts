import { URL_API_FAULT_CAUSAL } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { IFaultCausals } from "../models/FaultCausals.type";

export default function useGetFaultCausals() {
  const { request, loading } = useFetch();

  const getFaultCausals = () => {
    return request<IFaultCausals[]>({ url: URL_API_FAULT_CAUSAL });
  };

  return {
    getFaultCausals,
    loading,
  };
}
