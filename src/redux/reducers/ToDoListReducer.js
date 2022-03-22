import { ToDoListDarkTheme } from "../../Todolist/Themes/ToDoListDarkTheme";
import { ADD_TASK } from "../constants/ToDoList";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
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

    default:
      return { ...state };
  }
  return state;
};
