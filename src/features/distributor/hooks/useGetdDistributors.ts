import { URL_API_DISTRIBUTORS } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { IDistributors } from '../models/Distributors.type';

export default function useGetDistributors() {
  const { request, loading } = useFetch();

  const getDistributors = () => {
    return request<IDistributors[]>({ url: URL_API_DISTRIBUTORS });
  };

  return {
    getDistributors,
    loading,
  };
}
