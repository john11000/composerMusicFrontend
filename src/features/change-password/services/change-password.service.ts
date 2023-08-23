import { URL_API_BASE } from '@/constants/url-apis.constants';
import { HttpResponseError } from '@/models';
import axios, { AxiosError } from 'axios';
import { ChangePasswordRequest } from '../models/change-password.type';

const url = `${URL_API_BASE}/auth/reset-password`;
export const changePasswordService = async (data: ChangePasswordRequest) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<HttpResponseError>;

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message);
      // console.log('error.response.data', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log('error.request', error.request);
      throw new Error('Error al conectar con el servidor.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error no esperado.');
    }
  }
};
