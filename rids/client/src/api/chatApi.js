import axiosInstance from "./axiosInstance";

export const sendChatMessage = (data) => axiosInstance.post("/chatbot/message", data).then((r) => r.data);
