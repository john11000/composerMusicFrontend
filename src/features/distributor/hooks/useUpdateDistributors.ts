import { URL_API_DISTRIBUTORS } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { IDistributors } from '../models/Distributors.type';

export const urlEditDistributor = URL_API_DISTRIBUTORS;

export default function useUpdateDistributor() {
  const { request, loading } = useFetch();

  const updateDistributor = (data: Partial<IDistributors>) => {
    return request({ method: 'PUT', url: urlEditDistributor + '/' + data.id, data });
  };

  return {
    urlEditDistributor,
    updateDistributor,
    loading,
  };
}
