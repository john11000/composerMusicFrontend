import { URL_API_REFERENCES } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { IReferences } from '../models/References.type';

export default function useCreateReference() {
  const { request, loading } = useFetch();

  const createReference = (data: Partial<IReferences>) => {
    return request({ method: 'POST', url: URL_API_REFERENCES, data });
  };

  return {
    createReference,
    loading,
  };
}
