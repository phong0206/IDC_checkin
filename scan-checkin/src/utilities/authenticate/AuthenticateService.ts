import { TypeLoginRequest } from "api/interface/authenticate";
import { login } from "api/modules/api-app/authenticate";
import request from "api/request";
import { userInfoActions } from "redux/slices/userSlice";
import { store } from "redux/store";
import { useHistory } from "react-router-dom";
import useToast from "components/Toast";

// import AlertMessage from 'components/base/AlertMessage';
import { useState } from "react";
// import { logger } from 'utilities/helper';

const AUTH_URL_REFRESH_TOKEN = "/refreshToken";

interface LoginRequest {
  loading: boolean;
  requestLogin: (values: TypeLoginRequest) => Promise<void>;
}

export const isLogin = () => {
  const { userInfo } = store.getState();
  return !!userInfo?.token;
};

const AuthenticateService = {
  refreshToken: (inputRefreshToken: string) =>
    request.post(AUTH_URL_REFRESH_TOKEN, {
      refresh_token: inputRefreshToken,
    }),
  logOut: () => {
    store.dispatch(userInfoActions.logOut());
  },
  handlerLogin: (token: Record<string, string>) => {
    const { userInfo } = store.getState();
    store.dispatch(userInfoActions.updateToken(token));
  },
};

export const useLogin = (): LoginRequest => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { toastSuccess, toastError } = useToast();
  const requestLogin = async (options: TypeLoginRequest) => {
    try {
      setLoading(true);
      const response = await login(options);
      if (response.data.status) {
        store.dispatch(
          userInfoActions.getUserInfoRequest(response?.data?.data)
        );
        AuthenticateService.handlerLogin({ token: response?.data?.data });
      } else {
        toastError(response?.data?.message);
      }
    } catch (e) {
      // console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    requestLogin,
  };
};

export default AuthenticateService;
