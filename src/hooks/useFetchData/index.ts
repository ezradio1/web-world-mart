import type { AxiosResponse } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import type { ReturnValue, UseFetchDataProps } from "./index.types";

const useFetchData = <T extends unknown>(props: UseFetchDataProps<T>) => {
  const { url, params, skip = false } = props;
  const [returnValue, setReturnValue] = useState<ReturnValue<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = async ({ url, params }: UseFetchDataProps<T>) => {
    setReturnValue({ data: null, loading: true, error: null });
    try {
      const response: AxiosResponse<T> = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        { params }
      );
      setReturnValue({ data: response.data, loading: false, error: null });
    } catch (error: any) {
      setReturnValue({
        data: null,
        loading: false,
        error,
      });
    }
  };
  useEffect(() => {
    if (!skip) fetchData({ url, params });
  }, [url, params, skip]);

  const refetch = () => {
    fetchData(props);
  };

  return { ...returnValue, refetch };
};

export default useFetchData;
