import { URL_API_INVOICES } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";
import { IFiltersFormStateInvoices, Iinvoices } from "../models/Invoices.type";

export default function useFilterInvoices() {
  const { request, loading } = useFetch();

  const findInvoices = (data: IFiltersFormStateInvoices) => {
    return request<Iinvoices[]>({
      url: URL_API_INVOICES,
      params: {
        identificationNumber: data.identificationNumber,
        referenceDescription: data.referenceDescription,
        address: data.address,
      },
    });
  };

  return {
    findInvoices,
    loading,
  };
}
