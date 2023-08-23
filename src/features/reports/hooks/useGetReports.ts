import { URL_API_REPORTS } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { IReportsFormState } from '../models/Reports.type';

export default function useGetReports() {
  const { request, loading } = useFetch();

  const getReportsByFilter = (data: IReportsFormState) => {
    return request<IReportsFormState[]>({ url: URL_API_REPORTS, params: data });
  };

  return {
    getReportsByFilter,
    loading,
  };
}
