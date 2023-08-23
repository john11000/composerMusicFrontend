import { URL_API_INVOICES } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { Iinvoices } from '../models/Invoices.type';
import { AdapterNewInvoice } from '../adapters/invoiceAdapter';

export const urlEditInvoice = URL_API_INVOICES;

export default function useUpdateInvoice() {
  const { request, loading } = useFetch();
  const updateInvoice = (data: Iinvoices) => {
    const newInvoice = AdapterNewInvoice(data);
    return request({ method: 'PUT', url: urlEditInvoice + '/' + data.id, data: newInvoice });
  };

  return {
    urlEditInvoice,
    updateInvoice,
    loading,
  };
}
