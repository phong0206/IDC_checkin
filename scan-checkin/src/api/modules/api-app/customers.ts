import request from "api/request";
import { TypeParamsPaging } from "api/interface/general";

export const getCustomers = (stt: Number) => {
  return request.get(`v1/customers/${stt}`);
};

export const checkIn = (stt: Number) => {
  return request.put(`v1/customers/update-check-in/${stt}`);
};
