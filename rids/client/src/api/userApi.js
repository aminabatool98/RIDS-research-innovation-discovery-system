import axiosInstance from "./axiosInstance";

export const fetchUsers = (params) => axiosInstance.get("/users", { params }).then((r) => r.data);
export const updateUserRole = (id, role) => axiosInstance.put(`/users/${id}/role`, { role }).then((r) => r.data);
export const toggleUserActive = (id) => axiosInstance.put(`/users/${id}/toggle-active`).then((r) => r.data);
export const deleteUser = (id) => axiosInstance.delete(`/users/${id}`).then((r) => r.data);
