import { userInfoActions } from "redux/slices/userSlice";
import { store } from "redux/store";
// import { logger } from 'utilities/helper';

const TokenProvider = {
  getToken: () => {
    const { userInfo } = store.getState();
    return userInfo.token || "";
  },

  clearToken: () => {
    store.dispatch(userInfoActions.updateToken({ token: undefined }));
  },
};

export default TokenProvider;
