import axiosInstance from "./axiosInstance";

export const fetchNews = (params) => axiosInstance.get("/news", { params }).then((r) => r.data);
export const createNews = (data) => axiosInstance.post("/news", data).then((r) => r.data);
export const updateNews = (id, data) => axiosInstance.put(`/news/${id}`, data).then((r) => r.data);
export const deleteNews = (id) => axiosInstance.delete(`/news/${id}`).then((r) => r.data);
