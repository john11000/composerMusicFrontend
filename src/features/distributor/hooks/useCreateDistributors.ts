import { URL_API_DISTRIBUTORS } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { IDistributors } from '../models/Distributors.type';

export default function useCreateDistributor() {
  const { request, loading } = useFetch();

  const createDistributor = (data: IDistributors) => {
    return request({ method: 'POST', url: URL_API_DISTRIBUTORS, data });
  };

  return {
    createDistributor,
    loading,
  };
}
