import {
  ADD_TASK,
  CHANGE_THEME,
  DELETE_TASK,
  DONE_TASK,
  EDIT_TASK,
  UPDATE_TASK,
} from "../constants/ToDoList";
import { arrTheme } from "../../Todolist/Themes/ThemeManager";
import { ToDoListPrimaryTheme } from "../../Todolist/Themes/ToDoListPrimaryTheme";

const initialState = {
  themeToDoList: ToDoListPrimaryTheme,
  tasksList: [
    {
      id: "task-1",
      taskName: "task1",
      done: false,
    },
    {
      id: "task-2",
      taskName: "task2",
      done: true,
    },
    {
      id: "task-3",
      taskName: "task3",
      done: true,
    },
    {
      id: "task-4",
      taskName: "task4",
      done: false,
    },
  ],
  tasksEdit: { id: "task-1", taskName: "task1", done: false },
};

export const ToDoListReducer = (state = initialState, action) => {
  let { payload, type } = action;
  switch (type) {
    case ADD_TASK:
      let cloneTasksList = [...state.tasksList];
      if (payload.taskName.trim() === "") {
        alert("Task name is required");
        return { ...state };
      }

      let index = cloneTasksList.findIndex(
        (task) => task.taskName === payload.taskName
      );
      if (index !== -1) {
        alert("Task name already exists!");
        return { ...state };
      }

      cloneTasksList.push(payload);

      state.tasksList = cloneTasksList;
      return { ...state };

    case CHANGE_THEME:
      let theme = arrTheme.find((theme) => theme.id == payload);
      if (theme) {
        state.themeToDoList = theme.theme;
      }
      return { ...state };

    case DONE_TASK: {
      //payload==id
      let taskListUpdate = [...state.tasksList];
      let index = taskListUpdate.findIndex((task) => task.id === payload);
      if (index !== -1) {
        taskListUpdate[index].done = true;
      }

      return { ...state, tasksList: taskListUpdate };
    }

    case DELETE_TASK: {
      let taskListUpdate = [...state.tasksList];
      // let index = taskListUpdate.findIndex((task) => task.id === payload);
      // if (index !== -1) {
      //   taskListUpdate.splice(index, 1);
      // }

      taskListUpdate = taskListUpdate.filter((task) => task.id !== payload);
      return { ...state, tasksList: taskListUpdate };
    }

    case EDIT_TASK: {
      return { ...state, tasksEdit: payload };
    }

    case UPDATE_TASK: {
      state.tasksEdit = { ...state.tasksEdit, taskName: payload };
      let updateTasksList = [...state.tasksList];
      let index = updateTasksList.findIndex(
        (task) => task.id === state.tasksEdit.id
      );
      if (index !== -1) {
        updateTasksList[index] = state.tasksEdit;
      }

      state.tasksList = updateTasksList;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
