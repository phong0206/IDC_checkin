import request from "api/request";
import { TypeParamsPaging } from "api/interface/general";

export const getPregnantWomen = (params?: TypeParamsPaging) => {
  return request.get(`/v1/pregnant-women/admin`, params ? params : {});
};

export const createPregnantWomenAdmin = (params: any, config?: any) =>
  request.post(`/v1/pregnant-women`, params, config ? config : {});
