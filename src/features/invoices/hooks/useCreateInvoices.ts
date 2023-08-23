import { URL_API_INVOICES } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { Iinvoices } from '../models/Invoices.type';
import { AdapterNewInvoice } from '../adapters/invoiceAdapter';

export default function useCreateInvoice() {
  const { request, loading } = useFetch();

  const createInvoice = (data: Iinvoices) => {
    const newInvoice = AdapterNewInvoice(data);
    return request({ method: 'POST', url: URL_API_INVOICES, data: newInvoice });
  };

  return {
    createInvoice,
    loading,
  };
}
