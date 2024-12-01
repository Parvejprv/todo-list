let write = document.getElementById("write");
let todoList =  document.getElementById("todo-list");
let completedList = document.getElementById("completed-list");
let addBtn = document.getElementById("add-btn");
let retrieveBtn = document.getElementById("retrieve-btn");

let pendingCount = document.getElementById("pending-count");
let completedCount = document.getElementById("completed-count");

let removedTasks = [];

let mainTasksList = document.getElementById("main-task-list");


// document.addEventListener("DOMContentLoaded", loadTodos);

addBtn.addEventListener('click', function() {
  if(write.value.trim() !== "") {
    addTodo(write.value.trim());
    saveTodoToStorage(write.value.trim());
    write.value = '';
  }
});


write.addEventListener("keyup", function(e) {
  if(e.key == "Enter" && this.value.trim() !== "") {
    addTodo(this.value.trim());
    saveTodoToStorage(this.value.trim());
    this.value = '';
  }
});

retrieveBtn.addEventListener("click", retrieveRemovedTasks)



function addTodo(val) {
  let list = document.createElement("li");
  list.innerHTML = `${val} 
  <button class="complete" onclick="markAsCompleted(this)">Complete</button>
  <button class="delete" onclick="removeTask(this)">Delete</button>
  `;
  mainTasksList.appendChild(list);
  updateCounts();
  console.log(val);

  list.addEventListener('click', function() {
    this.classList.toggle('done');
  });
}

// function addTodo(val) {
//   let list = document.createElement("li");
//   list.innerHTML = `${val} 
//   <button class="complete" onclick="markAsCompleted(this)">Complete</button>
//   <button class="delete" onclick="removeTask(this)">Delete</button>
//   `;
//   todoList.appendChild(list);
//   updateCounts();
//   console.log(val);

//   list.addEventListener('click', function() {
//     this.classList.toggle('done');
//   });
// }

function markAsCompleted(button) {
  let li = button.parentElement;
  completedList.appendChild(li);
  li.removeChild(button);
  updateCounts();
}

function removeTask(button) {
  let li = button.parentElement;
  let taskName = li.firstChild.textContent;
  removedTasks.push(taskName);
  removeTodoFromStorage(taskName);
  li.remove();
  updateCounts();
}

function retrieveRemovedTasks() {
  removedTasks.forEach(task => {
    addTodo(task);
    saveTodoToStorage(task);
  });
  removedTasks = [];
  updateCounts();
}


function saveTodoToStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("todos")) || [];
  tasks.push(task);
  localStorage.setItem("todos", JSON.stringify(tasks));
}

function removeTodoFromStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("todos")) || [];
  tasks = tasks.filter(t => t != task);
  localStorage.setItem("todos", JSON.stringify(tasks));
}

function loadTodos() {
  let tasks = JSON.parse(localStorage.getItem("todos")) || [];
  tasks.forEach(task => addTodo(task));
  updateCounts();
}


function updateCounts() {
  pendingCount.textContent = mainTasksList.children.length;
  completedCount.textContent = completedList.children.length;
}