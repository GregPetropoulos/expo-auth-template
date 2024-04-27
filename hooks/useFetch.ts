import { useState, useCallback, useEffect } from 'react';

import { TODO, APIResponse, APIConfig } from '@/types';

const useFetch = (url: string, config: APIConfig): APIResponse => {
  const [data, setData] = useState<TODO>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<any> => {
    try {
      const response = await fetch(url, config);

      if (!response.ok && response.status !== 404) {
        setErrorMessage(`Response failed to fetch:  ${response.status}`);
        throw new Error(`Response failed to fetch ${response.statusText} : ${response.status}`);
      }

      const jsonData = await response.json();
      console.log('JSONDATA', jsonData);
      setData(jsonData);
      setErrorMessage(null);
      setLoading(false);
    } catch (e: any) {
      setErrorMessage(`Network Error : ${e.message}`);
      setLoading(false);
      console.error(e);
    }
  }, [config, url]);

  useEffect(() => {
    let mount = true;
    if (mount) {
      setLoading(true);
      setErrorMessage(null);
      fetchData();
    }
    return (): void => {
      mount = false;
    };
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, errorMessage, refetch };
};

export default useFetch;
