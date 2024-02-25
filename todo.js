let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage(){
  let stringifedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifedTodoList);
  if (parsedTodoList === null){
    return [];
  }
  else{
    return parsedTodoList;
  }
}

let todoList = getTodoListFromLocalStorage();

saveTodoButton.onclick = function(){
  localStorage.setItem("todoList", JSON.stringify(todoList))
}

function onTodoStatusChange(checkboxId, labelId, todoId){
  let checkboxE = document.getElementById(checkboxId);
  let labelE = document.getElementById(labelId);
  labelE.classList.toggle("checked");
  let todoObjectIndex = todoList.findIndex(function(eachTodo){
    let eachTodoId = "todo" + eachTodo.uniqueId;
    if (eachTodoId === todoId){
      return true;
    }
    else{
      return false;
    }
  });
  let todoObject = todoList[todoObjectIndex];
  if (todoObject.isChecked === true){
    todoObject.isChecked = false
  }else{
    todoObject.isChecked = true
  }
}

function onDeleteTodo(todoId){
  let todoE = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoE);

  let deleteIndex = todoList.findIndex(function(eachTodo){
    let eachTodoId = "todo" + eachTodo.uniqueId;
    if (eachTodoId === todoId){
      return true;
    }else{
      return false
    }
  });
  todoList.splice(deleteIndex, 1)
}

function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueId;
  let checkboxId = "checkbox" + todo.uniqueId;
  let labelId = "label" +todo.uniqueId;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked = todo.isChecked
  inputElement.onclick = function(){
    onTodoStatusChange(checkboxId, labelId, todoId)
  }
  inputElement.classList.add("checkbox-input");
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  if (todo.isChecked === true) {
    labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function(){
    onDeleteTodo(todoId);
  }
  deleteIconContainer.appendChild(deleteIcon);
}

function onAddTodo(){
  let todoCount = todoList.length;

  let userInptElement = document.getElementById("todoUserInput");
  let userInputValue = userInptElement.value;

  if (userInputValue === ""){
    alert("Enter a valid text");
    return;
  }
  
  todoCount = todoCount + 1;
  let newTodo = {
    text: userInputValue,
    uniqueId: todoCount,
    isChecked: false
  }
  todoList.push(newTodo)
  createAndAppendTodo(newTodo);
  userInptElement.value = ""
}

addTodoButton.onclick = function(){
  onAddTodo();
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}