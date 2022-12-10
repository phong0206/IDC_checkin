import axios from "axios";
import { baseUrl } from "../../configs/constants/admin/url";

const token = localStorage.getItem("token");

export const createClinic = (body: any) => {
  let url = baseUrl + `/v1/clinics`;
  return axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllClinic = () => {
  let url = baseUrl + `/v1/clinics`;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllClinicById = (id: string) => {
  let url = baseUrl + `/v1/clinics/${id}`;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateClinicById = (id: string, body: any) => {
  let url = baseUrl + `/v1/clinics/${id}`;
  return axios.put(url, body, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateClinicForAdmin = (id: string, body: any) => {
  let url = baseUrl + `/v1/clinics/${id}/admin`;
  return axios.put(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDoctorByClinic = (id: string) => {
  let url = baseUrl + `/v1/doctors/by-clinic/all?clinic=${id}`;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteClinic = (id: string) => {
  let url = baseUrl + `/v1/clinics/${id}`;
  return axios.delete(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unlockClinic = (id: string) => {
  let url = baseUrl + `/v1/clinics/${id}/unlock`;
  return axios.put(url, {}, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
