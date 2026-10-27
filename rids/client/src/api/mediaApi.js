import axiosInstance from "./axiosInstance";

export const fetchMedia = (params) => axiosInstance.get("/media", { params }).then((r) => r.data);
export const createMedia = (data) => axiosInstance.post("/media", data).then((r) => r.data);
export const updateMedia = (id, data) => axiosInstance.put(`/media/${id}`, data).then((r) => r.data);
export const deleteMedia = (id) => axiosInstance.delete(`/media/${id}`).then((r) => r.data);
