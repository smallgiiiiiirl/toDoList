import { storage } from "./service.js";

export const todos = {
  list: [],
  setList(list) {
    this.list = list;
  },
  addToDo(title, description, important) {
    const newToDo = {
      id: Math.random(),
      title,
      description,
      completed: false,
      important,
    };
    this.list.push(newToDo);
    storage.setToDo(this.list);
  },
  removeToDo(toDoId) {
    this.list = this.list.filter(({ id }) => id !== toDoId);
    storage.setToDo(todos);
  },
  editToDo(todoId, nextTitle, nextDescription) {
    const todo = this.list.find(({ id }) => id === todoId);
    console.log(todoId);
    console.log(todo);
    todo.title = nextTitle;
    todo.description = nextDescription;
    storage.setToDo(todos);
  },
  filterTodo(title) {
    storage.setToDo(todos);
    return this.list.filter((todo) =>
      todo.title.toLowerCase().inclucdes(title.toLowerCase())
    );
  },
};
