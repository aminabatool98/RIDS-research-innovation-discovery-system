import axiosInstance from "./axiosInstance";

export const fetchFields = (params) => axiosInstance.get("/fields", { params }).then((r) => r.data);
export const fetchFieldOne = (id) => axiosInstance.get(`/fields/${id}`).then((r) => r.data);
export const createField = (data) => axiosInstance.post("/fields", data).then((r) => r.data);
export const updateField = (id, data) => axiosInstance.put(`/fields/${id}`, data).then((r) => r.data);
export const deleteField = (id) => axiosInstance.delete(`/fields/${id}`).then((r) => r.data);
