import { bindActionCreators } from "redux";
import {
  ADD_TASK,
  CHANGE_THEME,
  DELETE_TASK,
  DONE_TASK,
  EDIT_TASK,
  UPDATE_TASK,
} from "../constants/ToDoList";

export const AddTaskAction = (payload) => ({
  type: ADD_TASK,
  payload,
});

export const changeThemeAction = (payload) => ({
  type: CHANGE_THEME,
  payload,
});

export const doneTask = (payload) => ({
  type: DONE_TASK,
  payload,
});
export const deleteTask = (payload) => ({
  type: DELETE_TASK,
  payload,
});
export const editTask = (payload) => ({
  type: EDIT_TASK,
  payload,
});

export const updateTask = (payload) => ({
  type: UPDATE_TASK,
  payload,
});
