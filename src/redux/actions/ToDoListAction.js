import { ADD_TASK } from "../constants/ToDoList";

export const AddTaskAction = (payload) => ({
  type: ADD_TASK,
  payload,
});
