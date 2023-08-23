import { URL_API_FAULT_CAUSAL } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { IFaultCausals } from '../models/FaultCausals.type';

export default function useCreateFaultCausal() {
  const { request, loading } = useFetch();

  const createFaultCausal = (data: IFaultCausals) => {
    return request({ method: 'POST', url: URL_API_FAULT_CAUSAL, data });
  };

  return {
    createFaultCausal,
    loading,
  };
}
