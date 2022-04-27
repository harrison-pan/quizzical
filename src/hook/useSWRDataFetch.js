import useSWR from 'swr'
import axios from 'axios'

const useSWRDataFetch = (url, params) => {
  const fetcher = async (url) => await axios.get(url).then((res) => res.data)

  // The revalidateIfStale controls if SWR should revalidate when
  // it mounts and there is stale data.
  const { data, error } = useSWR([url, params], fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export { useSWRDataFetch }
