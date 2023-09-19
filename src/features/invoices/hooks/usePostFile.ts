import { URL_API_INVOICES } from "@/constants/url-apis.constants";
import useFetch from "@/hooks/useFetch";

export default function usePostFile() {
  const { request, loading } = useFetch();
  const postFile = (data: File, dataInvoice: { id: number }) => {
    const formData = new FormData();
    formData.append("file", data);
    return request({
      url: URL_API_INVOICES + "/" + dataInvoice?.id + "/upload-receipt",
      method: "POST",
      data: formData,
    });
  };
  return {
    postFile,
    loading,
  };
}
