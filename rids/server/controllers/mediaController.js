import MediaCoverage from "../models/MediaCoverage.js";
import { getAll, getOne, createOne, updateOne, deleteOne } from "../utils/crudFactory.js";

export const getMedia = getAll(MediaCoverage, "-publishedDate");
export const getMediaItem = getOne(MediaCoverage);
export const createMedia = createOne(MediaCoverage);
export const updateMedia = updateOne(MediaCoverage);
export const deleteMedia = deleteOne(MediaCoverage);
