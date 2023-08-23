import { URL_API_SERVICE_ORDERS } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { IServiceOrders } from '../models/ServiceOrders.type';

export const urlEditServiceOrder = URL_API_SERVICE_ORDERS;

export default function useUpdateServiceOrder() {
  const { request, loading } = useFetch();

  const updateServiceOrder = (data: IServiceOrders) => {
    return request({ method: 'PUT', url: urlEditServiceOrder + '/' + data.id, data });
  };

  return {
    urlEditServiceOrder,
    updateServiceOrder,
    loading,
  };
}
