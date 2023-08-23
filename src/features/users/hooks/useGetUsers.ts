import { URL_API_USERS } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { IUser } from '../models/users.type';

export default function useGetUsers() {
  const { request, loading } = useFetch();

  const getUsers = () => {
    return request<IUser[]>({ url: URL_API_USERS });
  };

  return {
    getUsers,
    loading,
  };
}
