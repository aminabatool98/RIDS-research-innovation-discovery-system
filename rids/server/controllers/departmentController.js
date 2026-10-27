import Department from "../models/Department.js";
import { getAll, getOne, createOne, updateOne, deleteOne } from "../utils/crudFactory.js";

export const getDepartments = getAll(Department, "name");
export const getDepartment = getOne(Department);
export const createDepartment = createOne(Department);
export const updateDepartment = updateOne(Department);
export const deleteDepartment = deleteOne(Department);
