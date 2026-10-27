import axiosInstance from "./axiosInstance";

export const fetchFaculty = (params) => axiosInstance.get("/faculty", { params }).then((r) => r.data);
export const fetchFacultyOne = (id) => axiosInstance.get(`/faculty/${id}`).then((r) => r.data);
export const createFaculty = (data) => axiosInstance.post("/faculty", data).then((r) => r.data);
export const updateFaculty = (id, data) => axiosInstance.put(`/faculty/${id}`, data).then((r) => r.data);
export const deleteFaculty = (id) => axiosInstance.delete(`/faculty/${id}`).then((r) => r.data);
