import useSWR from "swr";
import axios from "axios";

const useSWRDataFetch = (url, params) => {
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);

  // The revalidateIfStale controls if SWR should revalidate when
  // it mounts and there is stale data.
  const { data, error, isLoading, isValidating } = useSWR(
    url + params,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data: data,
    isLoading: isLoading,
    isValidating: isValidating,
    isError: error,
  };
};

export { useSWRDataFetch };
