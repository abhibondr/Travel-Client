import axios, { AxiosRequestConfig } from "axios";
import endpoints from "./endpoints";
import AuthService from "../services/AuthService";

const API = axios.create({
  baseURL: endpoints?.serverBaseURL + "/api",
});

API.interceptors.request.use((req: any) => {
  const token = sessionStorage.getItem("accesstoken");
  if (token) req.headers["authorization"] = token;
  return req;
});

const resetSession = () => {
  sessionStorage.clear();
  window.location.href = "/login";
};

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status == 401) {
      AuthService.refreshToken(sessionStorage?.getItem("refreshtoken") || "")
        .then((response: any) => {
          if (response?.response?.status == 403) resetSession();
          else sessionStorage.setItem("accesstoken", response?.data?.data);
        })
        .catch((err) => {
          if (err?.response?.status == 403) {
            resetSession();
          }
        });
    }
    return error;
  }
);

export default API;
