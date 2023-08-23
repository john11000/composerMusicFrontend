import { URL_API_INVOICES } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { Iinvoices } from '../models/Invoices.type';

export default function useGetInvoices() {
  const { request, loading } = useFetch();

  const getInvoices = () => {
    return request<Iinvoices[]>({ url: URL_API_INVOICES });
  };

  return {
    getInvoices,
    loading,
  };
}
