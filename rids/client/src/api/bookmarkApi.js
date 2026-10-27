import axiosInstance from "./axiosInstance";

export const fetchBookmarks = () => axiosInstance.get("/bookmarks").then((r) => r.data);
export const addBookmark = (researchPaperId) => axiosInstance.post("/bookmarks", { researchPaperId }).then((r) => r.data);
export const removeBookmark = (researchPaperId) => axiosInstance.delete(`/bookmarks/${researchPaperId}`).then((r) => r.data);
