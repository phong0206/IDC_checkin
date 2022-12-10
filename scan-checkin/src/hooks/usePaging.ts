import { useRequest } from "ahooks";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

const { CancelToken } = axios;
const page = 1;
const limit = 10;

const usePaging = (
  requestPaging: (config: any) => Promise<any>,
  cacheKey: string,
  initialParams?: any,
  onSuccess?: (data?: any, cbParams?: any) => void,
  onError?: (error: Error, cbParams?: any) => void
) => {
  const [data, setData] = useState<any>();
  const [paging, setPaging] = useState<any>();
  const [error, setError] = useState<Error | null>();
  const [params, setParams] = useState<any>(initialParams);

  const source = CancelToken.source();
  useEffect(() => {
    runRequest(params);
    return () => {
      source.cancel("useEffect cleanup...");
    };
  }, [params]);

  const handleOnSuccess = (dataRes: any) => {
    const { data: dataFetch, status, message } = dataRes?.data || {};
    if (status) {
      const newData: any = dataFetch;
      if (dataFetch?.paging) {
        setPaging(dataFetch?.paging);
      }
      setData(newData);
      setError(null);
      onSuccess?.(data);
    } else {
      setError(message);
    }
  };

  const handleOnError = (e: Error) => {
    console.error("error", e);
    onError?.(e);
  };

  const umiRequest = useRequest(requestPaging, {
    manual: true,
    onSuccess: handleOnSuccess,
    onError: handleOnError,
    cacheKey,
  });

  // config request paging
  const runRequest = (otherParams?: any) => {
    const paramsQuery = {
      page,
      limit,
      ...otherParams,
    };
    umiRequest.run({
      params: paramsQuery,
      cancelToken: source.token,
    });
  };

  return {
    ...umiRequest,
    data: data ? data : umiRequest?.data?.data?.data,
    paging: paging ? paging : {},
    loading: umiRequest.loading,
    error,
    setParams,
    refresh: umiRequest.refresh,
    run: umiRequest.run,
    runAsync: umiRequest.runAsync,
  };
};

export default usePaging;
