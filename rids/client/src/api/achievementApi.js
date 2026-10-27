import axiosInstance from "./axiosInstance";

export const fetchAchievements = (params) => axiosInstance.get("/achievements", { params }).then((r) => r.data);
export const createAchievement = (data) => axiosInstance.post("/achievements", data).then((r) => r.data);
export const updateAchievement = (id, data) => axiosInstance.put(`/achievements/${id}`, data).then((r) => r.data);
export const deleteAchievement = (id) => axiosInstance.delete(`/achievements/${id}`).then((r) => r.data);
