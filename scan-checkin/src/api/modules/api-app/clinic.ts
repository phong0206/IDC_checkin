import request from "api/request";
import { TypeParamsPaging } from "api/interface/general";

export const getClinics = (params?: TypeParamsPaging) => {
  return request.get(`v1/clinics`, params ? params : {});
};

export const getClinic = (id: string) => {
  return request.get(`v1/clinic/${id}`);
};

export const createClinic = (params: any, config?: any) =>
  request.post(`v1/clinics`, params, config ? config : {});
