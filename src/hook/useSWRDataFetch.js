import useSWRImmutable from 'swr/immutable'
import axios from 'axios'

const useSWRDataFetch = (url) => {
  const fetcher = (url) => axios.get(url).then((res) => res.data)
  const { data, error } = useSWRImmutable(url, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export { useSWRDataFetch }
