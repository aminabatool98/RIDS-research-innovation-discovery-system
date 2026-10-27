import News from "../models/News.js";
import { getAll, getOne, createOne, updateOne, deleteOne } from "../utils/crudFactory.js";

export const getNews = getAll(News, "-publishedDate");
export const getNewsItem = getOne(News);
export const createNews = createOne(News);
export const updateNews = updateOne(News);
export const deleteNews = deleteOne(News);
