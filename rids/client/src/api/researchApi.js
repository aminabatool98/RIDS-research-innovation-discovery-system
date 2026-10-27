import axiosInstance from "./axiosInstance";

export const fetchResearch = (params) => axiosInstance.get("/research", { params }).then((r) => r.data);
export const fetchResearchOne = (id) => axiosInstance.get(`/research/${id}`).then((r) => r.data);
export const fetchRelatedResearch = (id) => axiosInstance.get(`/research/${id}/related`).then((r) => r.data);
export const createResearch = (data) => axiosInstance.post("/research", data).then((r) => r.data);
export const updateResearch = (id, data) => axiosInstance.put(`/research/${id}`, data).then((r) => r.data);
export const deleteResearch = (id) => axiosInstance.delete(`/research/${id}`).then((r) => r.data);
