import Achievement from "../models/Achievement.js";
import { getAll, getOne, createOne, updateOne, deleteOne } from "../utils/crudFactory.js";

export const getAchievements = getAll(Achievement, "-date");
export const getAchievement = getOne(Achievement);
export const createAchievement = createOne(Achievement);
export const updateAchievement = updateOne(Achievement);
export const deleteAchievement = deleteOne(Achievement);
