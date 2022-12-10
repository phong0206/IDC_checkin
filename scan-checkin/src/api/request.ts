import axios, { AxiosRequestConfig } from "axios";
import TokenProvider from "utilities/authenticate/TokenProvider";
import AuthenticateService from "utilities/authenticate/AuthenticateService";

import { Store } from "react-notifications-component";

import { Config } from "configs";

const request = axios.create({
  baseURL: Config.API_URL,
  timeout: 8000,
  headers: { Accept: "*/*" },
});

request.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // Do something before API is sent
    const token = TokenProvider.getToken();
    if (token && config.headers !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    // Do something with API error
    console.log(
      `%c FAILED ${error.response.method?.toUpperCase()} from ${
        error.response.config.url
      }:`,
      "background: red; color: #fff",
      error.response
    );
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      // store.addNotification({
      //   message: response.data.message,
      //   type: "success",
      //   insert: "top",
      //   container: "top-right",
      //   animationIn: ["animate__animated", "animate__fadeIn"],
      //   animationOut: ["animate__animated", "animate__fadeOut"],
      //   dismiss: {
      //     duration: 3000,
      //     onScreen: true,
      //   },
      // });
    }
    return response;
  },

  (error) => {
    if (error.code == "ECONNABORTED" || error.response.status === 408) {
      Store.addNotification({
        message: "Timeout error",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }

    if (error.response.status === 500) {
      Store.addNotification({
        message: "System error",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    } else if (error.response.status === 401) {
      Store.addNotification({
        message: "Unauthorize error",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    } else if (error.response.status === 404) {
      const mess = error.response.data.message;
      if (mess) {
        Store.addNotification({
          message: mess,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
      }
    } else {
      // const mess = error.response.data.message;
      // if (mess) {
      //   Store.addNotification({
      //     message: mess,
      //     type: "danger",
      //     insert: "top",
      //     container: "top-right",
      //     animationIn: ["animate__animated", "animate__fadeIn"],
      //     animationOut: ["animate__animated", "animate__fadeOut"],
      //     dismiss: {
      //       duration: 3000,
      //       onScreen: true,
      //     },
      //   });
      // }
    }

    return Promise.reject(error);
  }
);

export default request;
