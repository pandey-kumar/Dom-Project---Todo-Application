function loadTodos() {
  // This function will load todos from the browser
  const todos = JSON.parse(localStorage.getItem("todos")) || { todoList: [] };
  //   console.log(todos);
  return todos;
}

function addTodoToLocalStorage(todo) {
  const todos = loadTodos();
  todos.todoList.push({ ...todo });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function refreshTodos(todo) {
  localStorage.setItem("todos", JSON.stringify(todo));
}

// Lets write a function of appending todos on html  page

function addTodoTohtml(todo) {
  const todoList = document.getElementById("todoList");
  const todoItem = document.createElement("li");

  todoItem.setAttribute("data-id", todo.id);

  const textDiv = document.createElement("div");
  textDiv.textContent = todo.text;
  todoItem.classList.add("todoItem");

  if (todo.isCompleted) {
    textDiv.classList.add("completed");
  }

  //making a wrapper div to add all btns

  const wrapper = document.createElement("div");
  wrapper.classList.add("todoButtons");

  // Lets make more todo buttons along with all todos

  //edit
  const editbtn = document.createElement("button");
  editbtn.textContent = "Edit";
  editbtn.classList = "editBtn";
  editbtn.addEventListener("click",editTodo);

  //Delete
  const deletebtn = document.createElement("button");
  deletebtn.textContent = "Delete";
  deletebtn.classList = "deleteBtn";
  deletebtn.addEventListener("click", deleteTodo);
  //completed
  const completedbtn = document.createElement("button");
  completedbtn.textContent = todo.isCompleted ? "Reset" : "Completed";
  completedbtn.classList = "completedBtn";
  completedbtn.addEventListener("click", toggleTodo);

  //append them in every wrapper
  wrapper.appendChild(editbtn);
  wrapper.appendChild(deletebtn);
  wrapper.appendChild(completedbtn);

  // add wrapper to todoItem
  todoItem.appendChild(textDiv);
  todoItem.appendChild(wrapper);
  todoList.appendChild(todoItem);
}

function executeFilterOptions(e) {
  element = e.target;
  const value = element.getAttribute("data-filter");
  const todoList = document.getElementById("todoList");
  // console.log(value);
  todoList.innerHTML = ""; // reset
  const todos = loadTodos();
  if (value == "all") {
    // console.log(todoList);
    todos.todoList.forEach((todo) => {
      addTodoTohtml(todo);
    });
  } else if (value == "pending") {
    todos.todoList.forEach((todo) => {
      if (todo.isCompleted !== true) addTodoTohtml(todo);
    });
  } else {
    todos.todoList.forEach((todo) => {
      if (todo.isCompleted === true) addTodoTohtml(todo);
    });
  }
}

function resetHtmlTodos(todo) {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";
  todo.todoList.forEach((todo) => {
    addTodoTohtml(todo);
  });
}

function toggleTodo(e) {
  const todoItem = e.target.parentElement.parentElement;
  const todoId = todoItem.getAttribute("data-id");
  const todo = loadTodos();

  todo.todoList.forEach((todo) => {
    if (todo.id == todoId) {
      todo.isCompleted = !todo.isCompleted;
    }
  });
  refreshTodos(todo);
  resetHtmlTodos(todo);
}

function deleteTodo(e) {
  const todoItem = e.target.parentElement.parentElement;
  const todoId = todoItem.getAttribute("data-id");
  let todo = loadTodos();
  todo.todoList = todo.todoList.filter(todo => todo.id != todoId);
  refreshTodos(todo);
  resetHtmlTodos(todo);
}

function editTodo(e){
      const todoItem = e.target.parentElement.parentElement;
      const todoId = todoItem.getAttribute("data-id");
      let todo = loadTodos();
      const response=prompt("Enter the new Value ?");
        todo.todoList.forEach((todo) => {
          if (todo.id == todoId) {
            todo.text = response;
          }
        });
        refreshTodos(todo);
        resetHtmlTodos(todo);

}

function addNewTodo(){
     const todoText = todoInput.value;
    if (todoText == "") {
      alert("Enter something");
    } else {
      todos = loadTodos();
      const id = todos.todoList.length;
      addTodoToLocalStorage({ text: todoText, isCompleted: false, id });
      addTodoTohtml({ text: todoText, isCompleted: false, id });
      todoInput.value = "";
    }
}

document.addEventListener("DOMContentLoaded", () => {
  // lets suppose if someone gets out of focous then values wriitten could get trimmed

  const todoInput = document.getElementById("todoInput");
  const submitBtn = document.getElementById("addTodo");
  let todos = loadTodos();

  const todoList = document.getElementById("todoList");

  // Lets make of filter buttons
  const filterBtn = document.getElementsByClassName("filterbtn");
  // console.log(filterBtn);
  for (const btns of filterBtn) {
    btns.addEventListener("click", executeFilterOptions);
  }

  submitBtn.addEventListener("click", addNewTodo);

  todoInput.addEventListener("change", (e) => {
    //callback method will fire when everytime there is change in the input tag
    const todoText = e.target.value;
    e.target.value = todoText.trim();
    console.log(e.target.value);
  });

  //Lets loadTodos to the browser whenever it is wriiten once from the local storage

  todos.todoList.forEach((todo) => {
    addTodoTohtml(todo);
  });

  document.addEventListener("keypress",(e)=>{
        if(e.code== "Enter"){
            addNewTodo();

        }
  })
});
