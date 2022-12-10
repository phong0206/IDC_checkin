import axios, { Method } from "axios";
import { useEffect, useState } from "react";
import useToast from "components/Toast";

const { CancelToken } = axios;
export interface State {
  loading: boolean;
  error?: any;
  response?: any;
}

const useAPI = (
  requestToApi: (body: any, config: any) => Promise<any>,
  initialRequest = false
) => {
  const [state, setState] = useState<State>({
    loading: false,
  });
  const { toastSuccess, toastError } = useToast();

  const source = CancelToken.source();

  const request = async (body: any) => {
    try {
      setState({ error: undefined, loading: true });
      const responseApi: any = await requestToApi(body, {
        cancelToken: source.token,
      });

      if (responseApi.data.status) {
        toastSuccess(responseApi.data.message);
        setState({ response: responseApi.data.data, loading: false });
      } else {
        toastError(responseApi.data.message);
        setState({ error: responseApi.data.message, loading: false });
      }
    } catch (errorApi: any) {
      if (axios.isCancel(errorApi)) {
        console.error("Request canceled by cleanup: ", false, errorApi.message);
      } else {
        setState({ error: errorApi, response: undefined, loading: false });
      }
    }
  };

  const { response, error, loading } = state;

  // const setData = (newData: any) => {
  //     // Used to update state from component
  //     const newResponse: any = { ...response, data: newData }
  //     setState({ ...state, response: newResponse })
  // }

  return { loading, response, error, request };
};

export default useAPI;
