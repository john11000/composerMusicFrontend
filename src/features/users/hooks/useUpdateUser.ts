import { URL_API_USERS } from '@/constants/url-apis.constants';
import useFetch from '@/hooks/useFetch';
import { IUser } from '../models/users.type';

export const urlEditUser = URL_API_USERS;

export default function useUpdateUser() {
  const { request, loading } = useFetch();

  const updateUser = (data: IUser) => {
    return request({ method: 'PUT', url: urlEditUser + '/' + data.id, data });
  };

  const updateUserState = (data: Partial<IUser>) => {
    return request({ method: 'PUT', url: urlEditUser + '/' + data.id, data });
  };

  return {
    updateUser,
    updateUserState,
    loading,
  };
}
