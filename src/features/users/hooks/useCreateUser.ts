import { URL_API_USERS } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { IUser } from '../models/users.type';

export default function useCreateUser() {
  const { request, loading } = useFetch();

  const createUser = (data: IUser) => {
    return request({ method: 'POST', url: URL_API_USERS, data });
  };

  return {
    createUser,
    loading,
  };
}
