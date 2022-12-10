import axios from "axios";
import { baseUrl } from "../../configs/constants/admin/url";

export const login = async (body: any) => {
  try {
    const url = baseUrl + `/v1/auth/login`;
    const res = await axios.post(url, body);
    return res.status === 200 ? res.data : null;
  } catch (e) {
    console.error(e);
  }
};

export const me = async (token: string) => {
  try {
    let url = baseUrl + `/v1/auth/me`;
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.status === 200 ? res.data : null;
  } catch (e) {
    console.log(e);
  }
};
