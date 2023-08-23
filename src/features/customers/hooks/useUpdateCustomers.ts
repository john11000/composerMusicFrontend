import { URL_API_CUSTOMERS } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { ICustomers } from '../models/Customers.type';

export const urlEditCustomer = URL_API_CUSTOMERS;

export default function useUpdateCustomer() {
  const { request, loading } = useFetch();

  const updateCustomer = (data: Partial<ICustomers>) => {
    return request({ method: 'PUT', url: urlEditCustomer + '/' + data.id, data });
  };

  return {
    urlEditCustomer,
    updateCustomer,
    loading,
  };
}
