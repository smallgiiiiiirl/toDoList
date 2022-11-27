import { todos } from "./store.js";
import { storage } from "./service.js";
const todosTemplate = {
  template: document.querySelector("#toDos"),
  renderTodos() {
    this.template.innerHTML = null;
    if (todos.list.length === 0) {
      const h3 = document.createElement("h3");
      h3.textContent = "Задачи отсутствуют!";
      return this.template.append(h3);
    }
    const ul = document.createElement("ul");
    this.template.append(ul);
    todos.list.forEach((todo) => {
      ul.innerHTML += `
      <li class="todo-item">
      <div class="todo">
        <h1 class="title">${todo.title}</h1>
        <h2 class="description">${todo.description}</h2>
        <div class="buttons_group">
          <button class="edit" type="submit" data-todo-id='${todo.id}'>Edit</button>
          <button class="completed" type="submit" data-todo-id='${todo.id}' disabled>
            Completed
          </button>
          <button id="remove" class="remove" type="submit" data-todo-id='${todo.id}'>Remove</button>
        </div>
      </div>
    </li>
      `;
    });
  },
  removeTodos() {
    this.template.addEventListener("click", (e) => {
      e.preventDefault();
      const toDoId = e.target.getAttribute("data-todo-id");

      if (toDoId && e.target.id === "remove") {
        todos.removeToDo(Number(toDoId));
        this.renderTodos();
      }
    });
  },
  editTodos() {
    this.template.addEventListener("click", (e) => {
      e.preventDefault();
      const toDoId = e.target.getAttribute("data-todo-id");

      const editTodo = todos.list.find((todo) => todo.id === Number(toDoId));
      console.log(editTodo);

      if (toDoId && editTodo) {
        const button = todosFormTemplate.template.querySelector("#createBtn");
        button.hidden = true; // to hide

        const editBtn = document.querySelector("#editBtn");
        editBtn.hidden = false;
        const input = todosFormTemplate.template.querySelector("input");
        const text = todosFormTemplate.template.querySelector("textarea");
        input.value = editTodo.title;
        text.value = editTodo.description;

        editBtn.onclick = (e) => {
          e.preventDefault();
          todos.editToDo(Number(toDoId), input.value, text.value);
          this.renderTodos();

          input.value = "";
          text.value = "";
        };
      }
    });
  },
  init() {
    this.renderTodos();
    this.removeTodos();
    this.editTodos();
  },
};
const todosFormTemplate = {
  template: document.querySelector("#create"),

  creatTask() {
    const button = this.template.querySelector("button");

    button.addEventListener("click", (e) => {
      e.preventDefault();
      const input = this.template.querySelector("input");
      const text = this.template.querySelector("textarea");

      todos.addToDo(input.value, text.value);

      input.value = "";
      text.value = "";

      todosTemplate.renderTodos();
    });
  },
  init() {
    this.creatTask();
  },
};
const todosSearchForm = {
  template: document.querySelector("#search"),

  filterTodos() {
    this.template.addEventListener("click", (e) => {
      e.preventDefault();
      const search = this.template.querySelector("input");
    });
  },

  init() {
    this.filterTodos();
  },
};
todos.setList(storage.getToDo());

todosTemplate.init();
todosFormTemplate.init();
todosSearchForm.init();
