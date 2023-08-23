import { URL_API_REFERENCES } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { IReferences } from '../models/References.type';

export default function useGetReferences() {
  const { request, loading } = useFetch();

  const getReferences = () => {
    return request<IReferences[]>({ url: URL_API_REFERENCES });
  };

  return {
    getReferences,
    loading,
  };
}
