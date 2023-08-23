import { URL_API_REFERENCES } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { IReferences } from '../models/References.type';

export const urlEditReference = URL_API_REFERENCES;

export default function useUpdateReference() {
  const { request, loading } = useFetch();

  const updateReference = (data: Partial<IReferences>) => {
    return request({ method: 'PUT', url: urlEditReference + '/' + data.id, data });
  };

  return {
    urlEditReference,
    updateReference,
    loading,
  };
}
