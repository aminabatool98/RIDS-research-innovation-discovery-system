import axiosInstance from "./axiosInstance";

export const globalSearch = (params) => axiosInstance.get("/search", { params }).then((r) => r.data);
