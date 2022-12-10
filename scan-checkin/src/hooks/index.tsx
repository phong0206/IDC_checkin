import React from "react";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

const token: any = localStorage.getItem("token") || null;

export const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const decodeToken = (token: any): Object => {
  let decoded;
  if (token) {
    decoded = jwt_decode(token);
  }
  return Object(decoded);
};
