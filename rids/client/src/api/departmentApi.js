import axiosInstance from "./axiosInstance";

export const fetchDepartments = (params) => axiosInstance.get("/departments", { params }).then((r) => r.data);
export const fetchDepartmentOne = (id) => axiosInstance.get(`/departments/${id}`).then((r) => r.data);
export const createDepartment = (data) => axiosInstance.post("/departments", data).then((r) => r.data);
export const updateDepartment = (id, data) => axiosInstance.put(`/departments/${id}`, data).then((r) => r.data);
export const deleteDepartment = (id) => axiosInstance.delete(`/departments/${id}`).then((r) => r.data);
