import { todos } from "./store.js";

export const storage = {
  getToDo(defaultTodosList = []) {
    const todos = localStorage.getItem("todos");

    return todos ? JSON.parse(todos) : defaultTodosList;
  },
  setToDo(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  },
};
