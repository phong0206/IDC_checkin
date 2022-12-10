import axios from "axios";
import { baseUrl } from "../../configs/constants/admin/url";

const token = localStorage.getItem("token");

export const createUser = (body: any) => {
  let url = baseUrl + `/v1/users`;
  return axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getListUserForAdmin = () => {
  let url = baseUrl + `/v1/users`;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserByIdForAdmin = (id: string) => {
  let url = baseUrl + `/v1/users/${id}`;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserForAdmin = (id: string, body: any) => {
  let url = baseUrl + `/v1/users/${id}`;
  return axios.put(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deactivateUser = (id: string) => {
  let url = baseUrl + `/v1/users/${id}/deactivate`;
  return axios.put(
    url,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const activateUser = (id: string) => {
  let url = baseUrl + `/v1/users/${id}/activate`;
  return axios.put(
    url,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateUserProfile = (body: any) => {
  let url = baseUrl + `/v1/users/profile`;
  return axios.put(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
