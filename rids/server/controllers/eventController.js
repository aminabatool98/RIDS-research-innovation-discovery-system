import Event from "../models/Event.js";
import { getAll, getOne, createOne, updateOne, deleteOne } from "../utils/crudFactory.js";

export const getEvents = getAll(Event, "date");
export const getEvent = getOne(Event);
export const createEvent = createOne(Event);
export const updateEvent = updateOne(Event);
export const deleteEvent = deleteOne(Event);
