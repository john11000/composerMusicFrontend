import { AppStore } from "@/redux/store";
import { loadAbort } from "@/utilities";
import { AxiosRequestConfig } from "axios";
import axios from "@/interceptors/axios.interceptor";
import { useSelector } from "react-redux";
import useFetchAndLoad from "./useFetchAndLoad";

export default function useFetch() {
  const controller = loadAbort();
  const authState = useSelector((state: AppStore) => state.authState);
  const { callEndpoint, loading } = useFetchAndLoad();

  const request = <T>(config: AxiosRequestConfig<any>) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${authState.accessToken}`;

    return callEndpoint<T>({
      call: axios<T>({ ...config }),
      controller,
    });
  };

  return { request, loading };
}
