import { URL_API_FAVORITE } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";

export default function usePutList () {
    const { request, loading } = useFetch();

    const toogleFavorite = (state: boolean, id: string) => {
        request<any>({ method: 'PUT', url: URL_API_FAVORITE, data: {
            'state' : state,
            'id' : id,
        }});
    }

    return  {
        toogleFavorite,
        loading
    }
}