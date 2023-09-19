import { URL_API_FAULT_CAUSAL } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { IFaultCausals } from "../models/FaultCausals.type";

export const urlEditFaultCausal = URL_API_FAULT_CAUSAL;

export default function useUpdateFaultCausal() {
  const { request, loading } = useFetch();

  const updateFaultCausal = (data: IFaultCausals) => {
    return request({
      method: "PUT",
      url: urlEditFaultCausal + "/" + data.id,
      data,
    });
  };

  return {
    urlEditFaultCausal,
    updateFaultCausal,
    loading,
  };
}
