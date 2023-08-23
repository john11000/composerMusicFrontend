import { URL_API_SERVICES } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { IServices } from '../models/Services.type';

export const urlEditService = URL_API_SERVICES;

export default function useUpdateService() {
  const { request, loading } = useFetch();

  const updateService = (data: IServices) => {
    return request({ method: 'PUT', url: urlEditService + '/' + data.id, data });
  };

  return {
    urlEditService,
    updateService,
    loading,
  };
}
