import request from "api/request";
import { TypeParamsPaging } from "api/interface/general";

export const getForms = (params?: TypeParamsPaging) => {
  return request.get(`v1/forms`, params ? params : {});
};

export const createForm = (params: any, config?: any) =>
  request.post(`v1/forms`, params, config ? config : {});
