import axios from "axios";
import { baseUrl } from "../../configs/constants/admin/url";

const token = localStorage.getItem("token");

export const getDoctorById = (id: string) => {
  let url = baseUrl + `/v1/doctors/${id}`;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllDoctorByClinic = (id: string) => {
  let url = baseUrl + `/v1/doctors/by-clinic/all?clinic=${id}`;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createDoctorByClinic = (body: any) => {
  let url = baseUrl + `/v1/doctors`;
  return axios.post(url, body, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllDoctor = () => {
  let url = baseUrl + `/v1/doctors`;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateDoctorByClinic = (body: any, id: string) => {
  let url = baseUrl + `/v1/doctors/${id}`;
  return axios.put(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteDoctor = (id: any) => {
  let url = baseUrl + `/v1/doctors/${id}`;
  return axios.delete(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unlockDoctor = (id: any) => {
  let url = baseUrl + `/v1/doctors/unlock/${id}`;
  return axios.put(url, {}, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
