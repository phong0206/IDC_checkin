import request from "api/request";
import { TypeParamsPaging } from "api/interface/general";

export const getUsers = (params?: TypeParamsPaging) => {
  return request.get(`v1/users`, params ? params : {});
};

export const createUser = (params: any, config?: any) =>
  request.post(`v1/users`, params, config ? config : {});
