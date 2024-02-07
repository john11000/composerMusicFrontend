import { URL_API_TRANSCRIPT_LIST } from "@/constants/url-apis.constants"
import useFetch from "@/hooks/useFetch"
import { ResponseList } from "../models/transcript.models";

const useGetTranscriptList = () => {
    const {request, loading} = useFetch();
    const getTranscriptList = () => {
        return request<ResponseList>({ url: URL_API_TRANSCRIPT_LIST})
    }

    return {
        getTranscriptList,
        loading,
    }
}

export default useGetTranscriptList;