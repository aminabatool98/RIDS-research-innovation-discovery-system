import axiosInstance from "./axiosInstance";

export const login = (data) => axiosInstance.post("/auth/login", data).then((r) => r.data);
export const register = (data) => axiosInstance.post("/auth/register", data).then((r) => r.data);
export const getMe = () => axiosInstance.get("/auth/me").then((r) => r.data);
