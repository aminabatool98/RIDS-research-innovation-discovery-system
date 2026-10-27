import axiosInstance from "./axiosInstance";

export const fetchEvents = (params) => axiosInstance.get("/events", { params }).then((r) => r.data);
export const createEvent = (data) => axiosInstance.post("/events", data).then((r) => r.data);
export const updateEvent = (id, data) => axiosInstance.put(`/events/${id}`, data).then((r) => r.data);
export const deleteEvent = (id) => axiosInstance.delete(`/events/${id}`).then((r) => r.data);
