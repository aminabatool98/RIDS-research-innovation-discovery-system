import Field from "../models/Field.js";
import { getAll, getOne, createOne, updateOne, deleteOne } from "../utils/crudFactory.js";

export const getFields = getAll(Field, "name");
export const getField = getOne(Field);
export const createField = createOne(Field);
export const updateField = updateOne(Field);
export const deleteField = deleteOne(Field);
