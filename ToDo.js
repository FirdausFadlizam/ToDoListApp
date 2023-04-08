const taskInput = document.querySelector(".task-input input");
const taskList = document.querySelector(".task-list");
const taskCreation = document.querySelector(".task-input input");

let todos = JSON.parse(localStorage.getItem("todolist2"));

let isEdited = false;
let editID;

function showTodo(){
  let li = "";
  if(todos){
  todos.forEach((todo, id) => {
      let isChecked = todo.status == "completed"? "checked" : "";
      li += `<li class="task">
      <label for=${id}>
        <input type="checkbox" onclick="updateStatus(${id})" id="${id}" ${isChecked}>
        <p class="${isChecked}">${todo.name}</p>
      </label>
      <button id="edit" onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</button>
      <button id="delete" onclick='deleteTask(${id})'><i class="uil uil-trash"></i>Delete</button>
    </li>`;

  });
  }
  taskList.innerHTML = li;

}

showTodo();

function createTask() {
    let userTask = taskInput.value.trim();
    if(!isEdited){
        if(!todos){
          todos = [];
        }

        let taskInfo = {name: userTask, status : "incompleted"};
        taskInput.value = "";
        todos.push(taskInfo);
      }
        else{
      isEdited = false;
      todos[editID].name = userTask;
      taskInput.value = "";
      }
       localStorage.setItem("todolist2",JSON.stringify(todos));
        showTodo();
}

function deleteTask(selectedID){
  todos.splice(selectedID, "1");
  localStorage.setItem("todolist2",JSON.stringify(todos));
  showTodo();

}

function editTask(selectedID, taskName){
  taskInput.value = taskName;
  editID = selectedID;
  isEdited = true;

}

taskInput.addEventListener("keyup", e=>{
  let userTask = taskInput.value.trim();

  if(e.key == "Enter" && userTask){

    if(!isEdited){
    if(!todos){
      todos = [];
    }

    let taskInfo = {name: userTask, status : "incompleted"};
    taskInput.value = "";
    todos.push(taskInfo);
  }
    else{
  isEdited = false;
  todos[editID].name = userTask;
  }
   localStorage.setItem("todolist2",JSON.stringify(todos));
    showTodo();
  }
  });

  function updateStatus(selectedID){
    if(todos[selectedID].status == "incompleted"){
      todos[selectedID].status = "completed";
      todos.push(todos.splice(selectedID, 1)[0]);
    }

    else{
      todos[selectedID].status = "incompleted";
      todos.splice(0,0,todos.splice(selectedID,1)[0]);
    }

    localStorage.setItem("todolist2",JSON.stringify(todos));
    showTodo();

  }
