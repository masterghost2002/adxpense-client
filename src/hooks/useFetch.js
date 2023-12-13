import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
/*
    @params url -> string
    @params defaultData -> to be used in useState before fetching the data
*/
export default function useFetch({ url, defaultData = [] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(defaultData);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      const data = await res.data;
      setData(data);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);
  useEffect(() => {
    if (!url || typeof url !== 'string' || url.trim().length === 0) {
      const error = new error('Url must be a non empty string');
      console.error(error);
      return;
    }
    fetchData();
  }, [url, fetchData]);
  return {
    isLoading,
    isError,
    data,
    setIsError,
    setIsLoading,
    fetchData,
    setData,
  };
}
